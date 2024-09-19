//코드를 선택해서 리뷰를 달 수 있도록 하는 컴포넌트
import React, { useState, useEffect } from 'react';

const SelectCode = ({ onSelectionChange, highlightedStart, highlightedEnd }) => {
  const [code, setCode] = useState('');
  const [lineNumbers, setLineNumbers] = useState(1);
  const [selectedStart, setSelectedStart] = useState(null);
  const [selectedEnd, setSelectedEnd] = useState(null);

  useEffect(() => {
    const fetchCodeData = async () => {
      try {
        const response = await fetch('http://localhost:3000/data/codeData.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCode(data.code);

        const newLineCount = (data.code.match(/\n/g) || []).length + 1;
        setLineNumbers(newLineCount);
      } catch (error) {
        console.error('Failed to fetch code data:', error);
        setCode('Error loading code');
      }
    };

    fetchCodeData();
  }, []);

  const handleLineNumberClick = (lineNumber) => {
    if (selectedStart === lineNumber && selectedEnd === lineNumber) {
      setSelectedStart(null);
      setSelectedEnd(null);
      onSelectionChange(null, null);
    } else if (selectedStart === null || selectedEnd !== null) {
      setSelectedStart(lineNumber);
      setSelectedEnd(null);
      onSelectionChange(lineNumber, lineNumber);
    } else {
      setSelectedEnd(lineNumber);
      onSelectionChange(selectedStart, lineNumber);
    }
  };

  const getLineNumberStyle = (index) => {
    let style = {};
    if (
      highlightedStart !== null &&
      highlightedEnd !== null &&
      index >= highlightedStart &&
      index <= highlightedEnd
    ) {
      style = { backgroundColor: 'rgba(66, 153, 225, 0.25)', color: 'black' };
    }
    if (selectedStart !== null && selectedEnd !== null && index >= selectedStart && index <= selectedEnd) {
      style = { ...style, backgroundColor: 'rgba(200, 200, 200, 0.5)' };
    }
    if (selectedStart !== null && selectedEnd === null && index === selectedStart) {
      style = { ...style, backgroundColor: 'rgba(200, 200, 200, 0.5)' };
    }
    return style;
  };

  return (
    <div className="border border-gray-300 rounded-lg p-6 mt-4 bg-white">
      <pre>
        {Array.from({ length: lineNumbers }, (_, i) => (
          <div
            key={i}
            className="flex cursor-pointer"
            onClick={() => handleLineNumberClick(i + 1)}
            style={getLineNumberStyle(i + 1)}
          >
            <span className="mr-4">{i + 1}</span>
            <span>{code.split('\n')[i]}</span>
          </div>
        ))}
      </pre>
    </div>
  );
};

export default SelectCode;
