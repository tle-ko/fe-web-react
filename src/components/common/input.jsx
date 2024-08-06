import React from 'react';

export default function Input({ title, placeholder, width, error, accuracy, value, onChange, type }) {
  const inputClassName = `px-5 py-3 bg-white rounded border border-gray-200 text-gray-800 text-base font-medium outline-none`;

  return (
    <div className={`w-full flex flex-col justify-start items-start gap-2`}>
      {title && <div className="containerTitle">{title}</div>}
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
        type={type}
      />
      {error && <div className="text-rose-500 text-sm font-semibold">{error}</div>}
      {accuracy && <div className="text-teal-500 text-sm font-semibold">{accuracy}</div>}
    </div>
  )
}
/*
usage
  <Input 
    placeholder="크루 선장에게 보낼 메시지를 입력하세요."
    width="16" //width는 rem 단위로 지정, props로 안주면 100%
    height="28" //height는 rem 단위로 지정, props로 안주면 auto
  />
 */

  
