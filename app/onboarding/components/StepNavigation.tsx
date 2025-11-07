"use client";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  onSkip?: () => void;
  canProceed: boolean;
  isLoading: boolean;
  isLastStep: boolean;
  showSkip?: boolean;
}

export default function StepNavigation({
  currentStep,
  totalSteps,
  onNext,
  onBack,
  onSkip,
  canProceed,
  isLoading,
  isLastStep,
  showSkip = false,
}: StepNavigationProps) {
  return (
    <div className="mt-8 flex items-center justify-between pt-6 border-t border-border-light">
      <div className="flex items-center gap-4">
        {currentStep > 1 && (
          <button
            onClick={onBack}
            disabled={isLoading}
            className="px-6 py-2.5 text-sm font-medium text-text-light-body border border-border-light rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Back
          </button>
        )}
        {showSkip && onSkip && (
          <button
            onClick={onSkip}
            disabled={isLoading}
            className="px-6 py-2.5 text-sm font-medium text-text-light-body hover:text-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Skip for now
          </button>
        )}
      </div>

      <button
        onClick={onNext}
        disabled={!canProceed || isLoading}
        className="px-6 py-2.5 text-sm font-bold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-lg"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {isLastStep ? "Completing..." : "Loading..."}
          </span>
        ) : isLastStep ? (
          "Complete Setup"
        ) : (
          "Continue"
        )}
      </button>
    </div>
  );
}
