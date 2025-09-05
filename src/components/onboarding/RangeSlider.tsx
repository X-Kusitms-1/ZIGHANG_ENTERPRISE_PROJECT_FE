import React, { useRef, useLayoutEffect, useState } from "react";

interface RangeSliderProps {
  minValue: number;
  maxValue: number;
  onMinChange: React.Dispatch<React.SetStateAction<number>>;
  onMaxChange: React.Dispatch<React.SetStateAction<number>>;
  getYearText: (_value: number) => string;
  preventClick: (_e: React.MouseEvent) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  getYearText,
  preventClick,
}) => {
  const minTextRef = useRef<HTMLDivElement>(null);
  const maxTextRef = useRef<HTMLDivElement>(null);
  const [minTextWidth, setMinTextWidth] = useState(0);
  const [maxTextWidth, setMaxTextWidth] = useState(0);

  useLayoutEffect(() => {
    if (minTextRef.current) {
      setMinTextWidth(minTextRef.current.offsetWidth);
    }
    if (maxTextRef.current) {
      setMaxTextWidth(maxTextRef.current.offsetWidth);
    }
  }, [minValue, maxValue, getYearText]);

  const handleMinChange = (newMin: number) => {
    // 최소값은 최대값-1을 넘을 수 없음
    const maxAllowed = maxValue - 1;
    if (newMin <= maxAllowed) {
      onMinChange(newMin);
    }
  };

  const handleMaxChange = (newMax: number) => {
    // 최대값은 최소값+1보다 작을 수 없음
    const minAllowed = minValue + 1;
    if (newMax >= minAllowed) {
      onMaxChange(newMax);
    }
  };

  return (
    <div className="relative w-[440px] px-[10px]">
      {/* 배경 트랙 */}
      <div className="bg-border-tertiary absolute right-[10px] left-[10px] h-2 w-[calc(100%-20px)] rounded-full">
        {/* 선택된 범위 표시 */}
        <div
          className="bg-border-primary absolute h-2 rounded-full"
          style={{
            left: `calc(${(minValue / 10) * 100}% )`,
            width: `calc(${((maxValue - minValue) / 10) * 100}% )`,
          }}
        />
      </div>

      {/* 최소값 슬라이더 */}
      <input
        type="range"
        min="0"
        max="10"
        value={minValue}
        onChange={(e) => handleMinChange(Number(e.target.value))}
        onClick={preventClick}
        className="slider-min pointer-events-none absolute top-0 right-0 left-0 h-2 w-full cursor-pointer appearance-none bg-transparent"
      />
      {/* 최소값 텍스트 */}
      <div
        ref={minTextRef}
        className="text-16-500 text-text-tertiary pointer-events-none absolute top-6 text-center whitespace-pre"
        style={{
          left: `calc(${10 + (minValue / 10) * (440 - 20)}px - ${minTextWidth / 2}px)`,
        }}
      >
        {getYearText(minValue)}
      </div>

      {/* 최대값 슬라이더 */}
      <input
        type="range"
        min="0"
        max="10"
        value={maxValue}
        onChange={(e) => handleMaxChange(Number(e.target.value))}
        onClick={preventClick}
        className="slider-max pointer-events-none absolute top-0 right-0 left-0 h-2 w-full cursor-pointer appearance-none bg-transparent"
      />
      {/* 최대값 텍스트 */}
      <div
        ref={maxTextRef}
        className="text-16-500 text-text-tertiary pointer-events-none absolute top-6 text-center whitespace-pre"
        style={{
          left: `calc(${10 + (maxValue / 10) * (440 - 20)}px - ${maxTextWidth / 2}px)`,
        }}
      >
        {getYearText(maxValue)}
      </div>

      <style jsx>{`
        .slider-min::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 100%;
          background: #fcfdff;
          cursor: pointer;
          border: 1px solid #e0e5f0;
          pointer-events: auto;
        }
        .slider-max::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 100%;
          background: #fcfdff;
          cursor: pointer;
          border: 1px solid #e0e5f0;
          pointer-events: auto;
        }
        .slider-min::-moz-range-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 100%;
          background: #fcfdff;
          cursor: pointer;
          border: 1px solid #e0e5f0;
          pointer-events: auto;
        }
        .slider-max::-moz-range-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 100%;
          background: #fcfdff;
          cursor: pointer;
          border: 1px solid #e0e5f0;
          pointer-events: auto;
        }
        .slider-min::-webkit-slider-runnable-track,
        .slider-max::-webkit-slider-runnable-track {
          pointer-events: none;
        }
        .slider-min::-moz-range-track,
        .slider-max::-moz-range-track {
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default RangeSlider;
