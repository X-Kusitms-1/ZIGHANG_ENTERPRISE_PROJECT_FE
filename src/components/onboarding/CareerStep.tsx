import Image from "next/image";
import { ReactNode } from "react";
import { Button } from "../ui/Button";
type OnboardingBoxProps = {
  children?: ReactNode;
  selected?: boolean;
  onClick?: () => void;
};
type CareerStepProps = {
  value: number; // -1: 초기값, 0: 신입, 1~n: 경력
  onSelect:  React.Dispatch<React.SetStateAction<number>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};
function OnboardingBox({
  children,
  selected = false,
  onClick,
}: OnboardingBoxProps) {
  return (
    <div
      className={
        (selected ? "bg-bg-info " : "bg-bg-tertiary ") +
        "flex pc:h-[195px] pc:w-[240px] mobile:flex-1 mobile:h-[160px] cursor-pointer flex-col items-center justify-center gap-5 rounded-[12px] transition-colors duration-100 ease-in-out"
      }
      onClick={onClick}
    >
      {children}
    </div>
  );
}
export default function CareerStep({
  value,
  onSelect,
  setCurrentStep,
}: CareerStepProps) {
  // value: -2(선택안함), 0(신입), 1~n(경력)
  const handleNext = () => {
    if (value === -2) {
      alert("경력 또는 신입을 선택해 주세요.");
      return;
    }
    if (value === 0) {
      setCurrentStep((prev: number) => prev + 2);
    } else if (value === -1) {
      setCurrentStep((prev: number) => prev + 1);
    }
  };
  return (
    <div className="flex h-full flex-col items-center justify-between mobile:flex-1">
      <div className="flex w-full pc:flex-1 items-center justify-center gap-6">
        <OnboardingBox selected={value === 0} onClick={() => onSelect(0)}>
          <Image
            src={
              value === 0
                ? "/onboarding/active-no-experiance.svg"
                : "/onboarding/unactive-no-experiance.svg"
            }
            alt="신입"
            width={56}
            height={56}
            priority
          />
          <div className="text-28-600 text-text-secondary">신입</div>
        </OnboardingBox>
        <OnboardingBox selected={value === -1} onClick={() => onSelect(-1)}>
          <Image
            src={
              value === -1
                ? "/onboarding/active-experiance.svg"
                : "/onboarding/unactive-experiance.svg"
            }
            alt="경력"
            width={56}
            height={56}
            priority
          />
          <div className="text-28-600 text-text-secondary">경력</div>
        </OnboardingBox>
      </div>
        <Button
          variant="filled"
          size="lg"
          className="pc:w-[353px] mobile:w-full"
          onClick={handleNext}
        >
          다음으로
        </Button>
    </div>
  );
}
