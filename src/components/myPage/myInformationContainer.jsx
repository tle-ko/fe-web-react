import React, { useState, useEffect, useRef } from 'react';
import Input from '../common/input';
import PasswordInput from '../signup/passwordInput';
import Button from '../common/button';
import { getToken } from '../../auth';

export default function MyInformationContainer(formData, onInputChange) {
  const [Image, setImage] = useState("https://picsum.photos/250/250");
  const fileInput = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
      if (file) {
        setImage(URL.createObjectURL(file));
        onInputChange('profile_image', file);
      }
    };

  return (
    <div className='w-full flex flex-col gap-6 justify-start items-start'>
      <p className='boxTitle'>내 정보 설정</p>

      <div className='w-full flex flex-col items-end'>
      <div className='w-full flex flex-col gap-6 justify-start items-start'>
        <div className='flex flex-col gap-3'>
        <p className='w-fit containerTitle'>프로필 사진</p>
          <img src={Image} alt="profile" className="w-32 h-32 rounded-full object-cover"/>
            <input 
              type="file"
              className="hidden"
              accept='image/jpg,image/png,image/jpeg'
              onChange={handleImageUpload}
              ref={fileInput}
            />
        </div>

        <Input
        title='이메일'
        value=''
        className='disabled cursor-not-allowed'
        width={20}
        />

        <PasswordInput
        title='비밀번호 변경'
        value=''
        width='20rem'
        />

        <Input
        title='닉네임'
        value=''
        width={20}
        />

        <Input
        title='백준 아이디'
        value=''
        width={20}
        />

      <div className="flex-col inline-flex gap-2">
      <Input
        title='백준 티어'
        className='disabled cursor-not-allowed'
        value=''
        width={20}
        />
        <p className='text-base-14 text-gray-600'>티어는 등록된 아이디에 따라 자동으로 산출됩니다.</p>
      </div>
      </div>
      <Button
        buttonSize={'detailBtn'}
        colorStyle={'whiteBlack'}
        content='수정하기'
        onClick={() => {}}
      />
      </div>
    </div>
  );
}