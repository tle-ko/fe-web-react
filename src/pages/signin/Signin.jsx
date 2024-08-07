import React, { useState } from 'react';
import Input from '../../components/common/input';
import { FaCircleExclamation } from "react-icons/fa6";

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = () => {
    if (!validateEmail(email) || !validatePassword(password)) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
      // 로그인 로직 추가
    }
  };

  return (
    <>
      <div className="flex gap-6 mt-12 mb-12">
        <div className="relative w-1/2 pl-12 pt-12 flex flex-col flex-wrap bg-color-blue-main rounded-lg justify-between min-w-[36rem]">
          <div className="w-fit flex flex-col gap-6">
            <p className="text-gray-50 text-2xl font-extrabold">
              알고리즘 문제 해결 도우미<br />
              TLE와 함께 최적의 해결책을 찾아가요!
            </p>
            <button className="w-full p-4 rounded-lg justify-center items-center inline-flex bg-color-blue-w75 text-center text-white text-lg font-semibold hover:bg-color-blue-hover">
              회원가입
            </button>
          </div>
          <div className="relative mt-12 left-48 max-w-80">
            <img src="../assets/signin/boat.svg" alt="boat" />
          </div>
        </div>
        <div className="w-1/2 box flex flex-col gap-6 min-w-[36rem]">
          <div className="flex flex-col gap-6">
            <p className="font-cafe24 text-gray-900 text-lg font-bold">
              로그인
            </p>
            <Input
              title="아이디"
              placeholder="이메일 입력"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              title="비밀번호"
              type="password"
              placeholder="8~24자 이내, 영문 대소문자, 숫자, 특수기호 조합"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-6 mt-16">
            <button
              className="w-full p-4 rounded-lg justify-center items-center inline-flex bg-color-blue-main text-center text-white text-lg font-semibold hover:bg-color-blue-hover"
              onClick={handleLogin}
            >
              로그인
            </button>
            {showWarning && (
              <div className="inline-flex justify-start items-center gap-2">
                <FaCircleExclamation color="#e84057"/>
                <p className="text-[#e84057] text-base">
                  아이디 또는 비밀번호를 다시 확인해주세요.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}