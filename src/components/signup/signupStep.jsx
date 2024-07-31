import React from 'react';
import { FaChevronLeft } from "react-icons/fa6";

export default function SignupStep({ currentStep, onPrevStep }) {
  const steps = [1, 2, 3];

  return (
    <div className="relative w-full h-9 justify-start items-center inline-flex">
      {currentStep > 1 && (
        <FaChevronLeft color="#4B5563" size={24} onClick={onPrevStep} className="cursor-pointer" />
      )}
      <div className="w-full">
        <div className="w-[13.625rem] h-0 left-1/4 top-1/2 absolute border-2 border-color-blue-main"></div>
        <div className="absolute left-1/4 top-0 justify-start items-center gap-16 inline-flex">
          {steps.map((step) => (
            <div key={step} className="w-9 h-9 relative">
              <div className={`w-9 h-9 left-0 top-0 absolute rounded-full border-2 border-color-blue-main ${
                step <= currentStep ? 'bg-color-blue-main' : 'bg-white'
              }`} />
              <div className={`left-[14px] top-[6.50px] absolute text-base font-bold ${
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