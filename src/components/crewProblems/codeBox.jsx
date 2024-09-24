import React, { useState } from 'react';

export default function CodeBox() {
  const [code, setCode] = useState('');
  const lines = code.split('\n');

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  return (
    <div className="grid grid-cols-1 gap-6 justify-between">
      <pre className="col-span-1 h-full box font-mono text-sm relative">
        <textarea
          className="absolute inset-0 w-full h-full resize-none opacity-0 select-text"
          value={code}
          onChange={handleCodeChange}
          placeholder="여기에 코드를 입력하세요..."
        />
        {lines.map((line, i) => (
          <div key={i} className="w-full px-1 text-gray-900">
            <span className="w-10 text-right pr-4 select-none">{i + 1}</span>
            <span className="flex-grow whitespace-normal leading-relaxed">{line}</span>
          </div>
        ))}
      </pre>
    </div>
  );
}