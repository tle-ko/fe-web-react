import React from 'react';
import { FaChevronLeft } from "react-icons/fa6";

export default function SignupStep({ currentStep, onPrevStep, handleSubmit }) {
  const steps = [1, 2, 3, 4];

  return (
    <div className="relative w-full h-8 justify-start items-center inline-flex">
      <div className="w-6 h-6">
      {(currentStep > 1 && currentStep < 5 ) &&  (
        <FaChevronLeft color="#5383E8" size={24} onClick={onPrevStep} className="cursor-pointer" />
      )}
      </div>
      <div className="w-full">
        <div className="absolute top-0 right-0 justify-start items-center gap-4 inline-flex">
          {steps.map((step) => (
            <div key={step} className="w-8 h-8 relative">
              <div className={`w-8 h-8 left-0 top-0 absolute rounded-full border-2 border-color-blue-main ${
                step <= currentStep ? 'bg-color-blue-main' : 'bg-white'
              }`}
              onClick={step === 4 ? handleSubmit : undefined}
              />
              <div className={`text-center left-[11px] top-[4px] absolute text-base font-bold ${
                step <= currentStep ? 'text-white' : 'text-color-blue-main'
              }`}>
                {step}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}