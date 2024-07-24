import React, { useState } from "react";

const TagInput = ({ tags, onAddTag, onRemoveTag }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      onAddTag(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-start gap-3 text-base font-medium">
      <div className="w-full h-28 bg-gray-50 rounded border border-gray-200 p-5 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div key={index} className="h-9 px-3 py-2.5 tag border flex justify-center items-center gap-3 tag">
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
          className="bg-transparent border-none outline-none flex-grow resize-none leading-5"
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
