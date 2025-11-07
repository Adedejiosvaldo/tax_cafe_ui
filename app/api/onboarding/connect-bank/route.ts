import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { provider } = await request.json();

    if (!provider || !["mono", "okra"].includes(provider)) {
      return NextResponse.json(
        { error: "Invalid provider. Must be 'mono' or 'okra'" },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Get OAuth credentials from environment variables
    // 2. Generate OAuth authorization URL
    // 3. Store state for callback verification
    // 4. Return authorization URL

    // Placeholder OAuth URLs
    // In production, use actual Mono/Okra OAuth endpoints
    const authUrls: Record<string, string> = {
      mono: process.env.MONO_AUTH_URL || "https://api.mono.co/v1/auth",
      okra: process.env.OKRA_AUTH_URL || "https://api.okra.ng/v2/auth",
    };

    const authUrl = authUrls[provider];

    if (!authUrl) {
      return NextResponse.json(
        { error: `${provider} integration not configured` },
        { status: 500 }
      );
    }

    // Generate OAuth state token for security
    const state = Buffer.from(Date.now().toString()).toString("base64");

    // Construct full OAuth URL with parameters
    const fullAuthUrl = `${authUrl}?state=${state}&redirect_uri=${encodeURIComponent(
      process.env.NEXT_PUBLIC_APP_URL +
        "/onboarding/callback?provider=" +
        provider
    )}`;

    return NextResponse.json({
      authUrl: fullAuthUrl,
      provider,
      state,
    });
  } catch (error) {
    console.error("Error initiating bank connection:", error);
    return NextResponse.json(
      {
        error: "Failed to initiate bank connection",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
