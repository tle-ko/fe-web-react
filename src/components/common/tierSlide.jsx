import React, { useState, useEffect, useRef } from 'react';
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import { tiers } from '../../utils';

const tierColors = {
  "티어 무관": "rgb(45, 45, 45)",
  "브론즈": "rgb(173, 86, 0)",
  "실버": "rgb(73, 101, 128)",
  "골드": "rgb(249, 165, 24)",
  "플래티넘": "rgb(80, 243, 183)",
  "다이아몬드": "rgb(76, 204,254)",
  "루비": "rgb(255, 48, 113)"
};

const getTierColor = (tier) => {
  if (!tier) return "rgb(45, 45, 45)";
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
      <div className="text-gray-900 text-lg font-semibold"><p>백준 티어</p></div>
      <div className="w-full flex flex-col items-center gap-6">
        <div className="flex items-center gap-2">
          <button 
            onClick={handleDecrement} 
            className="px-2 py-1 rounded hover:bg-gray-300"
            disabled={currentValue === 0}
          >
            <FiMinus size="1.3rem" />
          </button>
          <div className='text-xl font-bold w-48 flex justify-center items-center gap-2'>
            <p
              style={{ color: getTierColor(tiers[currentValue]) }}
            >
              {tiers[currentValue]}
            </p>
            <p className='text-gray-900'>
              {tiers[currentValue] === '티어 무관' ? '' : '이상'}
            </p>
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
