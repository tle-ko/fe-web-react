import React, { useState, useRef } from 'react';
import Input from "../../components/common/input";
import { FaCircleCheck, FaCircleExclamation } from "react-icons/fa6";
import { RiShip2Fill } from "react-icons/ri";

export default function SignupForm({ currentStep, formData, onInputChange, onNextStep, onPrevStep }) {
  const [emailVerified, setEmailVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [codeVerified, setCodeVerified] = useState(false);
  const [emailButtonLabel, setEmailButtonLabel] = useState('이메일 중복 확인');
  const [codeButtonLabel, setCodeButtonLabel] = useState('인증번호 발송');
  const [emailColor, setEmailButtonColor] = useState('text-color-blue-main bg-color-blue-w25 hover:bg-color-blue-w50');
  const [CodeColor, setCodeButtonColor] = useState('text-color-blue-main bg-color-blue-w25 hover:bg-color-blue-w50');
  const [Image, setImage] = useState("https://cdn.animaltoc.com/news/photo/202310/266_1351_4337.jpg");
  const fileInput = useRef(null);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/;
    return regex.test(password);
  };

  const validateNickname = (nickname) => {
    return nickname.length >= 2 && nickname.length <= 8;
  };

  const validateBojId = (bojId) => {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(bojId);
  };

  const handleEmailVerification = () => {
    if (validateEmail(formData.email)) {
      setEmailVerified(true);
      setEmailButtonLabel('확인완료');
      setEmailButtonColor('bg-gray-200 text-gray-400 cursor-not-allowed');
    } else {
      setEmailVerified(false);
    }
  };

  const handleCodeVerification = () => {
    if (verificationCode.length === 6) {
      alert("입력한 이메일로 인증번호가 발송되었습니다!");
      setCodeVerified(true);
      setCodeButtonLabel('인증확인 완료');
      setCodeButtonColor('bg-gray-200 text-gray-400 cursor-not-allowed');
    } else {
      setCodeVerified(true);
    }
  };

  const handleImageUpload = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImage(reader.result);
          onInputChange('image', reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setImage("https://cdn.animaltoc.com/news/photo/202310/266_1351_4337.jpg");
      onInputChange('image', null);
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
              <div className="inline-flex gap-6 items-end">
                <Input
                  title="이메일"
                  placeholder="이메일 입력"
                  value={formData.email}
                  width={22}
                  onChange={(e) => onInputChange('email', e.target.value)}
                />
                <button 
                  type="button" 
                  className={`w-36 h-[50px] px-5 py-3 rounded-lg cursor-pointer ${emailColor}`}
                  onClick={handleEmailVerification}
                  disabled={emailVerified}
                >
                  {emailButtonLabel}
                </button>
              </div>
              {formData.email && renderFeedback(emailVerified, "사용 가능한 이메일입니다.", "사용 불가능한 이메일입니다.")}
            </div>

            <div>
              <div className="inline-flex gap-6 items-end">
                <Input
                  title="이메일 인증번호"
                  placeholder="인증번호 입력"
                  value={verificationCode}
                  width={22}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  disabled={!emailVerified}
                />
                <button 
                  className={`w-36 h-[50px] px-5 py-3 rounded-lg cursor-pointer ${CodeColor}`}
                  onClick={handleCodeVerification}
                  disabled={!emailVerified || codeVerified}
                >
                  {codeButtonLabel}
                </button>
              </div>
              {verificationCode && !codeVerified && renderFeedback(false, "", "인증번호가 올바르지 않습니다.")}
            </div>
          </div>
          <div>
            <Input
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
            <Input
              title="비밀번호 확인"
              placeholder="비밀번호를 다시 입력해주세요"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => onInputChange('confirmPassword', e.target.value)}
            />
            {formData.confirmPassword && renderFeedback(
              formData.password === formData.confirmPassword,
              "비밀번호가 일치합니다.",
              "비밀번호가 일치하지 않습니다."
            )}
          </div>
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
          <div className="">
            <Input
              title="닉네임"
              placeholder="2글자 이상 8글자 이내 입력"
              value={formData.nickname}
              onChange={(e) => onInputChange('nickname', e.target.value)}
            />
            {formData.nickname && renderFeedback(
              validateNickname(formData.nickname),
              "사용 가능한 닉네임입니다.",
              "2글자 이상 8글자 이내로 입력해주세요."
            )}
          </div>
          <div>
            <Input
              title="백준 아이디"
              placeholder="Baekjoon Online Judge 아이디 입력"
              value={formData.bojId}
              onChange={(e) => onInputChange('bojId', e.target.value)}
            />
            {formData.bojId && renderFeedback(
              validateBojId(formData.bojId),
              "올바른 형식의 아이디입니다.",
              "영문자와 숫자만 사용 가능합니다."
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
          onClick={() => {fileInput.current.click()}}
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
          {formData.nickname}님이 입력하신<br/>
          회원가입 정보를 확인해주세요
        </p>
        <div className="w-full flex flex-col gap-6 items-center">
          <div className="relative w-32 h-32">
            <img src={Image} alt="profile" className="w-full h-full rounded-full object-cover"/>
          </div>
          <Input
            title="이메일"
            value={formData.email}
            className="disabled curosr-default"
            width={22}
          />
          <Input
            title="닉네임"
            value={formData.nickname}
            className="disabled curosr-default"
            width={22}
          />
          <Input
            title="백준 아이디"
            value={formData.bojId}
            className="disabled cursor-default"
            width={22}
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
            <p className="text-gray-900 text-xl font-semibold text-center">{formData.nickname}님, 가입이 완료되었습니다!<br/></p>
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
      formData.password === formData.confirmPassword
    );
  };

  const isStep2Valid = () => {
    return (
      validateNickname(formData.nickname) &&
      validateBojId(formData.bojId)
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
        return true; // CrewMain 페이지로 이동
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
