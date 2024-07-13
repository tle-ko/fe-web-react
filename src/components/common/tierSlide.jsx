import React, { useState, useEffect, useRef } from 'react';
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";

const tiers = [
  "티어 무관", "브론즈 5", "브론즈 4", "브론즈 3", "브론즈 2", "브론즈 1",
  "실버 5", "실버 4", "실버 3", "실버 2", "실버 1",
  "골드 5", "골드 4", "골드 3", "골드 2", "골드 1",
  "플래티넘 5", "플래티넘 4", "플래티넘 3", "플래티넘 2", "플래티넘 1",
  "다이아몬드 5", "다이아몬드 4", "다이아몬드 3", "다이아몬드 2", "다이아몬드 1",
  "루비 5", "루비 4", "루비 3", "루비 2", "루비 1"
];

const tierColors = {
  "티어 무관": "rgb(45, 45, 45)",
  "브론즈": "rgb(173, 86, 0)",
  "실버": "rgb(73, 101, 128)",
  "골드": "rgb(249, 165, 24)",
  "플래티넘": "rgb(81, 253, 189)",
  "다이아몬드": "rgb(65, 202, 255)",
  "루비": "rgb(255, 48, 113)"
};

const getTierColor = (tier) => {
  const tierKey = tier.split(" ")[0]; // 티어명을 기준으로 색상 결정
  return tierColors[tierKey] || "rgb(45, 45, 45)"; // 기본값: 티어 무관 색상
};

const TierSlide = ({ value, onChange }) => {
  const [currentValue, setCurrentValue] = useState(value || 0);
  const sliderRef = useRef(null);

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setCurrentValue(newValue);
    onChange(newValue);
  };

  const handleIncrement = () => {
    if (currentValue < tiers.length - 1) {
      setCurrentValue(prev => {
        const newValue = prev + 1;
        onChange(newValue);
        return newValue;
      });
    }
  };

  const handleDecrement = () => {
    if (currentValue > 0) {
      setCurrentValue(prev => {
        const newValue = prev - 1;
        onChange(newValue);
        return newValue;
      });
    }
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.setProperty('--slider-fill-color', getTierColor(tiers[currentValue]));
    }
  }, [currentValue]);

  return (
    <div className="flex flex-col gap-3">
      <div className="text-gray-900 text-lg font-semibold"><p>크루 백준 티어 설정</p></div>
      <div className="w-full flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          <button 
            onClick={handleDecrement} 
            className="px-2 py-1 rounded hover:bg-gray-300"
            disabled={currentValue === 0}
          >
            <FiMinus size="1.3rem" />
          </button>
          <div 
            className="text-xl font-bold w-48 text-center" 
            style={{ color: getTierColor(tiers[currentValue]) }}
          >
            {tiers[currentValue]}
          </div>
          <button 
            onClick={handleIncrement} 
            className="px-2 py-1 rounded hover:bg-gray-300"
            disabled={currentValue === tiers.length - 1}
          >
            <FiPlus size="1.3rem" />
          </button>
        </div>
        <input 
          type="range"
          min={0}
          max={tiers.length - 1}
          step={1}
          value={currentValue}
          className="w-full h-1 bg-white outline-none opacity-70 transition-opacity duration-200 hover:opacity-100 custom-slider"
          onChange={handleChange}
          ref={sliderRef}
        />
      </div>
    </div>
  );
};

export default TierSlide;

/**
 * 
 */