import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { tin } = await request.json();

    if (!tin) {
      return NextResponse.json({ error: "TIN is required" }, { status: 400 });
    }

    // Basic format validation
    const tinRegex = /^\d{9,12}$/;
    if (!tinRegex.test(tin.replace(/\s/g, ""))) {
      return NextResponse.json(
        {
          valid: false,
          message: "Invalid TIN format. TIN should be 9-12 digits.",
        },
        { status: 200 }
      );
    }

    // Here you would typically:
    // 1. Call FIRS API to verify TIN
    // 2. Check against your database
    // 3. Return verification result

    // For now, we'll simulate verification
    // In production, integrate with FIRS verification API
    const isValid = tin.length >= 9 && tin.length <= 12;

    return NextResponse.json({
      valid: isValid,
      message: isValid
        ? "TIN verified successfully"
        : "TIN verification failed. Please check your TIN and try again.",
      tin: tin.replace(/\s/g, ""),
    });
  } catch (error) {
    console.error("Error verifying TIN:", error);
    return NextResponse.json(
      {
        error: "Failed to verify TIN",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
