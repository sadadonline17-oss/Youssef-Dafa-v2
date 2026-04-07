import React from 'react';
import { Check } from 'lucide-react';

interface ProgressStep {
  id: string;
  label: string;
  description?: string;
}

interface PaymentProgressProps {
  steps: ProgressStep[];
  currentStepIndex: number;
  className?: string;
}

export const PaymentProgress: React.FC<PaymentProgressProps> = ({
  steps,
  currentStepIndex,
  className = '',
}) => {
  return (
    <div className={`payment-progress mb-8 relative ${className}`}>
      {/* Connector Line */}
      <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-0" />

      {/* Steps */}
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const isActive = index === currentStepIndex;
          const isCompleted = index < currentStepIndex;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center flex-1"
            >
              {/* Step Circle */}
              <div
                className={`
                  payment-progress__step w-10 h-10 rounded-full
                  flex items-center justify-center font-bold
                  relative z-10 transition-all duration-300
                  ${isCompleted
                    ? 'bg-green-500 border-2 border-green-500 text-white'
                    : isActive
                      ? 'bg-blue-600 border-2 border-blue-600 text-white scale-110'
                      : 'bg-white border-2 border-gray-300 text-gray-500'
                  }
                `}
              >
                {isCompleted ? (
                  <Check size={20} />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>

              {/* Step Label */}
              <div
                className={`
                  payment-progress__label text-sm font-medium mt-2 text-center max-w-[100px]
                  ${isActive ? 'text-gray-900 font-semibold' : 'text-gray-500'}
                `}
              >
                {step.label}
              </div>

              {/* Step Description (if active) */}
              {isActive && step.description && (
                <div className="text-xs text-gray-500 mt-1 text-center max-w-[120px]">
                  {step.description}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentProgress;
