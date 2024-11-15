import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Step from '../../components/signup/signupStep';
import Form from '../../components/signup/signupForm';
import { client } from '../../utils';
import { setToken, setUserInfo } from '../../auth';

const defaultProfileImage = 'https://i.ibb.co/xDxmBXd/defult-profile-image.png';

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
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNextStep = () => {
    if (getStepValidity()) {
      if (currentStep < 4) {
        setCurrentStep((prevStep) => prevStep + 1);
      } else if (currentStep === 4) {
        handleSubmit();
      }
    } else {
      alert('폼 검증에 실패했습니다!');
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
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
      default:
        return false;
    }
  };

  const handleSubmit = async () => {
    const isFormValid = getStepValidity();

    if (isFormValid) {
      try {
        const { email, username, password, boj_username, verification_token, profile_image } =
          formData;
        const submitData = new FormData();

        submitData.append('email', email);
        submitData.append('username', username);
        submitData.append('password', password);
        submitData.append('boj_username', boj_username);
        submitData.append('verification_token', verification_token);

        if (profile_image) {
          submitData.append('profile_image', profile_image);
        } else {
          // 기본 이미지를 Blob으로 변환하여 추가
          const response = await fetch(defaultProfileImage);
          const blob = await response.blob();
          submitData.append('profile_image', blob, 'default-profile-image.png');
        }

        const response = await client.post('/auth/signup', submitData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 201) {
          alert('회원가입이 완료되었어요!');

          // 알림 확인 후 자동 로그인을 요청
          const loginResponse = await client.post(
            '/auth/signin',
            {
              email: formData.email,
              password: formData.password,
            },
            {
              headers: {
                'Content-Type': 'application/json; charset=UTF-8',
              },
            }
          );

          if (loginResponse.status === 200) {
            const { token, id, username, profile_image } = loginResponse.data;
            setToken(token);
            setUserInfo(id, username, profile_image);
            navigate('/crew');
            window.location.reload();
          } else {
            console.log('자동 로그인 실패:', loginResponse.statusText);
          }
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
    <div className="box mb-16 min-w-[40rem] items-center py-16">
      <div className="flex w-[32rem] flex-col items-center gap-12">
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
