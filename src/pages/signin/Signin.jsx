import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/common/input';
import PasswordInput from '../../components/signup/passwordInput';
import { FaCircleExclamation } from "react-icons/fa6";
import { client } from '../../utils';
import { setToken, setUserInfo } from '../../auth';
import useForm from '../../hooks/useForm';
import { validateLogin } from '../../hooks/validate';

export default function Signin() {
  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    getTestInputProps
  } = useForm({
    initialValue: {
      email: '',
      password: ''
    },
    validate: validateLogin
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        document.querySelector('form').dispatchEvent(
          new Event('submit', { cancelable: true, bubbles: true })
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const validationErrors = validateLogin(values);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    loginUser();
  };

  const loginUser = async () => {
    try {
      const response = await client.post('/api/v1/auth/signin', {
        email: values.email,
        password: values.password
      }, {
        headers: {
          "Content-Type": process.env.REACT_APP_CONTENT_TYPE
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
      console.error('로그인 실패:', error);
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
            <button
              className="w-full p-4 rounded-lg justify-center items-center inline-flex bg-color-blue-w75 text-center text-white text-lg font-semibold hover:bg-color-blue-hover"
              onClick={handleSignup}
            >
              회원가입
            </button>
          </div>
          <div className="relative mt-12 left-44 max-w-72">
            <img src="../assets/signin/boat.svg" alt="boat" />
          </div>
        </div>
        <div className="col-span-1 box h-full flex flex-col gap-6 min-w-[32rem]">
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <p className="font-cafe24 text-gray-900 text-lg font-bold">
              로그인
            </p>
            <Input
              title="아이디"
              placeholder="이메일 입력"
              value={values.email}
              onChange={getTestInputProps('email').onChange}
              onBlur={getTestInputProps('email').onBlur}
            />
            <PasswordInput
              title="비밀번호"
              placeholder="8~24자 이내, 영문 대소문자, 숫자, 특수기호 조합"
              value={values.password}
              onChange={getTestInputProps('password').onChange}
              onBlur={getTestInputProps('password').onBlur}
            />
            <div className="flex flex-col gap-6 mt-16">
              <button
                type="submit"
                className="w-full p-4 rounded-lg justify-center items-center inline-flex bg-color-blue-main text-center text-white text-lg font-semibold hover:bg-color-blue-hover"
              >
                로그인
              </button>
              {errors.login && touched.email && touched.password && (
                <div className="inline-flex justify-start items-center gap-2">
                  <FaCircleExclamation color="#e84057" />
                  <p className="text-color-red-main text-base">
                    {errors.login}
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