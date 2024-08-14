import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Step from "../../components/signup/signupStep";
import Form from "../../components/signup/signupForm";
import { client } from '../../utils';

export default function Signup() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    profile_image : null,
    username: '',
    password: '',
    boj_username: '',
    verification_token: '',
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

  const handleSubmit = async () => {
    if (formData.email && formData.password && formData.verification_token && formData.username && formData.boj_username) {
      try {
        console.log('Submitting form with data:', formData); // 폼 데이터 출력
        const response = await client.post('api/v1/auth/signup', {
          email: formData.email,
          username: formData.username,
          password: formData.password,
          boj_username: formData.boj_username,
          verification_token: formData.verification_token,
        });
  
        if (response.status === 200) {
          console.log('Form submitted successfully:', response.data);
          console.log('Form submitted:', formData);
          alert('가입이 완료되었어요!');
        } else {
          console.log('Form submission failed:', response.statusText);
          alert('폼 제출에 실패했습니다!');
        }
      } catch (error) {
        if (error.response && error.response.data) {
          console.log('Form submission error:', error.response.data);
          alert(`폼 제출 중 오류가 발생했습니다: ${error.response.data}`);
        } else {
          console.log('Form submission error:', error);
          alert('폼 제출 중 오류가 발생했습니다!');
        }
      }
    } else {
      console.log('Form validation failed');
      alert('폼 검증에 실패했습니다!');
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
