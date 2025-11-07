"use client";

import { useState } from "react";
import Icon from "../../components/Icon";
import type { OnboardingData } from "../page";

interface PaymentsCryptoStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
}

const PAYMENT_PLATFORMS = [
  { id: "payoneer", name: "Payoneer", icon: "account_balance" },
  { id: "paystack", name: "Paystack", icon: "account_balance" },
  { id: "flutterwave", name: "Flutterwave", icon: "account_balance" },
];

const CRYPTO_WALLETS = [
  { id: "metamask", name: "MetaMask", icon: "account_balance" },
  { id: "trust", name: "Trust Wallet", icon: "account_balance" },
  { id: "binance", name: "Binance", icon: "account_balance" },
];

export default function PaymentsCryptoStep({
  data,
  updateData,
}: PaymentsCryptoStepProps) {
  const [connectedPayments, setConnectedPayments] = useState<any[]>(
    data.connectedPayments || []
  );
  const [connectedCrypto, setConnectedCrypto] = useState<any[]>(
    data.connectedCrypto || []
  );
  const [walletAddress, setWalletAddress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnectPayment = async (platformId: string) => {
    setIsConnecting(true);
    try {
      const response = await fetch("/api/onboarding/connect-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ platform: platformId }),
      });

      if (response.ok) {
        const result = await response.json();
        const updated = [...connectedPayments, result];
        setConnectedPayments(updated);
        updateData({ connectedPayments: updated });
      } else {
        throw new Error("Failed to connect payment platform");
      }
    } catch (error) {
      console.error("Error connecting payment:", error);
      alert("Failed to connect payment platform. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleConnectCrypto = async (walletId: string) => {
    setIsConnecting(true);
    try {
      const response = await fetch("/api/onboarding/connect-crypto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ wallet: walletId }),
      });

      if (response.ok) {
        const result = await response.json();
        const updated = [...connectedCrypto, result];
        setConnectedCrypto(updated);
        updateData({ connectedCrypto: updated });
      } else {
        throw new Error("Failed to connect crypto wallet");
      }
    } catch (error) {
      console.error("Error connecting crypto:", error);
      alert("Failed to connect crypto wallet. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleAddWalletAddress = () => {
    if (!walletAddress.trim()) return;

    const wallet = {
      id: `manual-${Date.now()}`,
      type: "manual",
      address: walletAddress,
      name: "Manual Wallet",
    };

    const updated = [...connectedCrypto, wallet];
    setConnectedCrypto(updated);
    updateData({ connectedCrypto: updated });
    setWalletAddress("");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Connect Payment Platforms & Crypto Wallets
        </h2>
        <p className="text-text-light-body">
          Link your payment platforms and crypto wallets to automatically track
          all income sources.
        </p>
      </div>

      {/* Payment Platforms Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Payment Platforms
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PAYMENT_PLATFORMS.map((platform) => {
            const isConnected = connectedPayments.some(
              (p) => p.id === platform.id
            );
            return (
              <button
                key={platform.id}
                type="button"
                onClick={() => handleConnectPayment(platform.id)}
                disabled={isConnecting || isConnected}
                className={`p-4 border-2 rounded-lg transition-all ${
                  isConnected
                    ? "border-green-300 bg-green-50"
                    : "border-border-light hover:border-primary hover:bg-primary/5"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="flex flex-col items-center gap-2">
                  <Icon
                    name={platform.icon}
                    size={32}
                    className={isConnected ? "text-green-600" : "text-primary"}
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {platform.name}
                  </span>
                  {isConnected && (
                    <span className="text-xs text-green-600">✓ Connected</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="p-4 bg-gray-50 border border-border-light rounded-lg">
          <p className="text-sm text-text-light-body mb-2">
            <strong>Manual Upload:</strong> You can also upload contracts and
            invoices manually.
          </p>
          <button
            type="button"
            className="text-sm text-primary hover:text-primary/80 font-medium"
          >
            Upload Documents →
          </button>
        </div>
      </div>

      {/* Crypto Wallets Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Crypto Wallets</h3>
        <p className="text-sm text-text-light-body">
          Read-only access. We analyze all transactions from Ethereum, Binance
          Smart Chain, Polygon, etc.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CRYPTO_WALLETS.map((wallet) => {
            const isConnected = connectedCrypto.some((c) => c.id === wallet.id);
            return (
              <button
                key={wallet.id}
                type="button"
                onClick={() => handleConnectCrypto(wallet.id)}
                disabled={isConnecting || isConnected}
                className={`p-4 border-2 rounded-lg transition-all ${
                  isConnected
                    ? "border-green-300 bg-green-50"
                    : "border-border-light hover:border-primary hover:bg-primary/5"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="flex flex-col items-center gap-2">
                  <Icon
                    name={wallet.icon}
                    size={32}
                    className={isConnected ? "text-green-600" : "text-primary"}
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {wallet.name}
                  </span>
                  {isConnected && (
                    <span className="text-xs text-green-600">✓ Connected</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Manual Wallet Address Entry */}
        <div className="p-4 border border-border-light rounded-lg bg-gray-50">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Or enter wallet address manually
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="0x742d...8f3e"
              className="flex-1 px-4 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white"
            />
            <button
              type="button"
              onClick={handleAddWalletAddress}
              disabled={!walletAddress.trim()}
              className="px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* Connected Accounts Summary */}
      {(connectedPayments.length > 0 || connectedCrypto.length > 0) && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm font-medium text-green-800 mb-2">
            ✓ Connected Accounts:
          </p>
          <ul className="text-sm text-green-700 space-y-1">
            {connectedPayments.map((p, i) => (
              <li key={i}>• {p.name || p.id}</li>
            ))}
            {connectedCrypto.map((c, i) => (
              <li key={i}>
                • {c.name || c.id}{" "}
                {c.address && `(${c.address.slice(0, 10)}...)`}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
