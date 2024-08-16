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
    profile_image: null,
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

  const getStepValidity = () => {
    switch (currentStep) {
      case 1:
        return formData.email && formData.password;
      case 2:
        return formData.username && formData.boj_username;
      case 3:
        return true;
      case 4:
        return true;
      case 5:
        return true;
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    const isFormValid = getStepValidity();
  
    if (isFormValid) {
      try {
        const { email, username, password, boj_username, verification_token, profile_image } = formData;
        const submitData = new FormData();
  
        submitData.append('email', email);
        submitData.append('username', username);
        submitData.append('password', password);
        submitData.append('boj_username', boj_username);
        submitData.append('verification_token', verification_token);
  
        if (profile_image) {
          submitData.append('profile_image', profile_image);
        }
  
        const response = await client.post('api/v1/auth/signup', submitData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.status === 201) {
          console.log('Form submitted successfully:', response.data);
        } else {
          console.log('Form submission failed:', response.statusText);
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
          getStepValidity={getStepValidity}
        />
      </div>
    </div>
  );
}