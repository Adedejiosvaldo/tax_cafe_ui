"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OnboardingCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  const handleCallback = async (
    provider: string,
    code: string,
    state: string | null
  ) => {
    try {
      const response = await fetch("/api/onboarding/callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ provider, code, state }),
      });

      if (response.ok) {
        const result = await response.json();

        // Update onboarding data with connected account
        const saved = localStorage.getItem("onboarding_data");
        if (saved) {
          const data = JSON.parse(saved);
          if (provider === "mono" || provider === "okra") {
            data.connectedBanks = data.connectedBanks || [];
            data.connectedBanks.push(result);
            localStorage.setItem("onboarding_data", JSON.stringify(data));
          }
        }

        setStatus("success");
        setTimeout(() => {
          router.push("/onboarding");
        }, 2000);
      } else {
        throw new Error("Failed to complete connection");
      }
    } catch (error) {
      console.error("Callback error:", error);
      setStatus("error");
      setTimeout(() => {
        router.push("/onboarding");
      }, 3000);
    }
  };

  useEffect(() => {
    const provider = searchParams.get("provider");
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");

    if (error) {
      setStatus("error");
      setTimeout(() => {
        router.push("/onboarding");
      }, 3000);
      return;
    }

    if (provider && code) {
      // Exchange code for access token
      handleCallback(provider, code, state);
    } else {
      setStatus("error");
      setTimeout(() => {
        router.push("/onboarding");
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, router]);

  return (
    <div className="min-h-screen w-full bg-background-light flex items-center justify-center">
      <div className="text-center">
        {status === "loading" && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-text-light-body">Completing connection...</p>
          </>
        )}
        {status === "success" && (
          <>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-text-light-body">
              Connection successful! Redirecting...
            </p>
          </>
        )}
        {status === "error" && (
          <>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <p className="text-text-light-body">
              Connection failed. Redirecting...
            </p>
          </>
        )}
      </div>
    </div>
  );
}
