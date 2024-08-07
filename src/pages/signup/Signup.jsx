import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Step from "../../components/signup/signupStep";
import Form from "../../components/signup/signupForm";

export default function Signup() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    bojId: '',
    image: null
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
    } else if (currentStep === 4) {
      handleSubmit();
      setCurrentStep(prevStep => prevStep + 1);
    } else if (currentStep === 5) {
      navigate('/crew');
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

  const handleSubmit = () => {
    if (formData.email && formData.password && formData.confirmPassword && formData.nickname && formData.bojId) {
      console.log('Form submitted:', formData);
      alert('가입이 완료되었습니다!');
    } else {
      console.log('Form validation failed');
      alert('폼 검증에 실패했습니다. 모든 필드를 올바르게 입력했는지 확인하세요.');
    }
  };

  return (
    <div className="box min-w-[40rem] py-16 mb-16 items-center">
      <div className="w-[32rem] flex flex-col gap-12 items-center">
        <Step currentStep={currentStep} onPrevStep={handlePrevStep} handleSubmit={handleSubmit} />
        <Form
          currentStep={currentStep}
          formData={formData}
          onInputChange={handleInputChange}
          onNextStep={handleNextStep}
          onPrevStep={handlePrevStep}
          handleSubmit={handleSubmit} 
        />
      </div>
    </div>
  );
}
