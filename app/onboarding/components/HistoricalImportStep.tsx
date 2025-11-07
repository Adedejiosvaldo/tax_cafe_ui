"use client";

import { useState } from "react";
import Icon from "../../components/Icon";
import type { OnboardingData } from "../page";

interface HistoricalImportStepProps {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
}

export default function HistoricalImportStep({
  data,
  updateData,
}: HistoricalImportStepProps) {
  const [importMethod, setImportMethod] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [isImporting, setIsImporting] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(files);
  };

  const handleImport = async () => {
    if (!importMethod) return;

    setIsImporting(true);
    setImportProgress(0);

    try {
      let response;

      if (importMethod === "upload") {
        const formData = new FormData();
        uploadedFiles.forEach((file) => {
          formData.append("files", file);
        });
        formData.append("dateRange", JSON.stringify(dateRange));

        response = await fetch("/api/onboarding/import-historical", {
          method: "POST",
          body: formData,
        });
      } else {
        response = await fetch("/api/onboarding/import-historical", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            method: importMethod,
            dateRange,
          }),
        });
      }

      if (response.ok) {
        const result = await response.json();
        updateData({
          historicalDataImported: true,
          historicalData: result,
        });
        setImportProgress(100);
      } else {
        throw new Error("Import failed");
      }
    } catch (error) {
      console.error("Error importing data:", error);
      alert("Failed to import historical data. Please try again.");
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Import Historical Data
        </h2>
        <p className="text-text-light-body">
          Import your past financial data to get a complete picture of your tax
          situation.
        </p>
      </div>

      {/* Import Methods */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Upload Bank Statements */}
          <button
            type="button"
            onClick={() => setImportMethod("upload")}
            className={`p-6 border-2 rounded-lg text-left transition-all ${
              importMethod === "upload"
                ? "border-primary bg-primary/10"
                : "border-border-light hover:border-primary/50"
            }`}
          >
            <div className="flex items-start gap-4">
              <Icon
                name="account_balance"
                size={32}
                className={
                  importMethod === "upload"
                    ? "text-primary"
                    : "text-text-light-body"
                }
              />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Upload Bank Statements
                </h3>
                <p className="text-sm text-text-light-body">
                  Upload PDF or CSV files of your bank statements
                </p>
              </div>
            </div>
          </button>

          {/* Import from Tax Software */}
          <button
            type="button"
            onClick={() => setImportMethod("software")}
            className={`p-6 border-2 rounded-lg text-left transition-all ${
              importMethod === "software"
                ? "border-primary bg-primary/10"
                : "border-border-light hover:border-primary/50"
            }`}
          >
            <div className="flex items-start gap-4">
              <Icon
                name="account_balance"
                size={32}
                className={
                  importMethod === "software"
                    ? "text-primary"
                    : "text-text-light-body"
                }
              />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Import from Tax Software
                </h3>
                <p className="text-sm text-text-light-body">
                  Import data from previous tax filing software
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Manual Entry Option */}
        <button
          type="button"
          onClick={() => setImportMethod("manual")}
          className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
            importMethod === "manual"
              ? "border-primary bg-primary/10"
              : "border-border-light hover:border-primary/50"
          }`}
        >
          <div className="flex items-center gap-3">
            <Icon
              name="account_balance"
              size={24}
              className={
                importMethod === "manual"
                  ? "text-primary"
                  : "text-text-light-body"
              }
            />
            <span className="font-medium text-gray-900">
              Enter data manually
            </span>
          </div>
        </button>
      </div>

      {/* File Upload Section */}
      {importMethod === "upload" && (
        <div className="p-6 border border-border-light rounded-lg bg-gray-50">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Bank Statements (PDF or CSV)
          </label>
          <input
            type="file"
            multiple
            accept=".pdf,.csv"
            onChange={handleFileUpload}
            className="block w-full text-sm text-text-light-body file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-white hover:file:bg-primary/90"
          />
          {uploadedFiles.length > 0 && (
            <div className="mt-3">
              <p className="text-sm text-text-light-body mb-2">
                Selected files: {uploadedFiles.length}
              </p>
              <ul className="text-xs text-text-light-body space-y-1">
                {uploadedFiles.map((file, i) => (
                  <li key={i}>• {file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Date Range Selector */}
      {importMethod && importMethod !== "skip" && (
        <div className="p-6 border border-border-light rounded-lg bg-gray-50">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Select Date Range
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-text-light-body mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange({ ...dateRange, start: e.target.value })
                }
                className="block w-full px-4 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white"
              />
            </div>
            <div>
              <label className="block text-xs text-text-light-body mb-1">
                End Date
              </label>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) =>
                  setDateRange({ ...dateRange, end: e.target.value })
                }
                className="block w-full px-4 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-primary focus:border-primary sm:text-sm bg-white"
              />
            </div>
          </div>
        </div>
      )}

      {/* Import Progress */}
      {isImporting && (
        <div className="p-6 border border-border-light rounded-lg bg-blue-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-900">
              Importing data...
            </span>
            <span className="text-sm text-blue-700">{importProgress}%</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${importProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Success State */}
      {data.historicalDataImported && (
        <div className="p-6 border border-green-200 rounded-lg bg-green-50">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="check_circle" size={20} className="text-green-600" />
            <span className="text-sm font-medium text-green-800">
              Historical data imported successfully
            </span>
          </div>
          {data.historicalData && (
            <div className="text-sm text-green-700 mt-2">
              <p>
                • {data.historicalData.transactionCount || 0} transactions
                imported
              </p>
              <p>
                • Date range: {data.historicalData.startDate} to{" "}
                {data.historicalData.endDate}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Import Button */}
      {importMethod && importMethod !== "skip" && (
        <button
          type="button"
          onClick={handleImport}
          disabled={
            isImporting ||
            (importMethod === "upload" && uploadedFiles.length === 0)
          }
          className="w-full px-4 py-3 text-sm font-medium text-white bg-primary hover:bg-primary/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isImporting ? "Importing..." : "Import Historical Data"}
        </button>
      )}

      {/* Skip Option */}
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> You can skip this step and start fresh. You can
          always import historical data later from your dashboard.
        </p>
      </div>
    </div>
  );
}
