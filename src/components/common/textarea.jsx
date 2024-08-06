import React from 'react';

export default function Textarea({ title, placeholder, width, height, value, onChange}) {
  const textareaClassName = `px-5 py-3 bg-white rounded border border-gray-200 text-gray-800 text-base font-medium outline-none`;

  return (
    <div className={`w-full flex flex-col justify-start items-start gap-2`}>
      {title && <div className="containerTitle">{title}</div>}
      <textarea
        className={`${textareaClassName} resize-none`}
        placeholder={placeholder}
        rows="1"
        style={{ 
          overflowWrap: 'break-word', 
          whiteSpace: 'pre-wrap',
          height: height ? (isNaN(height) ? height : `${height}rem`) : 'auto', 
          width: width ? (isNaN(width) ? width : `${width}rem`) : '100%' 
        }}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

/*
usage
  <Textarea 
    placeholder="크루 선장에게 보낼 메시지를 입력하세요."
    width="16" //width는 rem 단위로 지정, props로 안주면 100%
    height="28" //height는 rem 단위로 지정, props로 안주면 auto
  />
 */

  
