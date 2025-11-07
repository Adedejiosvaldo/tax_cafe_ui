"use client";

import { useState } from "react";
import Icon from "../../components/Icon";
import type { OnboardingData } from "../page";

interface BankingConnectionStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
}

export default function BankingConnectionStep({
  data,
  updateData,
}: BankingConnectionStepProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectedBanks, setConnectedBanks] = useState<any[]>(
    data.connectedBanks || []
  );

  const handleConnectMono = async () => {
    setIsConnecting(true);
    try {
      // Initiate Mono OAuth flow
      const response = await fetch("/api/onboarding/connect-bank", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ provider: "mono" }),
      });

      if (response.ok) {
        const { authUrl } = await response.json();
        // Redirect to Mono OAuth
        window.location.href = authUrl;
      } else {
        throw new Error("Failed to initiate bank connection");
      }
    } catch (error) {
      console.error("Error connecting bank:", error);
      alert("Failed to connect bank. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleConnectOkra = async () => {
    setIsConnecting(true);
    try {
      // Initiate Okra OAuth flow
      const response = await fetch("/api/onboarding/connect-bank", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ provider: "okra" }),
      });

      if (response.ok) {
        const { authUrl } = await response.json();
        // Redirect to Okra OAuth
        window.location.href = authUrl;
      } else {
        throw new Error("Failed to initiate bank connection");
      }
    } catch (error) {
      console.error("Error connecting bank:", error);
      alert("Failed to connect bank. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Connect Your Bank Accounts
        </h2>
        <p className="text-text-light-body">
          Securely link your accounts (same tech Piggyvest uses). We
          automatically import and categorize your transactions.
        </p>
      </div>

      {/* Connection Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={handleConnectMono}
          disabled={isConnecting}
          className="p-6 border-2 border-border-light rounded-lg hover:border-primary hover:bg-primary/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="account_balance" size={24} className="text-primary" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Connect via Mono</h3>
              <p className="text-sm text-text-light-body">
                Secure bank connection
              </p>
            </div>
          </div>
        </button>

        <button
          type="button"
          onClick={handleConnectOkra}
          disabled={isConnecting}
          className="p-6 border-2 border-border-light rounded-lg hover:border-primary hover:bg-primary/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="account_balance" size={24} className="text-primary" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-900">Connect via Okra</h3>
              <p className="text-sm text-text-light-body">
                Secure bank connection
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Connected Accounts List */}
      {connectedBanks.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">
            Connected Accounts
          </h3>
          <div className="space-y-2">
            {connectedBanks.map((bank, index) => (
              <div
                key={index}
                className="p-4 border border-border-light rounded-lg bg-gray-50 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon
                      name="account_balance"
                      size={20}
                      className="text-primary"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {bank.name || "Bank Account"}
                    </p>
                    <p className="text-sm text-text-light-body">
                      {bank.accountNumber || "•••• •••• ••••"}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-green-600 font-medium">
                  ✓ Connected
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {connectedBanks.length === 0 && (
        <div className="p-6 border-2 border-dashed border-border-light rounded-lg text-center">
          <Icon
            name="account_balance"
            size={48}
            className="text-text-light-body mx-auto mb-2"
          />
          <p className="text-sm text-text-light-body">
            No bank accounts connected yet
          </p>
        </div>
      )}

      {/* Info Box */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Secure & Private:</strong> We use read-only access. Your
          banking credentials are never stored. You can add accounts manually
          later if you prefer.
        </p>
      </div>
    </div>
  );
}
