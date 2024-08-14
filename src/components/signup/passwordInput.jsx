import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa6";

export default function PasswordInput({ title, placeholder, width, value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const inputClassName = `px-5 py-3 bg-white rounded border border-gray-200 text-gray-800 text-base font-medium outline-none`;

  return (
    <div className={`w-full flex flex-col justify-start items-start gap-2`}>
      {title && <div className="containerTitle">{title}</div>}
      <div className="relative w-full">
        <input
          className={`${inputClassName}`}
          placeholder={placeholder}
          style={{ 
            overflowWrap: 'break-word', 
            whiteSpace: 'pre-wrap',
            width: width ? (isNaN(width) ? width : `${width}rem`) : '100%' 
          }}
          value={value}
          onChange={onChange}
          type={showPassword ? 'text' : 'password'}
        />
        <div 
          className="absolute inset-y-0 right-0 pr-5 flex items-center cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FaEyeSlash color='#4B5563' /> : <FaEye color='#4B5563' />}
        </div>
      </div>
    </div>
  );
}