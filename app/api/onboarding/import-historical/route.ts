import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("multipart/form-data")) {
      // Handle file upload
      const formData = await request.formData();
      const files = formData.getAll("files") as File[];
      const dateRangeStr = formData.get("dateRange") as string;

      if (!files || files.length === 0) {
        return NextResponse.json(
          { error: "No files provided" },
          { status: 400 }
        );
      }

      // Here you would typically:
      // 1. Parse uploaded files (PDF/CSV)
      // 2. Extract transaction data
      // 3. Store in database
      // 4. Return import summary

      const dateRange = dateRangeStr ? JSON.parse(dateRangeStr) : {};

      return NextResponse.json({
        success: true,
        transactionCount: files.length * 50, // Placeholder
        startDate:
          dateRange.start ||
          new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
        endDate: dateRange.end || new Date().toISOString().split("T")[0],
        filesProcessed: files.length,
      });
    } else {
      // Handle JSON request (software import or manual)
      const body = await request.json();
      const { method, dateRange } = body;

      if (!method) {
        return NextResponse.json(
          { error: "Import method is required" },
          { status: 400 }
        );
      }

      // Here you would typically:
      // 1. Connect to tax software API
      // 2. Import historical data
      // 3. Store in database
      // 4. Return import summary

      return NextResponse.json({
        success: true,
        method,
        transactionCount: 100, // Placeholder
        startDate:
          dateRange?.start ||
          new Date(Date.now() - 365 * 24 * 60 * 60 * 1000)
            .toISOString()
            .split("T")[0],
        endDate: dateRange?.end || new Date().toISOString().split("T")[0],
      });
    }
  } catch (error) {
    console.error("Error importing historical data:", error);
    return NextResponse.json(
      {
        error: "Failed to import historical data",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
