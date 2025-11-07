"use client";

import { useState, useEffect } from "react";
import type { OnboardingData } from "../page";

interface TINStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
}

export default function TINStep({ data, updateData }: TINStepProps) {
  const [tin, setTin] = useState(data.tin || "");
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (data.hasTIN === true && data.tin) {
      setTin(data.tin);
    }
  }, [data]);

  const validateTIN = (tinValue: string): boolean => {
    // Basic TIN validation (Nigerian TIN format: 9-12 digits)
    const tinRegex = /^\d{9,12}$/;
    return tinRegex.test(tinValue.replace(/\s/g, ""));
  };

  const handleTINChange = (value: string) => {
    setTin(value);
    setValidationError("");

    // Basic format validation
    if (value && !validateTIN(value)) {
      setValidationError("TIN should be 9-12 digits");
    } else {
      updateData({ tin: value });
    }
  };

  const handleVerify = async () => {
    if (!tin || !validateTIN(tin)) {
      setValidationError("Please enter a valid TIN");
      return;
    }

    setIsValidating(true);
    setValidationError("");

    try {
      // Call TIN verification API
      const response = await fetch("/api/onboarding/verify-tin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tin }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.valid) {
          updateData({ tin, hasTIN: true });
        } else {
          setValidationError(result.message || "TIN verification failed");
        }
      } else {
        setValidationError("Unable to verify TIN. Please try again later.");
      }
    } catch (error) {
      setValidationError("Network error. Please try again.");
    } finally {
      setIsValidating(false);
    }
  };

  if (data.hasTIN === false) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Get Your TIN
          </h2>
          <p className="text-text-light-body">
            A Tax Identification Number (TIN) is required for tax filing in
            Nigeria.
          </p>
        </div>

        <div className="p-6 bg-primary/5 border border-primary/20 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">
            Let's get you one
          </h3>
          <p className="text-sm text-text-light-body mb-4">
            We can help you register for a TIN with the Federal Inland Revenue
            Service (FIRS).
          </p>
          <a
            href="https://services.firs.gov.ng/TIN"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg transition-colors"
          >
            Register for TIN on FIRS Website →
          </a>
        </div>

        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> You can skip this step and complete it later,
            but you'll need a TIN to file your taxes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Verify Your TIN
        </h2>
        <p className="text-text-light-body">
          Enter your Tax Identification Number to verify it with FIRS.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="tin-verification"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Tax Identification Number (TIN)
          </label>
          <input
            id="tin-verification"
            type="text"
            value={tin}
            onChange={(e) => handleTINChange(e.target.value)}
            placeholder="Enter your 9-12 digit TIN"
            className={`block w-full px-4 py-3 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-gray-50 ${
              validationError
                ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                : "border-border-light"
            }`}
          />
          {validationError && (
            <p className="mt-2 text-sm text-red-600">{validationError}</p>
          )}
          {tin && validateTIN(tin) && !validationError && (
            <p className="mt-2 text-sm text-green-600">✓ Valid format</p>
          )}
        </div>

        <button
          type="button"
          onClick={handleVerify}
          disabled={!tin || !validateTIN(tin) || isValidating}
          className="w-full px-4 py-3 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isValidating ? "Verifying..." : "Verify TIN"}
        </button>

        {data.tin && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>✓ TIN Verified:</strong> {data.tin}
            </p>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-border-light">
        <button
          type="button"
          onClick={() => {
            updateData({ hasTIN: false, tin: "" });
            setTin("");
          }}
          className="text-sm text-primary hover:text-primary/80 font-medium"
        >
          I don't have a TIN yet
        </button>
      </div>
    </div>
  );
}
