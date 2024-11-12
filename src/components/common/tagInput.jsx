import React, { useState } from 'react';

const TagInput = ({ tags, onAddTag, onRemoveTag }) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      onAddTag(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <div className="flex w-full flex-col items-start justify-center gap-3 text-base font-medium">
      <div className="flex h-28 w-full flex-wrap gap-2 rounded border border-gray-200 bg-gray-50 p-5">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="tag tag flex h-9 items-center justify-center gap-3 border px-3 py-2.5"
          >
            <div>{tag}</div>
            <button
              className="ml-2 text-gray-400 hover:text-gray-600"
              onClick={() => onRemoveTag(index)}
            >
              &times;
            </button>
          </div>
        ))}
        <textarea
          className="flex-grow resize-none border-none bg-transparent leading-5 outline-none"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="태그를 입력하고 엔터를 누르세요"
        />
      </div>
    </div>
  );
};

export default TagInput;
