import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { platform } = await request.json();

    if (!platform) {
      return NextResponse.json(
        { error: "Platform is required" },
        { status: 400 }
      );
    }

    const validPlatforms = ["payoneer", "paystack", "flutterwave"];
    if (!validPlatforms.includes(platform)) {
      return NextResponse.json(
        {
          error: `Invalid platform. Must be one of: ${validPlatforms.join(
            ", "
          )}`,
        },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Initiate OAuth flow for the payment platform
    // 2. Store connection state
    // 3. Return authorization URL or connection result

    // For now, simulate successful connection
    return NextResponse.json({
      id: platform,
      name: platform.charAt(0).toUpperCase() + platform.slice(1),
      connected: true,
      connectedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error connecting payment platform:", error);
    return NextResponse.json(
      {
        error: "Failed to connect payment platform",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
