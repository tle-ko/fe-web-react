import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/common/input';
import PasswordInput from '../../components/signup/passwordInput';
import { FaCircleExclamation } from "react-icons/fa6";
import { client } from '../../utils';
import { setToken, setUserInfo } from '../../auth';

export default function Signin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        document.querySelector('form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/;
    return passwordRegex.test(password);
  };

  const handleLogin = async () => {

    if (!validateEmail(email) || !validatePassword(password)) {
      setShowWarning(true);
      return;
    }

    setShowWarning(false);

    try {
      const response = await client.post('/api/v1/auth/signin', {
        email,
        password
      }, {
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        }
      });

      if (response.status === 200) {
        const { token, id, username, profile_image } = response.data;
        setToken(token);
        setUserInfo(id, username, profile_image);
        navigate('/crew');
        window.location.reload();
      }
    } catch (error) {
      setShowWarning(true);
      console.error('로그인 실패:', error);
      if (error.response) {
        console.error('응답 데이터:', error.response.data);
        console.error('응답 상태:', error.response.status);
        console.error('응답 헤더:', error.response.headers);
      } else if (error.request) {
        console.error('요청 데이터:', error.request);
      } else {
        console.error('오류 메시지:', error.message);
      }
    }
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="w-full">
      <div className="cardGrid2 items-center mb-12">
        <div className="col-span-1 relative pl-12 pt-12 flex flex-col flex-wrap bg-color-blue-main rounded-lg justify-between min-w-[32rem]">
          <div className="w-fit flex flex-col gap-6">
            <p className="text-gray-50 text-2xl font-extrabold">
              알고리즘 문제 해결 도우미<br />
              TLE와 함께 최적의 해결책을 찾아가요!
            </p>
            <button className="w-full p-4 rounded-lg justify-center items-center inline-flex bg-color-blue-w75 text-center text-white text-lg font-semibold hover:bg-color-blue-hover"
            onClick={handleSignup}>
              회원가입
            </button>
          </div>
          <div className="relative mt-12 left-44 max-w-72">
            <img src="../assets/signin/boat.svg" alt="boat" />
          </div>
        </div>
        <div className="col-span-1 box h-full flex flex-col gap-6 min-w-[32rem]">
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="flex flex-col gap-6">
          <p className="font-cafe24 text-gray-900 text-lg font-bold">
            로그인
          </p>
          <Input
            title="아이디"
            placeholder="이메일 입력"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            title="비밀번호"
            placeholder="8~24자 이내, 영문 대소문자, 숫자, 특수기호 조합"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex flex-col gap-6 mt-16">
            <button
              type="submit"
              className="w-full p-4 rounded-lg justify-center items-center inline-flex bg-color-blue-main text-center text-white text-lg font-semibold hover:bg-color-blue-hover"
            >
              로그인
            </button>
            {showWarning && (
              <div className="inline-flex justify-start items-center gap-2">
                <FaCircleExclamation color="#e84057"/>
                <p className="text-color-red-main text-base">
                  아이디 또는 비밀번호를 다시 확인해주세요.
                </p>
              </div>
            )}
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}