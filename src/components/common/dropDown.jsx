import React, { useState } from 'react';

function Dropdown({ options, defaultValue, onChange }) {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <select value={selectedValue} onChange={handleChange}>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Dropdown;


/**
 * usage
 * 
 * <Dropdown
      options={['브론즈 이상', '실버 이상', '골드 이상', '플레티넘 이상', '다이아 이상', '루비 이상', '마스터 이상']}
      placeholder="선택하세요"
    />
 */