import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { wallet } = await request.json();

    if (!wallet) {
      return NextResponse.json(
        { error: "Wallet is required" },
        { status: 400 }
      );
    }

    const validWallets = ["metamask", "trust", "binance"];
    if (!validWallets.includes(wallet)) {
      return NextResponse.json(
        { error: `Invalid wallet. Must be one of: ${validWallets.join(", ")}` },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Connect to crypto wallet API
    // 2. Request read-only access
    // 3. Store wallet connection
    // 4. Initialize transaction scanning

    // For now, simulate successful connection
    return NextResponse.json({
      id: wallet,
      name: wallet.charAt(0).toUpperCase() + wallet.slice(1) + " Wallet",
      connected: true,
      connectedAt: new Date().toISOString(),
      type: "read-only",
    });
  } catch (error) {
    console.error("Error connecting crypto wallet:", error);
    return NextResponse.json(
      {
        error: "Failed to connect crypto wallet",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
