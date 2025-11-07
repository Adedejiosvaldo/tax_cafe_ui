import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.incomeSources || data.incomeSources.length === 0) {
      return NextResponse.json(
        { error: "At least one income source is required" },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Save onboarding data to database
    // 2. Create user profile
    // 3. Initialize tax calculations
    // 4. Set up account connections

    // For now, we'll just return success
    return NextResponse.json({
      success: true,
      message: "Onboarding completed successfully",
      data: {
        userId: "user_" + Date.now(), // Placeholder
        onboardingComplete: true,
      },
    });
  } catch (error) {
    console.error("Error completing onboarding:", error);
    return NextResponse.json(
      {
        error: "Failed to complete onboarding",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
