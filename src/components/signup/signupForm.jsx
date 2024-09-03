import React, { useState, useEffect, useRef } from 'react';
import Input from "../../components/common/input";
import PasswordInput from "./passwordInput";   
import { FaCircleCheck, FaCircleExclamation } from "react-icons/fa6";
import { RiShip2Fill } from "react-icons/ri";
import { client } from '../../utils';

export default function SignupForm({ currentStep, formData, onInputChange, onNextStep, onPrevStep }) {
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [codeVerified, setCodeVerified] = useState(false);
  const [codeButtonLabel, setCodeButtonLabel] = useState('인증번호 발송');
  const [codeColor, setCodeButtonColor] = useState('text-color-blue-main bg-color-blue-w25 hover:bg-color-blue-w50');
  const [codeCursor, setCodeCursor] = useState('cursor-pointer');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameVerified, setUsernameVerified] = useState(false);
  const [Image, setImage] = useState("https://picsum.photos/250/250");
  const fileInput = useRef(null);
  const debounceTimeout = useRef(null);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/;
    return regex.test(password);
  };

  const validateUsername = (username) => {
    return username.length >= 2 && username.length <= 8;
  };

  const validateBojUsername = (boj_username) => {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(boj_username);
  };

  const checkEmailAvailability = async (email) => {
    try {
      const response = await client.get('api/v1/auth/usability', { email });

      if (response.status === 200) {
        setEmailVerified(response.data.email.is_usable);
      } else {
        setEmailVerified(false);
      }
    } catch (error) {
      console.error('Error checking email availability:', error);
      setEmailVerified(false);
    }
  };

  useEffect(() => {
    if (formData.email && validateEmail(formData.email)) {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        checkEmailAvailability(formData.email);
      }, 500); // 500ms debounce time
    } else {
      setEmailVerified(false);
    }
  }, [formData.email]);


  const sendValidateCode = async (email) => {
    try {
      console.log('Sending verification code to:', email); 
      const response = await client.post('api/v1/auth/verification', { email });
      if (response.status === 200) {
        setEmailVerified(true);
        setCodeButtonLabel('인증번호 재발송');
        setCodeButtonColor('text-color-blue-main bg-color-blue-w25 hover:bg-color-blue-w50');
        alert("입력한 이메일로 인증번호가 발송되었습니다!");
      } else {
        alert("잘못된 이메일 혹은 이미 동일한 이메일로 가입된 계정이 존재합니다.");
        setEmailVerified(false);
      }
    } catch (error) {
      console.error('Error sending verification code:', error);
      setEmailVerified(false);
    }
  };

  const getValidateCode = async (email, verification_code) => {
    try {
      console.log('Sending request to verify code:', { email, verification_code });
      const response = await client.post('api/v1/auth/verification', { email, verification_code });
      if (response.status === 200) {
        alert("이메일 인증 성공!");
        setCodeVerified(true);
        onInputChange('verification_token', response.data.verification_token);
      } else {
        alert("올바르지 않은 인증번호입니다.");
        setCodeVerified(false);
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      }
      setCodeVerified(false);
    }
  };

  useEffect(() => {
    if (verificationCode && formData.email) {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        getValidateCode(formData.email, verificationCode);
      }, 300); // 300ms debounce time
    } else {
      setCodeVerified(false);
    }
  }, [verificationCode, formData.email]);

  
  const handleVerificationCodeChange = (e) => {
    const code = e.target.value.toUpperCase();
    setVerificationCode(code);
  };

  const handleCodeInputChange = () => {
    if (!formData.email) {
      alert("이메일을 입력해주세요!");
      return;
    }
  
    if (emailVerified) {
      sendValidateCode(formData.email);
      setCodeButtonLabel('인증번호 재발송');
    }
  };
  
  useEffect(() => {
    if (codeVerified) {
      setCodeButtonLabel('인증완료');
      setCodeButtonColor('bg-gray-200 text-white');
      setCodeCursor('cursor-not-allowed disabled');
    }
  }, [codeVerified]);

  const checkUsernameAvailability = async (username) => {
    try {
      const response = await client.get('api/v1/auth/usability', { params: {username} });
  
      if (response.status === 200) {
        setUsernameVerified(response.data.username.is_usable);
        console.log('Username availability:', response.data.username.is_usable);
      } else {
        setUsernameVerified(false);
      }
    } catch (error) {
      console.error('Error checking username availability:', error);
      setUsernameVerified(false);
    }
  };
  
  useEffect(() => {
    if (formData.username && validateUsername(formData.username)) {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        checkUsernameAvailability(formData.username);
      }, 500); // 500ms debounce time
    } else {
      setUsernameVerified(false);
    }
  }, [formData.username]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      onInputChange('profile_image', file);
    }
  };

  const renderFeedback = (isValid, validMessage, invalidMessage) => (
    <div className="flex gap-2 items-center mt-2">
      {isValid ? (
        <>
          <FaCircleCheck size={16} color="#5383E8"/>
          <p className="text-color-blue-main">{validMessage}</p>
        </>
      ) : (
        <>
          <FaCircleExclamation size={16} color="#E84057"/>
          <p className="text-color-red-main">{invalidMessage}</p>
        </>
      )}
    </div>
  );

  const renderStep1 = () => (
    <>
      <div className="w-full flex-col justify-start items-start gap-6 inline-flex">
        <p className="text-gray-900 text-2xl font-bold">
          아이디와 비밀번호를<br />
          입력해주세요
        </p>
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <div>
              <div className="w-full inline-flex gap-6 items-end">
                <Input
                  title="이메일"
                  placeholder="이메일 입력"
                  value={formData.email}
                  onChange={(e) => onInputChange('email', e.target.value)}
                />
              </div>
              {formData.email && renderFeedback(emailVerified, "사용 가능한 이메일입니다.", "사용 불가능한 이메일입니다. 다시 입력해주세요.")}
            </div>
  
            <div>
              <div className="w-full inline-flex items-end">
                <Input
                  title="이메일 인증번호"
                  placeholder="인증번호 입력"
                  value={verificationCode}
                  width={22}
                  onChange={handleVerificationCodeChange}
                  disabled={!emailVerified}
                  style={{ textTransform: 'uppercase' }}
                />
                <button 
                  className={`w-44 h-[50px] px-5 py-3 rounded-lg whitespace-nowrap ${codeCursor} ${codeColor}`}
                  onClick={handleCodeInputChange}
                  disabled={!emailVerified || codeVerified}
                >
                  {codeButtonLabel}
                </button>
              </div>
              {verificationCode && renderFeedback(codeVerified, "인증번호가 확인되었습니다.", "인증번호가 올바르지 않습니다. 다시 입력해주세요.")}
            </div>
          </div>
          <form className="flex flex-col gap-6">
          <div>
            <PasswordInput
              title="비밀번호"
              placeholder="8~24자 이내, 영문 대소문자, 숫자, 특수기호 조합"
              type="password"
              value={formData.password}
              onChange={(e) => onInputChange('password', e.target.value)}
            />
            {formData.password && renderFeedback(
              validatePassword(formData.password),
              "사용 가능한 비밀번호입니다.",
              "8~24자 이내, 영문 대소문자, 숫자, 특수기호를 모두 포함해야 합니다."
            )}
          </div>
          <div>
            <PasswordInput
              title="비밀번호 확인"
              placeholder="비밀번호를 다시 입력해주세요"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {confirmPassword && renderFeedback(
              formData.password === confirmPassword,
              "비밀번호가 일치합니다.",
              "비밀번호가 일치하지 않습니다. 다시 입력해주세요."
            )}
          </div>
          </form>
        </div>
      </div>
    </>
  );

  const renderStep2 = () => (
    <>
      <div className="w-full flex-col justify-start items-start gap-6 inline-flex">
        <p className="text-gray-900 text-2xl font-bold">
          서비스 이용을 위해<br/>
          회원님의 정보를 입력해주세요
        </p>
        <div className="w-full flex flex-col gap-6">
            <div>
            <Input
              title="닉네임"
              placeholder="2글자 이상 8글자 이내 입력"
              value={formData.username}
              onChange={(e) => onInputChange('username', e.target.value)}
            />
          {formData.username && renderFeedback(
            usernameVerified,
            "사용 가능한 닉네임입니다.",
            "사용 불가능한 닉네임입니다. 다시 입력해주세요."
          )}
            </div>
          <div>
            <Input
              title="백준 아이디"
              placeholder="Baekjoon Online Judge 아이디 입력"
              value={formData.boj_username}
              onChange={(e) => onInputChange('boj_username', e.target.value)}
            />
            {formData.boj_username && renderFeedback(
              validateBojUsername(formData.boj_username),
              "올바른 형식의 아이디입니다.",
              "영문자와 숫자만 사용 가능합니다. 다시 입력해주세요."
            )}
          </div>
        </div>
      </div>
    </>
  );

  const renderStep3 = () => (
    <div className="w-full flex-col justify-start items-start gap-6 inline-flex">
      <div className="w-full flex-col justify-start items-start gap-4 inline-flex">
        <p className="text-gray-900 text-2xl font-bold">
          서비스 이용을 위해<br/>
          프로필 사진을 등록해주세요
        </p>
        <p className="text-gray-600 text-base font-normal">프로필 사진 등록은 선택이며, 미등록 시 기본 프로필 사진을 사용합니다.</p>
      </div>
  
      <div className="w-full flex-col justify-center items-center gap-6 flex"> 
        <div className="relative w-32 h-32">
          <img src={Image} alt="profile" className="w-full h-full rounded-full object-cover"/>
          <input 
            type="file"
            className="hidden"
            accept='image/jpg,image/png,image/jpeg'
            onChange={handleImageUpload}
            ref={fileInput}
          />
        </div>
        <button 
          type="button" 
          className="px-4 py-2 rounded-lg justify-center items-center inline-flex bg-color-blue-main hover:bg-color-blue-hover cursor-pointer text-center text-white text-sm font-semibold"
          onClick={() => {
            if (fileInput.current) {
              fileInput.current.click();
            }
          }}
        >
          사진 등록
        </button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <>
      <div className="w-full flex-col justify-start items-start gap-6 inline-flex">
        <p className="text-gray-900 text-2xl font-bold">
          {formData.username}님이 입력하신<br/>
          회원가입 정보를 확인해주세요
        </p>
        <div className="w-full flex flex-col gap-6 items-center justify-center">
          <div className="relative w-32 h-32">
            <img src={Image} alt="profile" className="w-full h-full rounded-full object-cover"/>
          </div>
          <Input
            title="이메일"
            value={formData.email}
            className="disabled cursor-not-allowed"
            readOnly
          />
          <Input
            title="닉네임"
            value={formData.username}
            className="disabled cursor-not-allowed"
            readOnly
          />
          <Input
            title="백준 아이디"
            value={formData.boj_username}
            className="disabled cursor-not-allowed"
            readOnly
          />
        </div>
      </div>
    </>
  );

  const renderStep5 = () => (
    <>
      <div className="flex-col justify-center items-center gap-12 inline-flex">
        <div className="self-stretch flex-col justify-start items-center gap-6 flex">
          <RiShip2Fill size={128} color="#5383E8"/>
          <div className="flex-col justify-center items-center gap-2 flex">
            <p className="text-gray-900 text-xl font-semibold text-center">{formData.username}님, 가입이 완료되었습니다!<br/></p>
            <p className="text-color-blue-main text-xl font-semibold text-center">TLE와 함께 최적의 해결책을 찾아가요😉</p>
          </div>
        </div>
      </div>
    </>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      case 5:
        return renderStep5();
      default:
        return null;
    }
  };

  const isStep1Valid = () => {
    return (
      emailVerified &&
      codeVerified &&
      validatePassword(formData.password) &&
      formData.password === confirmPassword
    );
  };

  const isStep2Valid = () => {
    return (
      validateUsername(formData.username) &&
      usernameVerified &&
      validateBojUsername(formData.boj_username)
    );
  };

  const getStepValidity = () => {
    switch (currentStep) {
      case 1:
        return isStep1Valid();
      case 2:
        return isStep2Valid();
      case 3:
        return true; // 사진 등록은 선택사항이므로 항상 true
      case 4:
        return true;
      case 5:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="w-full flex flex-col gap-12">
      {renderCurrentStep()}
      <button
        className={`w-full p-4 rounded-lg justify-center items-center inline-flex ${
          getStepValidity() ? 'bg-color-blue-main hover:bg-color-blue-hover' : 'bg-gray-200'
        } text-center text-white text-lg font-semibold`}
        onClick={onNextStep}
        disabled={!getStepValidity()}
      >
        {currentStep === 4 ? '가입 완료' : currentStep === 5 ? '시작하기' : '다음'}
      </button>
    </div>
  );
}