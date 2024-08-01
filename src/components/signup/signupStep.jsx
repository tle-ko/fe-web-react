import React from 'react';
import { FaChevronLeft } from "react-icons/fa6";

export default function SignupStep({ currentStep, onPrevStep }) {
  const steps = [1, 2, 3, 4];

  return (
    <div className="relative w-full h-9 justify-start items-center inline-flex">
      <div className="w-6 h-6">
      {(currentStep > 1 && currentStep < 4 ) &&  (
        <FaChevronLeft color="#4B5563" size={24} onClick={onPrevStep} className="cursor-pointer" />
      )}
      </div>
      <div className="w-full">
        <div className="w-[20rem] h-0 ml-16 top-1/2 absolute border-2 border-color-blue-main"></div>
        <div className="absolute ml-16 top-0 justify-start items-center gap-16 inline-flex">
          {steps.map((step) => (
            <div key={step} className="w-9 h-9 relative">
              <div className={`w-9 h-9 left-0 top-0 absolute rounded-full border-2 border-color-blue-main ${
                step <= currentStep ? 'bg-color-blue-main' : 'bg-white'
              }`}/>
              <div className={`left-[12.5px] top-[6.50px] absolute text-base font-bold ${
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