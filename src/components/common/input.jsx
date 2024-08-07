import React from 'react';

export default function Input({ title, placeholder, width, error, accuracy, value, onChange, type }) {
  const inputClassName = `px-5 py-3 bg-white rounded border border-gray-200 text-gray-800 text-base font-medium outline-none`;

  return (
    <div className={`flex flex-col justify-start items-start gap-2`}>
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
