import { useState, useEffect } from "react";
import { Button } from "../ui/Button";
import RangeSlider from "./RangeSlider";

type CareerYearProps = {
  value: { min: number; max: number };
  onSelect: React.Dispatch<React.SetStateAction<{ min: number; max: number }>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

export default function CareerYear({
  value,
  onSelect,
  setCurrentStep,
}: CareerYearProps) {
  const [minValue, setMinValue] = useState(value.min >= 0 ? value.min : 0);
  const [maxValue, setMaxValue] = useState(value.max >= 0 ? value.max : 1);
  useEffect(() => {
}, []);
  // minValue, maxValue 변경 시 onSelect 호출
  useEffect(() => {
   
    onSelect({ min: minValue, max: maxValue });
  }, [minValue, maxValue, onSelect]);

  const handleNext = () => {
    if (value.min === -1 || value.max === -1) {
      alert("경력 연수를 선택해 주세요.");
      return;
    }
    setCurrentStep((prev: number) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prev: number) => prev - 1);
  };

  const getYearText = (year: number) => {
    if (year === 0) return "신입";
    if (year >= 10) return "10년+";
    return `${year}년`;
  };

  const getCareerRangeText = (min: number, max: number) => {
    const minText = min === 0 ? "신입" : `${min}년`;
    const maxText = max >= 10 ? "10년 이상" : `${max}년`;
    return `${minText} ~ ${maxText}`;
  };

  // 슬라이더 클릭 방지 함수
  const preventClick = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6">
      <div className="mt-30 flex flex-1 flex-col gap-8">
        <div className="flex flex-col items-center gap-[50px]">
          <div className="text-24-600 text-text-info leading-[32px]">
            {getCareerRangeText(minValue, maxValue)}
          </div>

          <RangeSlider
            minValue={minValue}
            maxValue={maxValue}
            onMinChange={setMinValue}
            onMaxChange={setMaxValue}
            getYearText={getYearText}
            preventClick={preventClick}
          />
        </div>
      </div>
      <div className="flex gap-3">
        <Button
          variant="outlined"
          size="lg"
          className="w-[170.5px]"
          onClick={handlePrevious}
        >
          이전으로
        </Button>
        <Button
          variant="filled"
          size="lg"
          className="w-[170.5px]"
          onClick={handleNext}
        >
          다음으로
        </Button>
      </div>
    </div>
  );
}
