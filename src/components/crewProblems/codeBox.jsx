import React, { useState, useEffect } from 'react';

export default function CodeBox({ setCode }) {
  const [codeText, setCodeText] = useState('');
  const lines = codeText.split('\n'); // 줄바꿈을 기준으로 코드 나누기

  // 코드가 바뀔 때마다 부모 컴포넌트에 업데이트
  useEffect(() => {
    setCode(codeText);
  }, [codeText, setCode]);

  const handleCodeChange = (e) => {
    setCodeText(e.target.value);
  };

  return (
    <div className="grid grid-cols-1 justify-between gap-6">
      <pre className="box relative col-span-1 h-full font-mono text-sm">
        <textarea
          className="absolute inset-0 h-full w-full select-text resize-none opacity-0"
          value={codeText}
          onChange={handleCodeChange}
          placeholder="여기에 코드를 입력하세요..."
        />
        {lines.map((line, i) => (
          <div key={`${i}-${line}`} className="w-full px-1 text-gray-900">
            <span className="w-10 select-none pr-4 text-right">{i + 1}</span>
            <span className="flex-grow whitespace-normal leading-relaxed">{line}</span>
          </div>
        ))}
      </pre>
    </div>
  );
}
