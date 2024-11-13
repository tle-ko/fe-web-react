import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/common/input';
import PasswordInput from '../../components/signup/passwordInput';
import { FaCircleExclamation } from 'react-icons/fa6';
import { client } from '../../utils';
import { setToken, setUserInfo } from '../../auth';
import useForm from '../../hooks/useForm';
import { validateLogin } from '../../hooks/validate';

export default function Signin() {
  const navigate = useNavigate();

  const { values, errors, touched, getTestInputProps } = useForm({
    initialValue: {
      email: '',
      password: '',
    },
    validate: validateLogin,
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        document
          .querySelector('form')
          .dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
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
      const response = await client.post(
        '/api/v1/auth/signin',
        {
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            'Content-Type': process.env.REACT_APP_CONTENT_TYPE,
          },
        }
      );

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
      <div className="cardGrid2 mb-12 items-center">
        <div className="relative col-span-1 flex min-w-[32rem] flex-col flex-wrap justify-between rounded-lg bg-color-blue-main pl-12 pt-12">
          <div className="flex w-fit flex-col gap-6">
            <p className="text-2xl font-extrabold text-gray-50">
              알고리즘 문제 해결 도우미
              <br />
              TLE와 함께 최적의 해결책을 찾아가요!
            </p>
            <button
              className="inline-flex w-full items-center justify-center rounded-lg bg-color-blue-w75 p-4 text-center text-lg font-semibold text-white hover:bg-color-blue-hover"
              onClick={handleSignup}
            >
              회원가입
            </button>
          </div>
          <div className="relative left-44 mt-12 max-w-72">
            <img src="../assets/signin/boat.svg" alt="boat" />
          </div>
        </div>
        <div className="box col-span-1 flex h-full min-w-[32rem] flex-col gap-6">
          <form onSubmit={handleLogin} className="flex flex-col gap-6">
            <p className="font-cafe24 text-lg font-bold text-gray-900">로그인</p>
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
            <div className="mt-16 flex flex-col gap-6">
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-lg bg-color-blue-main p-4 text-center text-lg font-semibold text-white hover:bg-color-blue-hover"
              >
                로그인
              </button>
              {errors.login && touched.email && touched.password && (
                <div className="inline-flex items-center justify-start gap-2">
                  <FaCircleExclamation color="#e84057" />
                  <p className="text-base text-color-red-main">{errors.login}</p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
