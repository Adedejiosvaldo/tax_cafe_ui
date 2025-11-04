import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Get the AgentOS backend URL from environment variables
    const agentOSUrl =
      process.env.AGENT_OS_URL ||
      process.env.NEXT_PUBLIC_AGENT_OS_URL ||
      process.env.CHAT_API_URL ||
      process.env.NEXT_PUBLIC_CHAT_API_URL;

    if (!agentOSUrl) {
      return NextResponse.json(
        {
          error:
            "AgentOS URL not configured. Please set AGENT_OS_URL environment variable.",
        },
        { status: 500 }
      );
    }

    // Get agent_id from request body, query params, or use default
    const contentType = request.headers.get("content-type") || "";
    const isFormData = contentType.includes("multipart/form-data");
    const { searchParams } = new URL(request.url);

    let agentId: string | null = null;
    let requestBody: FormData;
    const headers: Record<string, string> = {};

    if (isFormData) {
      // Handle FormData (matches agent-ui pattern)
      const formData = await request.formData();
      agentId =
        (formData.get("agent_id") as string | null) ||
        searchParams.get("agent_id") ||
        searchParams.get("agent");
      // Ensure stream is set to true
      formData.set("stream", "true");
      requestBody = formData;
      // Don't set Content-Type for FormData - let fetch set it with boundary
    } else {
      // Handle JSON (for backward compatibility with current implementation)
      const body = await request.json();
      agentId =
        body.agent_id ||
        body.agent ||
        searchParams.get("agent_id") ||
        searchParams.get("agent");
      const { question, messages, session_id } = body;

      // Convert to FormData format expected by AgentOS
      const formData = new FormData();
      if (question) {
        formData.append("message", question);
      } else if (messages && messages.length > 0) {
        // Use the last user message
        const lastUserMessage = messages
          .slice()
          .reverse()
          .find((m: { role: string }) => m.role === "user");
        if (lastUserMessage) {
          formData.append("message", lastUserMessage.content || "");
        }
      }
      formData.append("stream", "true");
      if (session_id) {
        formData.append("session_id", session_id);
      }

      requestBody = formData;
    }

    // If no agent_id provided, try to get the first available agent
    if (!agentId) {
      try {
        const agentsResponse = await fetch(`${agentOSUrl}/agents`, {
          method: "GET",
        });
        if (agentsResponse.ok) {
          const agents = await agentsResponse.json();
          if (Array.isArray(agents) && agents.length > 0) {
            agentId = agents[0].agent_id || agents[0].id;
          }
        }
      } catch (error) {
        console.error("Failed to fetch agents:", error);
      }
    }

    // If still no agent_id, use default from env or return error
    if (!agentId) {
      agentId = process.env.DEFAULT_AGENT_ID || null;
      if (!agentId) {
        return NextResponse.json(
          {
            error:
              "No agent_id provided and no default agent configured. Please provide agent_id or set DEFAULT_AGENT_ID environment variable.",
            hint: "You can also fetch available agents from /agents endpoint",
          },
          { status: 400 }
        );
      }
    }

    // Construct the AgentOS API endpoint
    const runUrl = `${agentOSUrl}/agents/${agentId}/runs`;

    // Forward the request to AgentOS
    const response = await fetch(runUrl, {
      method: "POST",
      headers: {
        ...headers,
      },
      body: requestBody,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AgentOS API error:", response.status, errorText);
      return NextResponse.json(
        {
          error: `AgentOS API error: ${response.statusText}`,
          details: errorText,
        },
        { status: response.status }
      );
    }

    if (!response.body) {
      return NextResponse.json(
        { error: "No response body from AgentOS" },
        { status: 500 }
      );
    }

    // Return the streaming response from AgentOS
    return new NextResponse(response.body, {
      headers: {
        "Content-Type":
          response.headers.get("Content-Type") || "application/json",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        error: "Failed to process chat request",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
