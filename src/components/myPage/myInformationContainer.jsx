import React, { useState, useEffect, useRef, useCallback } from 'react';
import Input from '../common/input';
import PasswordInput from '../signup/passwordInput';
import Button from '../common/button';
import { client } from '../../utils';
import { setUserInfo } from '../../auth';
import { FaCircleCheck, FaCircleExclamation } from 'react-icons/fa6';
import DataLoadingSpinner from '../common/dataLoadingSpinner';

export default function MyInformationContainer() {
  const [Image, setImage] = useState('');
  const [userInfo, setMypageUserInfo] = useState({
    email: '',
    username: '',
    boj_username: '',
    boj_level: '',
    profile_image: '',
  });
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [initialUsername, setInitialUsername] = useState('');
  const [usernameVerified, setUsernameVerified] = useState(false);
  const [bojUsernameValid, setBojUsernameValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [inputChanged, setInputChanged] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInput = useRef(null);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    client
      .get('api/v1/user/manage')
      .then((response) => {
        const data = response.data;
        setMypageUserInfo({
          email: data.email,
          profile_image: data.profile_image,
          username: data.username,
          boj_username: data.boj?.username || '백준 아이디 확인 불가',
          boj_level: data.boj?.level?.name || '티어 확인 불가',
        });
        setImage(`${process.env.REACT_APP_API_BASE_URL}/media/${data.profile_image}`);
        setInitialUsername(data.username);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user info:', error);
        setLoading(false); // 에러 발생 시에도 로딩 상태 업데이트
      });
  }, []);

  const handleInputChange = (field, value) => {
    setMypageUserInfo((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    setInputChanged(true);

    if (field === 'username') {
      setUsernameVerified(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      handleInputChange('profile_image', file);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    const { username, boj_username, profile_image } = userInfo;
    const updateData = new FormData();
    updateData.append('username', username);
    updateData.append('boj_username', boj_username);

    if (profile_image instanceof File) {
      updateData.append('profile_image', profile_image);
    }

    client
      .patch('api/v1/user/manage', updateData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setIsEditing(false);
        alert('정보가 성공적으로 수정되었습니다.');

        if (profile_image instanceof File) {
          const reader = new FileReader();
          reader.onloadend = function () {
            setUserInfo(response.data.id, username, reader.result);
          };
          reader.readAsDataURL(profile_image);
        } else {
          setUserInfo(response.data.id, username, response.data.profile_image);
        }

        window.location.reload();
      })
      .catch((error) => console.error('Error updating user info:', error));
  };

  const handleProfileClick = () => {
    if (isEditing) {
      fileInput.current.click();
    }
  };

  const handlePasswordChange = () => {
    if (!validatePassword(password)) {
      alert('비밀번호 형식이 올바르지 않습니다.');
      return;
    }

    client
      .patch('api/v1/user/manage', { password })
      .then((response) => {
        alert('비밀번호가 성공적으로 변경되었습니다.');
        setPassword('');
      })
      .catch((error) => console.error('Error changing password:', error));
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,24}$/;
    return regex.test(password);
  };

  const validateBojUsername = (boj_username) => {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(boj_username);
  };

  const checkUsernameAvailability = useCallback(
    async (username) => {
      if (!username) return;

      if (username === initialUsername) {
        setUsernameVerified(true);
        return;
      }

      try {
        const response = await client.get('api/v1/auth/usability', { params: { username } });

        if (response.status === 200) {
          setUsernameVerified(response.data.username.is_usable);
        } else {
          setUsernameVerified(false);
        }
      } catch (error) {
        console.error('Error checking username availability:', error);
        setUsernameVerified(false);
      }
    },
    [initialUsername]
  );

  const renderUsernameFeedback = () => {
    if (!isEditing || !inputChanged || !userInfo.username) return null;

    if (userInfo.username === initialUsername) {
      return (
        <div className="mt-2 flex items-center gap-2">
          <FaCircleCheck size={16} color="#5383E8" />
          <p className="text-color-blue-main">기존 닉네임입니다.</p>
        </div>
      );
    }

    return renderFeedback(
      usernameVerified,
      '사용 가능한 닉네임입니다.',
      '사용 불가능한 닉네임입니다. 다시 입력해주세요.'
    );
  };

  useEffect(() => {
    if (userInfo.username) {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      debounceTimeout.current = setTimeout(() => {
        checkUsernameAvailability(userInfo.username);
      }, 300);
    } else {
      setUsernameVerified(false);
    }
  }, [userInfo.username, checkUsernameAvailability]);

  useEffect(() => {
    setBojUsernameValid(validateBojUsername(userInfo.boj_username));
  }, [userInfo.boj_username]);

  useEffect(() => {
    setPasswordValid(validatePassword(password));
  }, [password]);

  const renderFeedback = (isValid, validMessage, invalidMessage) => (
    <div className="mt-2 flex items-center gap-2">
      {isValid ? (
        <>
          <FaCircleCheck size={16} color="#5383E8" />
          <p className="whitespace-pre-wrap text-color-blue-main">{validMessage}</p>
        </>
      ) : (
        <>
          <FaCircleExclamation size={16} color="#E84057" />
          <p className="whitespace-pre-wrap text-color-red-main">{invalidMessage}</p>
        </>
      )}
    </div>
  );

  return (
    <div className="col-span-3 flex flex-col gap-6">
      {loading ? (
        <div className="flex h-full w-full items-center justify-center">
          <DataLoadingSpinner />
        </div>
      ) : (
        <>
          <div className="box min-w-fit">
            <div className="flex w-full flex-col items-start justify-start gap-6">
              <p className="boxTitle">내 정보 설정</p>
              <div className="flex w-full flex-col items-end gap-6">
                <div className="flex w-full flex-col items-start justify-start gap-6">
                  <div className="flex flex-col gap-3">
                    <p className="containerTitle w-fit">프로필 사진</p>
                    <img
                      src={Image}
                      alt="profile"
                      className="h-32 w-32 cursor-pointer rounded-full object-cover"
                      onClick={handleProfileClick}
                    />
                    <input
                      type="file"
                      className="hidden"
                      accept="image/jpg,image/png,image/jpeg"
                      onChange={handleImageUpload}
                      ref={fileInput}
                      disabled={!isEditing}
                    />
                  </div>

                  <Input
                    title="이메일"
                    value={userInfo.email || ''}
                    className="disabled cursor-not-allowed"
                    width={20}
                    readOnly
                  />

                  <div className="flex flex-col">
                    <Input
                      title="닉네임"
                      value={userInfo.username || ''}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      width={20}
                      placeholder={'2글자 이상 8글자 이내 입력'}
                      readOnly={!isEditing}
                    />
                    {renderUsernameFeedback()}
                  </div>

                  <div className="flex flex-col">
                    <Input
                      title="백준 아이디"
                      value={userInfo.boj_username || ''}
                      onChange={(e) => handleInputChange('boj_username', e.target.value)}
                      placeholder="Baekjoon Online Judge 아이디 입력"
                      width={20}
                      readOnly={!isEditing}
                    />
                    {isEditing &&
                      inputChanged &&
                      userInfo.boj_username &&
                      renderFeedback(
                        bojUsernameValid,
                        '올바른 형식의 아이디입니다.',
                        '영문자와 숫자만 사용 가능합니다. 다시 입력해주세요.'
                      )}
                  </div>
                  <div className="inline-flex flex-col gap-2">
                    <Input
                      title="백준 티어"
                      className="disabled cursor-not-allowed"
                      value={userInfo.boj_level}
                      width={20}
                      readOnly
                    />
                    <p className="text-base text-gray-600">
                      ! 티어는 등록된 아이디에 따라 자동으로 산출됩니다.
                    </p>
                  </div>
                </div>
                <Button
                  buttonSize={'detailBtn'}
                  colorStyle={isEditing ? 'blueWhite' : 'whiteBlack'}
                  content={isEditing ? '저장' : '수정'}
                  onClick={isEditing ? handleSave : handleEdit}
                />
              </div>
            </div>
          </div>

          <div className="box min-w-fit">
            <div className="flex w-full flex-col items-start justify-start gap-6">
              <p className="boxTitle">비밀번호 변경</p>
              <div className="flex w-full flex-col items-end gap-6">
                <div className="w-full">
                  <PasswordInput
                    title="비밀번호"
                    placeholder="8~24자 이내, 영문 대소문자, 숫자, 특수기호 조합"
                    type="password"
                    value={password}
                    width={20}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setInputChanged(true);
                    }}
                  />
                  {password &&
                    inputChanged &&
                    renderFeedback(
                      passwordValid,
                      '사용 가능한 비밀번호입니다.',
                      '8~24자 이내, 영문 대소문자, 숫자, 특수기호를 모두 포함해야 합니다.'
                    )}
                </div>
                <Button
                  buttonSize={'detailBtn'}
                  colorStyle={'blueWhite'}
                  content={'변경'}
                  onClick={handlePasswordChange}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
