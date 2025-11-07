"use client";

import { useState } from "react";
import type { OnboardingData } from "../page";

interface IncomeSourceStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
}

const INCOME_SOURCE_QUESTIONS: Record<
  string,
  { label: string; type: "number" | "text" | "multiselect"; options?: string[] }
> = {
  freelancer: {
    label: "How many active clients do you have?",
    type: "number",
  },
  crypto: {
    label: "Which crypto exchanges do you use?",
    type: "multiselect",
    options: ["Binance", "Coinbase", "Kraken", "LocalBitcoins", "Other"],
  },
  content: {
    label: "Which platforms generate revenue?",
    type: "multiselect",
    options: [
      "YouTube",
      "Instagram",
      "TikTok",
      "Twitter/X",
      "Patreon",
      "OnlyFans",
      "Other",
    ],
  },
  business: {
    label: "What type of business?",
    type: "text",
  },
  salaried: {
    label: "What's your side hustle?",
    type: "text",
  },
};

export default function IncomeSourceStep({
  data,
  updateData,
}: IncomeSourceStepProps) {
  const [details, setDetails] = useState<
    Record<string, string | number | string[]>
  >(data.incomeSourceDetails || {});

  const updateDetail = (
    sourceId: string,
    value: string | number | string[]
  ) => {
    const updated = { ...details, [sourceId]: value };
    setDetails(updated);
    updateData({ incomeSourceDetails: updated });
  };

  const toggleOption = (sourceId: string, option: string) => {
    const current = details[sourceId] || [];
    const updated = Array.isArray(current)
      ? current.includes(option)
        ? current.filter((o: string) => o !== option)
        : [...current, option]
      : [option];
    updateDetail(sourceId, updated);
  };

  if (!data.incomeSources || data.incomeSources.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-text-light-body">
          Please go back and select at least one income source.
        </p>
      </div>
    );
  }

  // If "all" was selected, show questions for all income sources
  const sourcesToShow = data.incomeSources.includes("all")
    ? ["freelancer", "crypto", "content", "business", "salaried"]
    : data.incomeSources.filter((s) => s !== "all");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Tell Us More About Your Income
        </h2>
        <p className="text-text-light-body">
          Help us understand your income sources better to provide accurate tax
          calculations.
        </p>
      </div>

      <div className="space-y-6">
        {sourcesToShow.map((sourceId) => {
          const question = INCOME_SOURCE_QUESTIONS[sourceId];
          if (!question) return null;

          const sourceLabels: Record<string, string> = {
            freelancer: "Freelancer/Consultant",
            crypto: "Crypto/Forex Trader",
            content: "Content Creator",
            business: "Small Business Owner",
            salaried: "Salaried + Side Hustle",
          };

          return (
            <div
              key={sourceId}
              className="p-6 border border-border-light rounded-lg bg-gray-50"
            >
              <h3 className="font-semibold text-gray-900 mb-4">
                {sourceLabels[sourceId] || sourceId}
              </h3>

              {question.type === "number" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {question.label}
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={details[sourceId] || ""}
                    onChange={(e) =>
                      updateDetail(sourceId, parseInt(e.target.value) || 0)
                    }
                    placeholder="Enter number"
                    className="block w-full px-4 py-3 border border-border-light rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white"
                  />
                </div>
              )}

              {question.type === "text" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {question.label}
                  </label>
                  <input
                    type="text"
                    value={details[sourceId] || ""}
                    onChange={(e) => updateDetail(sourceId, e.target.value)}
                    placeholder="Enter details"
                    className="block w-full px-4 py-3 border border-border-light rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white"
                  />
                </div>
              )}

              {question.type === "multiselect" && question.options && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {question.label}
                  </label>
                  <div className="space-y-2">
                    {question.options.map((option) => {
                      const detailValue = details[sourceId];
                      const selected =
                        Array.isArray(detailValue) &&
                        detailValue.includes(option);
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => toggleOption(sourceId, option)}
                          className={`w-full text-left px-4 py-2 rounded-lg border-2 transition-all ${
                            selected
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-border-light bg-white text-text-light-body hover:border-primary/50"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                selected
                                  ? "border-primary bg-primary"
                                  : "border-border-light"
                              }`}
                            >
                              {selected && (
                                <svg
                                  className="w-2.5 h-2.5 text-white"
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
                            <span className="text-sm">{option}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> This information helps us provide accurate tax
          estimates. You can update it anytime in your settings.
        </p>
      </div>
    </div>
  );
}
