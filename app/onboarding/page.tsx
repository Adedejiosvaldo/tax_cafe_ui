"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ProgressIndicator from "./components/ProgressIndicator";
import WelcomeStep from "./components/WelcomeStep";
import TINStep from "./components/TINStep";
import IncomeSourceStep from "./components/IncomeSourceStep";
import BankingConnectionStep from "./components/BankingConnectionStep";
import PaymentsCryptoStep from "./components/PaymentsCryptoStep";
import HistoricalImportStep from "./components/HistoricalImportStep";
import StepNavigation from "./components/StepNavigation";

export interface OnboardingData {
  hasTIN: boolean | null;
  tin: string;
  incomeSources: string[];
  incomeSourceDetails: Record<string, any>;
  connectedBanks: any[];
  connectedPayments: any[];
  connectedCrypto: any[];
  historicalDataImported: boolean;
  historicalData: any;
}

const TOTAL_STEPS = 6;

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    hasTIN: null,
    tin: "",
    incomeSources: [],
    incomeSourceDetails: {},
    connectedBanks: [],
    connectedPayments: [],
    connectedCrypto: [],
    historicalDataImported: false,
    historicalData: null,
  });

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("onboarding_data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setOnboardingData(parsed);
      } catch (e) {
        console.error("Failed to parse saved onboarding data", e);
      }
    }

    const savedStep = localStorage.getItem("onboarding_step");
    if (savedStep) {
      const step = parseInt(savedStep, 10);
      if (step >= 1 && step <= TOTAL_STEPS) {
        setCurrentStep(step);
      }
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem("onboarding_data", JSON.stringify(onboardingData));
    localStorage.setItem("onboarding_step", currentStep.toString());
  }, [onboardingData, currentStep]);

  const updateData = (updates: Partial<OnboardingData>) => {
    setOnboardingData((prev) => ({ ...prev, ...updates }));
  };

  const handleNext = async () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    } else {
      await handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    handleNext();
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      // Submit onboarding data to API
      const response = await fetch("/api/onboarding/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(onboardingData),
      });

      if (response.ok) {
        // Clear saved progress
        localStorage.removeItem("onboarding_data");
        localStorage.removeItem("onboarding_step");

        // Redirect to dashboard or main app
        // For now, redirect to home page since dashboard doesn't exist yet
        router.push("/");
      } else {
        throw new Error("Failed to complete onboarding");
      }
    } catch (error) {
      console.error("Error completing onboarding:", error);
      // Still redirect on error, but log it
      router.push("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 1:
        return onboardingData.incomeSources.length > 0;
      case 2:
        return (
          onboardingData.hasTIN === false ||
          (onboardingData.hasTIN === true && onboardingData.tin.length > 0)
        );
      case 3:
        return true; // Income source details are optional
      case 4:
        return true; // Banking connection is optional
      case 5:
        return true; // Payments/crypto connection is optional
      case 6:
        return true; // Historical import is optional
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <WelcomeStep data={onboardingData} updateData={updateData} />;
      case 2:
        return <TINStep data={onboardingData} updateData={updateData} />;
      case 3:
        return (
          <IncomeSourceStep data={onboardingData} updateData={updateData} />
        );
      case 4:
        return (
          <BankingConnectionStep
            data={onboardingData}
            updateData={updateData}
          />
        );
      case 5:
        return (
          <PaymentsCryptoStep data={onboardingData} updateData={updateData} />
        );
      case 6:
        return (
          <HistoricalImportStep data={onboardingData} updateData={updateData} />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-background-light flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl">
        <div className="bg-white rounded-xl shadow-lg border border-border-light p-8">
          {/* Progress Indicator */}
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
          />

          {/* Step Content */}
          <div className="mt-8 min-h-[400px]">{renderStep()}</div>

          {/* Navigation */}
          <StepNavigation
            currentStep={currentStep}
            totalSteps={TOTAL_STEPS}
            onNext={handleNext}
            onBack={handleBack}
            onSkip={handleSkip}
            canProceed={canProceed()}
            isLoading={isLoading}
            isLastStep={currentStep === TOTAL_STEPS}
            showSkip={currentStep >= 4 && currentStep < TOTAL_STEPS}
          />
        </div>
      </div>
    </div>
  );
}
