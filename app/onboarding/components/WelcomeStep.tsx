"use client";

import { useState } from "react";
import type { OnboardingData } from "../page";

interface WelcomeStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
}

const INCOME_SOURCES = [
  { id: "freelancer", label: "Freelancer/Consultant" },
  { id: "crypto", label: "Crypto/Forex Trader" },
  { id: "content", label: "Content Creator" },
  { id: "business", label: "Small Business Owner" },
  { id: "salaried", label: "Salaried + Side Hustle" },
  { id: "all", label: "All of the above 😅" },
];

export default function WelcomeStep({ data, updateData }: WelcomeStepProps) {
  const [hasTIN, setHasTIN] = useState<boolean | null>(data.hasTIN);
  const [tin, setTin] = useState(data.tin);

  const handleTINChange = (value: boolean | null) => {
    setHasTIN(value);
    updateData({ hasTIN: value, tin: value === false ? "" : tin });
  };

  const handleTINInput = (value: string) => {
    setTin(value);
    updateData({ tin: value });
  };

  const toggleIncomeSource = (sourceId: string) => {
    const current = data.incomeSources || [];
    let updated: string[];

    if (sourceId === "all") {
      // If "all" is selected, select all sources
      updated = INCOME_SOURCES.filter((s) => s.id !== "all").map((s) => s.id);
    } else {
      // Remove "all" if it was selected
      updated = current.filter((s) => s !== "all");

      if (current.includes(sourceId)) {
        updated = updated.filter((s) => s !== sourceId);
      } else {
        updated = [...updated, sourceId];
      }
    }

    updateData({ incomeSources: updated });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome, Let's Get You Compliant in 10 Minutes
        </h1>
        <p className="text-text-light-body">
          We'll guide you through a quick setup to get started
        </p>
      </div>

      {/* TIN Question */}
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-gray-900">
          Do you have a TIN (Tax ID Number)?
        </label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => handleTINChange(true)}
            className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
              hasTIN === true
                ? "border-primary bg-primary/10 text-primary"
                : "border-border-light bg-gray-50 text-text-light-body hover:border-primary/50"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => handleTINChange(false)}
            className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
              hasTIN === false
                ? "border-primary bg-primary/10 text-primary"
                : "border-border-light bg-gray-50 text-text-light-body hover:border-primary/50"
            }`}
          >
            No
          </button>
        </div>

        {hasTIN === true && (
          <div className="mt-4">
            <label
              htmlFor="tin-input"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter your TIN
            </label>
            <input
              id="tin-input"
              type="text"
              value={tin}
              onChange={(e) => handleTINInput(e.target.value)}
              placeholder="Enter your Tax ID Number"
              className="block w-full px-4 py-3 border border-border-light rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-gray-50"
            />
          </div>
        )}

        {hasTIN === false && (
          <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <p className="text-sm text-text-light-body mb-2">
              Let's get you one. Click here, we'll fill the forms.
            </p>
            <a
              href="https://services.firs.gov.ng/TIN"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-primary hover:text-primary/80"
            >
              Register for TIN →
            </a>
          </div>
        )}
      </div>

      {/* Income Source Selection */}
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-gray-900">
          What do you do?
        </label>
        <p className="text-sm text-text-light-body">
          We're mapping your activities to specific tax obligations. Most
          platforms make YOU figure this out. We don't.
        </p>
        <div className="space-y-2">
          {INCOME_SOURCES.map((source) => {
            const isSelected = data.incomeSources?.includes(source.id) || false;
            return (
              <button
                key={source.id}
                type="button"
                onClick={() => toggleIncomeSource(source.id)}
                className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                  isSelected
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border-light bg-gray-50 text-text-light-body hover:border-primary/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      isSelected
                        ? "border-primary bg-primary"
                        : "border-border-light"
                    }`}
                  >
                    {isSelected && (
                      <svg
                        className="w-3 h-3 text-white"
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
                    )}
                  </div>
                  <span className="font-medium">{source.label}</span>
                </div>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-text-light-body italic">
          Why this matters: 63% of freelancers we interviewed didn't even know
          they needed to file if their employer already deducted PAYE. They're
          wrong. This prevents that costly mistake.
        </p>
      </div>
    </div>
  );
}
