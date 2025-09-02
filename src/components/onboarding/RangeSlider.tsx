import React, { useRef, useLayoutEffect, useState } from "react";

interface RangeSliderProps {
  minValue: number;
  maxValue: number;
  onMinChange: (_value: number) => void;
  onMaxChange: (_value: number) => void;
  getYearText: (_year: number) => string;
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

  return (
    <div className="relative w-[440px]" style={{ padding: "0 10px" }}>
      {/* 배경 트랙 */}
      <div
        className="bg-border-tertiary relative h-2 rounded-full"
        style={{
          position: "absolute",
          left: "10px",
          right: "10px",
          width: "calc(100% - 20px)",
        }}
      >
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
        onChange={(e) => onMinChange(Number(e.target.value))}
        onClick={preventClick}
        className="slider-min absolute top-0 h-2 w-full cursor-pointer appearance-none bg-transparent"
        style={{
          pointerEvents: "none",
          left: 0,
          right: 0,
          width: "100%",
        }}
      />
      {/* 최소값 텍스트 */}
      <div
        ref={minTextRef}
        className="text-16-500 text-text-tertiary absolute text-center"
        style={{
          top: "24px",
          left: `calc(${10 + (minValue / 10) * (440 - 20)}px - ${minTextWidth / 2}px)`,
          pointerEvents: "none",
          whiteSpace: "pre",
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
        onChange={(e) => onMaxChange(Number(e.target.value))}
        onClick={preventClick}
        className="slider-max absolute top-0 h-2 w-full cursor-pointer appearance-none bg-transparent"
        style={{
          pointerEvents: "none",
          left: 0,
          right: 0,
          width: "100%",
        }}
      />
      {/* 최대값 텍스트 */}
      <div
        ref={maxTextRef}
        className="text-16-500 text-text-tertiary absolute text-center"
        style={{
          top: "24px",
          left: `calc(${10 + (maxValue / 10) * (440 - 20)}px - ${maxTextWidth / 2}px)`,
          pointerEvents: "none",
          whiteSpace: "pre",
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
