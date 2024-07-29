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
        <div className="w-1/2 pl-12 pt-12 flex flex-col flex-wrap bg-color-blue-main rounded-lg justify-between">
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
            {/* 추후 컴포넌트로 교체 예정 */}
            <svg width="325" height="325" viewBox="0 0 325 343" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M202.94 5.21004C212.042 7.69769 229.311 12.4009 241.318 15.6613C274.298 24.6184 286.737 28.1741 286.737 28.6445C286.737 28.8793 272.556 32.8351 255.225 37.4357C237.893 42.0362 215.791 47.9889 206.109 50.6636C184.118 56.7393 182.861 56.9165 179.826 54.3662L177.538 52.4439L177.74 28.2086L177.942 3.97394L179.918 2.2773C181.165 1.20644 182.723 0.601052 184.143 0.634098C185.38 0.66363 193.839 2.72238 202.94 5.21004ZM155.044 109.286L155.056 209.905L153.448 212.294C151.971 214.487 151.467 214.72 147.286 215.128C144.782 215.373 124.582 215.61 102.397 215.655C58.4817 215.745 58.9845 215.787 55.8171 211.78C52.4857 207.566 53.775 204.325 75.5009 162.3C80.1991 153.212 89.6013 134.861 96.3951 121.519C103.188 108.177 110.57 93.7806 112.797 89.5267C115.025 85.2728 119.151 77.3626 121.964 71.9486C124.778 66.5345 128.427 59.5736 130.072 56.4798C137.206 43.0642 150.832 16.6309 150.843 16.1851C150.85 15.9179 151.795 14.1165 152.944 12.1829L155.032 8.6673L155.044 109.286ZM190.222 76.3431C196.036 79.4326 231.86 104.285 249.768 117.651C278.809 139.328 292.474 151.839 304.293 167.574C315.18 182.066 324.058 200.031 324.058 207.569C324.058 210.729 321.281 214.059 317.852 215.01C314.516 215.935 187.576 215.977 183.575 215.054C182.011 214.694 180.05 213.584 179.164 212.559L177.569 210.713L177.755 143.905L177.942 77.0975L179.605 75.7532C181.981 73.8315 185.906 74.0495 190.222 76.3431ZM318.073 233.98C322.893 235.95 323.734 242.342 320.033 248.89C316.081 255.883 306.575 268.023 290.659 286.402C285.971 291.816 280.255 298.618 277.957 301.519C275.659 304.419 272.754 308.085 271.502 309.666C270.251 311.247 266.671 316.388 263.547 321.092C260.423 325.796 257.729 329.644 257.561 329.644C257.393 329.644 254.972 327.929 252.182 325.834C246.338 321.444 234.455 315.136 227.105 312.522C219.942 309.975 211.228 308.584 199.419 308.103C186.629 307.581 174.068 308.89 144.494 313.824C124.83 317.106 114.063 317.99 93.4411 318.016C76.7529 318.037 71.6075 317.805 65.2925 316.744C51.8709 314.489 31.5393 307.184 29.0951 303.739C27.5185 301.517 10.369 252.11 8.62616 244.769C7.49734 240.012 8.52759 236.573 11.6534 234.67C13.8209 233.351 17.2037 233.322 165.267 233.363C248.535 233.386 317.298 233.664 318.073 233.98ZM77.9493 274.483C81.4504 276.274 81.8222 277.29 81.8222 285.052C81.8222 295.016 81.4279 295.459 72.2891 295.789C61.8322 296.166 60.697 295.049 60.697 284.382C60.697 278.451 60.847 277.717 62.3448 276.312C65.4889 273.363 73.8446 272.384 77.9493 274.483ZM18.7656 313.885C24.9722 317.727 35.8383 323.203 42.7406 325.966C48.4127 328.237 53.5208 329.514 62.8518 330.998C90.1766 335.341 113.485 334.389 166.323 326.772C192.274 323.03 207.007 324.775 224.065 333.612C230.716 337.058 236.929 340.782 238.262 342.124C238.96 342.827 217.888 343.003 132.923 343.003H26.7108L19.7866 338.067C6.4024 328.525 0.842226 322.808 0.842226 318.585C0.842226 313.388 4.20676 309.949 9.27328 309.968C11.9027 309.979 13.5645 310.664 18.7656 313.885Z" fill="#D4E0F9"/>
            </svg>
          </div>
        </div>
        <div className="w-1/2 box flex flex-col gap-6">
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