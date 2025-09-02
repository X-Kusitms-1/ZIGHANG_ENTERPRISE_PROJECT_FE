import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import OnBoardingTitle from "./OnBoardingTitle";
import CareerStep from "./CareerStep";
import JobFieldStep from "./JobFieldStep";
import LocationStep from "./LocationStep";
import CareerYear from "./CareerYear";

export default function OnBoardingModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  // career: -2(선택안함) -1(경력 선택 시) 0(신입) 또는 n(경력 n년)
  const [career, setCareer] = useState<number>(-2);
  // 경력 연수 범위 상태 추가
  const [careerYear, setCareerYear] = useState<{ min: number; max: number }>({
    min: -1,
    max: -1,
  });

  // 모달이 닫힐 때 상태 초기화
  useEffect(() => {
    if (!open) {
      setCurrentStep(0);
      setCareer(-2);
    }
  }, [open]);

  const steps = [
    {
      title: `${name}님, 경력이신가요?`,
      subtitle: "당신의 경력을 알려주세요",
      content: (
        <CareerStep
          value={career}
          onSelect={setCareer}
          setCurrentStep={setCurrentStep}
        />
      ),
    },
    {
      title: "얼마나 일하셨나요?",
      subtitle:
        "정확하지 않아도 괜찮아요! 마이페이지에서 언제든지 수정할 수 있어요.",
      content: (
        <CareerYear
          value={careerYear}
          onSelect={setCareerYear}
          setCurrentStep={setCurrentStep}
        />
      ),
    },
    {
      title: "희망 직군/직무를 선택해주세요!",
      subtitle:
        "복수 선택할 수 있어요. 선택 내용은 마이페이지에서 언제든지 수정 가능해요.",
      content: <JobFieldStep />,
    },
    {
      title: "희망 근무 지역을 선택해주세요!",
      subtitle:
        "복수 선택할 수 있어요. 선택 내용은 마이페이지에서 언제든지 수정 가능해요.",
      content: <LocationStep />,
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onOpenChange(false);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex !h-[640px] !w-[680px] w-full !max-w-[680px] flex-col items-center gap-0 rounded-lg bg-white px-0 pt-6 pb-[44px] [&>button]:hidden">
        <DialogTitle className="w-full">
          <OnBoardingTitle
            title={steps[currentStep].title}
            subtitle={steps[currentStep].subtitle}
            currentStep={currentStep}
            totalSteps={steps.length}
          />
        </DialogTitle>

        <div className="flex w-full flex-1 flex-col justify-center">
          {steps[currentStep].content}
        </div>
      </DialogContent>
    </Dialog>
  );
}
