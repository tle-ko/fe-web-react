import React from 'react';
import { FaChevronLeft } from 'react-icons/fa6';

export default function SignupStep({ currentStep, onPrevStep, handleSubmit }) {
  const steps = [1, 2, 3, 4];

  return (
    <div className="relative inline-flex h-8 w-full items-center justify-start">
      <div className="h-6 w-6">
        {currentStep > 1 && currentStep < 5 && (
          <FaChevronLeft
            color="#5383E8"
            size={24}
            onClick={onPrevStep}
            className="cursor-pointer"
          />
        )}
      </div>
      <div className="w-full">
        <div className="absolute right-0 top-0 inline-flex items-center justify-start gap-4">
          {steps.map((step) => (
            <div key={step} className="relative h-8 w-8">
              <div
                className={`absolute left-0 top-0 h-8 w-8 rounded-full border-2 border-color-blue-main ${
                  step <= currentStep ? 'bg-color-blue-main' : 'bg-white'
                }`}
                onClick={step === 4 ? handleSubmit : undefined}
              />
              <div
                className={`absolute left-[11px] top-[4px] text-center text-base font-bold ${
                  step <= currentStep ? 'text-white' : 'text-color-blue-main'
                }`}
              >
                {step}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
