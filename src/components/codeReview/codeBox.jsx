//코드 입력하는 박스

import React, { useState } from 'react';

const CodeBox = () => {
  const [code, setCode] = useState('');
  const [lineNumbers, setLineNumbers] = useState(1);

  const handleCodeChange = (e) => {
    setCode(e.target.value);
    const newLineCount = (e.target.value.match(/\n/g) || []).length + 1;
    setLineNumbers(newLineCount);
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="w-full h-full">
        <div className="bg-white p-10 rounded">
          <div className="flex flex-row">
            <div className="flex-none w-10 bg-white text-gray-600 ">

              <div className="bg-white">
                {Array.from({ length: lineNumbers }).map((_, index) => (
                  <div key={index} className="h-6 flex items-center justify-center" style={{ lineHeight: '1.5rem' }}>
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>
            <textarea
              className="flex-grow px-3 resize-none bg-white outline-none"
              value={code}
              onChange={handleCodeChange}
              style={{ lineHeight: '1.5rem', overflow: 'hidden', height: `${lineNumbers * 1.5}rem` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeBox;