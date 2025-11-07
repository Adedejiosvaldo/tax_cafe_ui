import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { provider, code, state } = await request.json();

    if (!provider || !code) {
      return NextResponse.json(
        { error: "Provider and code are required" },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Verify the state parameter (CSRF protection)
    // 2. Exchange authorization code for access token
    // 3. Fetch account information
    // 4. Store connection in database
    // 5. Return connection details

    // For now, simulate successful connection
    const connection = {
      id: `${provider}_${Date.now()}`,
      provider,
      name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} Account`,
      accountNumber: "****" + Math.floor(Math.random() * 10000),
      connectedAt: new Date().toISOString(),
    };

    return NextResponse.json(connection);
  } catch (error) {
    console.error("Error handling callback:", error);
    return NextResponse.json(
      {
        error: "Failed to complete connection",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
