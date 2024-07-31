import React from 'react';
import Input from "../../components/common/input";
import { FaCircleCheck, FaCircleExclamation } from "react-icons/fa6";
import { MdAddAPhoto } from "react-icons/md";

export default function SignupForm({ currentStep, formData, onInputChange, onNextStep, onPrevStep, isValid }) {
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/;
    return regex.test(password);
  };

  const validateNickname = (nickname) => {
    return(console.log(nickname));
  };

  const validateCode = (code) => {
    return(console.log(code))
  };

  const renderPasswordFeedback = () => {
    if (!formData.password) return null;
    
    const isValid = validatePassword(formData.password);
    return (
      <div className="flex gap-2 items-center mt-4">
        {isValid ? (
          <>
            <FaCircleCheck size={16} color="#5383E8"/>
            <p className="text-color-blue-main">사용 가능한 비밀번호입니다.</p>
          </>
        ) : (
          <>
            <FaCircleExclamation size={16} color="#E84057"/>
            <p className="text-color-red-main">8~24자 이내, 영문 대소문자, 숫자, 특수기호를 모두 포함해야 합니다.</p>
          </>
        )}
      </div>
    );
  };

  const renderPasswordConfirmFeedback = () => {
    if (!formData.confirmPassword) return null;
    
    const isMatch = formData.password === formData.confirmPassword;
    return (
      <div className="flex gap-2 items-center mt-4">
        {isMatch ? (
          <>
            <FaCircleCheck size={16} color="#5383E8"/>
            <p className="text-color-blue-main">비밀번호가 일치합니다.</p>
          </>
        ) : (
          <>
            <FaCircleExclamation size={16} color="#E84057"/>
            <p className="text-color-red-main">비밀번호가 일치하지 않습니다.</p>
          </>
        )}
      </div>
    );
  };


  const renderStep1 = () => (
    <>
      <div className="w-full flex-col justify-start items-start gap-6 inline-flex">
        <p className="text-gray-900 text-2xl font-bold">
          아이디와 비밀번호를<br />
          입력해주세요
        </p>
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-6">
              <div className="inline-flex gap-6 items-end">
              <Input
                title="이메일"
                placeholder="이메일 입력"
                value={formData.email}
                width={24.125}
                onChange={(e) => onInputChange('email', e.target.value)}
              />
              <button className="w-full h-[50px] px-5 py-3 rounded-lg bg-color-blue-w25 hover:bg-color-blue-w50">
              <p className="text-color-blue-main">중복확인</p>
              </button>
              </div>

              {formData.email && (
              <div className="flex gap-2 items-center">
                {isValid ? (
                  <>
                    <FaCircleCheck size={16} color="#5383E8"/>
                    <p className="text-color-blue-main">사용 가능한 이메일입니다.</p>
                  </>
                ) : (
                  <>
                    <FaCircleExclamation size={16} color="#E84057"/>
                    <p className="text-color-red-main">사용 불가능한 이메일입니다.</p>
                  </>
                )}
              </div>
            )}

            <div className="inline-flex gap-6 items-end">
            <Input
                title="이메일 인증번호"
                placeholder="인증번호 입력"
                width={24.125}
                onChange={(e) => onInputChange('code', e.target.value)}
              />
              <button className="w-full h-[50px] px-5 py-3 rounded-lg bg-color-blue-w25 hover:bg-color-blue-w50">
                <p className="text-color-blue-main">인증하기</p>
              </button>
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
            {renderPasswordFeedback()}
          </div>
          <div>
            <Input
              title="비밀번호 확인"
              placeholder="비밀번호를 다시 입력해주세요"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => onInputChange('confirmPassword', e.target.value)}
            />
            {renderPasswordConfirmFeedback()}
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
              className="w-full"
              value={formData.nickname}
              onChange={(e) => onInputChange('nickname', e.target.value)}
            />
            {formData.nickname && (
              <div className="flex gap-2 items-center mt-2">
                {isValid ? (
                  <>
                    <FaCircleCheck size={16} color="#5383E8"/>
                    <p className="text-color-blue-main">사용 가능한 닉네임입니다.</p>
                  </>
                ) : (
                  <>
                    <FaCircleExclamation size={16} color="#E84057"/>
                    <p className="text-color-red-main">사용 불가능한 닉네임입니다.</p>
                  </>
                )}
              </div>
            )}
          </div>
          <div>
            <Input
              title="백준 아이디"
              placeholder="Baekjoon Online Judge 아이디 입력"
              type="text"
              value={formData.bojId}
              onChange={(e) => onInputChange('bojId', e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );

  const renderStep3 = () => (
    <>
      <div className="w-full flex-col justify-start items-start gap-6 inline-flex">
        <p className="text-gray-900 text-2xl font-bold">
        서비스 이용을 위해<br/>
        프로필 사진을 등록해주세요
        </p>
        <p className="text-gray-600 text-base font-normal">프로필 사진 등록은 선택이며, 미등록 시 기본 프로필 사진을 사용합니다.</p>
        <div className="w-full flex flex-col gap-6 relative">
          <div className="flex flex-col items-center relative"> 
                <div className="w-32 h-32 absolute bg-gray-300 rounded-full">
                    <div className="w-8 h-8 left-[48px] top-[48px] relative">
                    <MdAddAPhoto size={32} color="#5383E8" />
                    </div>
                </div>
                <div className="h-[33px] px-4 py-2 bg-[#5383e8]/25 rounded-lg justify-center items-center inline-flex">
                <div className="text-center text-[#5383e8] text-sm font-semibold font-['Pretendard']">사진 등록</div>
                </div>
            </div>
        </div>
      </div>
    </>
  );

  const renderStep4 = () => (
    <>
      <div className="w-full flex-col justify-start items-start gap-6 inline-flex">
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
      default:
        return null;
    }
  };

  const isStep1Valid = () => {
    return (
      formData.email &&
      validatePassword(formData.password) &&
      formData.password === formData.confirmPassword
    );
  };

  const isStep2Valid = () => {
    return (
      formData.nickname && formData.bojId
    );
  };

  const getStepValidity = () => {
    switch (currentStep) {
      case 1:
        return isStep1Valid();
      case 2:
        return isStep2Valid();
      case 3:
        return true; // Photo is optional
      default:
        return false;
    }
  };

  return (
    <>
      {renderCurrentStep()}
      <button
        className={`w-full p-4 rounded-lg justify-center items-center inline-flex ${
          getStepValidity() ? 'bg-color-blue-main hover:bg-color-blue-hover' : 'bg-gray-200'
        } text-center text-white text-lg font-semibold`}
        onClick={onNextStep}
        disabled={!getStepValidity()}
      >
        {currentStep === 3 ? '완료' : '다음'}
      </button>
    </>
  );
}