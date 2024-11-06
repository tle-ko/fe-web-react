// input.jsx
import React from 'react';

export default function Input({
  title,
  placeholder,
  width,
  error,
  accuracy,
  value,
  onChange,
  type,
  readOnly,
  onBlur,
}) {
  const inputClassName = `px-5 py-3 bg-white rounded border border-gray-200 text-gray-800 text-base font-medium outline-none`;

  return (
    <div className={`flex w-full flex-col items-start justify-start gap-2`}>
      {title && <div className="containerTitle">{title}</div>}
      <input
        className={`${inputClassName}`}
        placeholder={placeholder}
        style={{
          overflowWrap: 'break-word',
          whiteSpace: 'pre-wrap',
          width: width ? (isNaN(width) ? width : `${width}rem`) : '100%',
        }}
        value={value}
        onChange={readOnly ? undefined : onChange}
        onBlur={onBlur}
        type={type}
        readOnly={readOnly}
      />
      {error && <div className="text-sm font-semibold text-rose-500">{error}</div>}
      {accuracy && <div className="text-sm font-semibold text-teal-500">{accuracy}</div>}
    </div>
  );
}
