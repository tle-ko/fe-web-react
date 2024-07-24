import React from 'react';

export default function Input({ title, placeholder, width, height, error, accuracy, value, onChange }) {
  const inputClassName = `px-5 py-3 bg-white rounded border border-gray-200 text-gray-800 text-base font-medium outline-none`;

  return (
    <div className={`flex flex-col justify-start items-start gap-2`}>
      {title && <div className="containerTitle">{title}</div>}
      <textarea
        className={`${inputClassName} resize-none`}
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

  // 예시 문제 등록하기 모달
  // 시간, 메모리 제한의 입력창에 숫자만 입력되게 조건 설정
  // const handleInputChange = (e, setState) => {
  //   const value = e.target.value;
  //   if (/^\d*$/.test(value)) {
  //     setState(value);
  //   } else {
  //     e.target.value = ''; // 숫자가 아니면 입력 필드의 값을 빈 문자열로 설정
  //   }
  //   };
  
  //   const [content, setContent] = useState(
  //     <div className="w-full flex flex-col gap-10 mt-10">
  //       <Input title="문제 제목" placeholder="제목을 작성해 주세요"/>
  
  //       <div className="w-full flex flex-wrap items-start gap-6">
  //       <Input title="시간 제한" placeholder="초" width="8.875" 
  //       onChange={(e) => handleInputChange(e, setTimeLimit)} />
  //       <Input title="메모리 제한" placeholder="MB" width="8.875" 
  //       onChange={(e) => handleInputChange(e, setMemoryLimit)} />
  //       <Input title="문제 URL" placeholder="백준 URL을 작성해 주세요" width="21" />
  //       </div>
  
  //       <Input title="문제" placeholder="문제를 작성해 주세요" height="12"/>
  //       <Input title="입력" placeholder="입력 조건을 작성해 주세요" height="12"/>
  //       <Input title="출력" placeholder="출력 조건을 작성해 주세요" height="12"/>
  //     </div> 
  //   );
  
