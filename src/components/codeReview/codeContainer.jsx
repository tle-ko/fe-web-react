import React, { useState } from 'react';

// 제출 된 코드를 표시하는 컴포넌트
export default function CodeContainer({ code, onLineSelect, highlightedLines, setHighlightedLines}) {
  const [selectedLines, setSelectedLines] = useState({ start: null, end: null });

  const handleLineClick = (lineNumber) => {
    if (selectedLines.start === lineNumber && selectedLines.end === null) {
      setSelectedLines({ start: null, end: null });
      onLineSelect(null, null);
    } else if (selectedLines.start === null || (selectedLines.start !== null && selectedLines.end !== null)) {
      setSelectedLines({ start: lineNumber, end: null });
      onLineSelect(lineNumber, null);
    } else {
      const newSelectedLines = {
        start: Math.min(selectedLines.start, lineNumber),
        end: Math.max(selectedLines.start, lineNumber)
      };
      setSelectedLines(newSelectedLines);
      onLineSelect(newSelectedLines.start, newSelectedLines.end);
    }
  };

  const getLineStyle = (index) => {
    const isSelected = (selectedLines.start !== null && selectedLines.end !== null) 
      ? (index >= selectedLines.start && index <= selectedLines.end)
      : (index === selectedLines.start);

    const isHighlighted = highlightedLines && (index >= highlightedLines.start && index <= highlightedLines.end);

    return isSelected ? { backgroundColor: 'rgba(83, 131, 232, 0.125)', color: 'rgba(83, 131, 232, 1)' }
      : isHighlighted ? { backgroundColor: 'rgba(83, 131, 232, 0.125)' }
      : {};
  };

  const lines = code.split('\n');

  return (
    <div className="w-full">
      <div className="box p-5 min-w-30rem">
        <pre className="font-mono text-sm">
          {lines.map((line, i) => (
            <div
              key={i}
              className="flex cursor-pointer p-1 text-gray-900 hover:bg-color-blue-w25 hover:text-color-blue-main"
              onClick={() => handleLineClick(i + 1)}
              style={getLineStyle(i + 1)}
            >
              <span className="w-10 text-right pr-4 select-none">{i + 1}</span>
              <span className="flex-grow whitespace-break-spaces">{line}</span>
            </div>
          ))}
        </pre>
        {selectedLines.start !== null && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <p>선택된 라인: {selectedLines.start} {selectedLines.end ? `~ ${selectedLines.end }` : ''}</p>
          </div>
        )}
      </div>
    </div>
  );
}