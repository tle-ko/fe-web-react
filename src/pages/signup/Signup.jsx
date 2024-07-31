import React, { useState } from 'react';
import Step from "../../components/signup/signupStep";
import Form from "../../components/signup/signupForm";

export default function Signup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    bojId: '',
    photo: null
  });

  const handleInputChange = (name, value) => {
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prevStep => prevStep + 1);
    } else {
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.email && formData.password && formData.confirmPassword;
      case 2:
        return formData.nickname && formData.bojId;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="box min-w-[40rem] py-16 mb-16 items-center">
      <div className="w-[512px] flex flex-col gap-12 items-center">
        <Step currentStep={currentStep} />
        <Form
          currentStep={currentStep}
          formData={formData}
          onInputChange={handleInputChange}
          onNextStep={handleNextStep}
          onPrevStep={handlePrevStep}
          isValid={isStepValid()}
        />
      </div>
    </div>
  );
}