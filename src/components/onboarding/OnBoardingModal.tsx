import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/Button";
import OnBoardingTitle from "./OnBoardingTitle";
import CareerStep from "./CareerStep";
import JobFieldStep from "./JobFieldStep";
import LocationStep from "./LocationStep";
import CareerYear from "./CareerYear";
type JobItem = {
  jobFamily: string;
  role: string;
};
type LocationItem = {
  city: string;
  district: string;
};
export default function OnBoardingModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false); // 완료 상태 추가

  // career: -2(선택안함) -1(경력 선택 시) 0(신입) 또는 n(경력 n년)
  const [career, setCareer] = useState<number>(-2);
  // 경력 연수 범위 상태 추가
  const [careerYear, setCareerYear] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1,
  });
  // 원하는 직무 분야
  const [jobList, setJobList] = useState<JobItem[]>([]);
  // 결정못했을때
  const [isUndecided, setIsUndecided] = useState(false);
  // 원하는 근무 지역
  const [locationList, setLocationList] = useState<LocationItem[]>([]);

  const { handleSubmit } = useForm();

  // 온보딩 데이터 전송 함수
  const onSubmit = async () => {
    try {
      console.log("온보딩 데이터 전송:", {
        career,
        careerYear,
        jobList,
        isUndecided,
        locationList,
      });

      // 예시: API 전송
      // await fetch("/api/onboarding", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     career,
      //     careerYear,
      //     jobList,
      //     isUndecided,
      //     locationList,
      //   }),
      //   headers: { "Content-Type": "application/json" },
      // });

      // 전송 성공 시 완료 화면으로 전환
      setIsCompleted(true);
    } catch (error) {
      console.error("온보딩 데이터 전송 실패:", error);
    }
  };

  // 모달이 닫힐 때 상태 초기화
  useEffect(() => {
    if (!open) {
      setCurrentStep(0);
      setIsCompleted(false);
      setCareer(-2);
      setCareerYear({ min: 0, max: 1 });
      setJobList([]);
      setIsUndecided(false);
      setLocationList([]);
    }
  }, [open]);

  // career 값이 변경될 때 careerYear 초기화
  useEffect(() => {
    if (career === 0 || career === -2) {
      // 신입이거나 선택안함으로 변경시 careerYear 초기화
      setCareerYear({ min: 0, max: 1 });
    }
  }, [career]);

  const steps = [
    {
      title: "소현님, 경력이신가요?",
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
      content: (
        <JobFieldStep
          jobList={jobList}
          setJobList={setJobList}
          isUndecided={isUndecided}
          setIsUndecided={setIsUndecided}
          career={career}
          setCurrentStep={setCurrentStep}
        />
      ),
    },
    {
      title: "희망 근무 지역을 선택해주세요!",
      subtitle:
        "복수 선택할 수 있어요. 선택 내용은 마이페이지에서 언제든지 수정 가능해요.",
      content: (
        <LocationStep
          locationList={locationList}
          setLocationList={setLocationList}
          setCurrentStep={setCurrentStep}
          onSubmit={handleSubmit(onSubmit)}
        />
      ),
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        className="flex !h-[640px] !w-[680px] w-full !max-w-[680px] flex-col items-center gap-0 rounded-lg bg-white px-0 pt-6 pb-[44px] [&>button]:hidden"
      >
        {isCompleted ? (
          // 완료 화면
          <>
            <DialogTitle>
              <div className="text-32-600 text-text-secondary mb-2 leading-10">
                회원가입을 축하해요!
              </div>
            </DialogTitle>
            <DialogDescription className="text-16-500 text-text-tertiary leading-6">
              소현님에게 맞는 맞춤형 공고들을 앞으로 추천해드릴게요!
            </DialogDescription>
            <div className="flex flex-1 items-center justify-center">
              <div className="h-40 w-50">이미지</div>
            </div>
            <DialogFooter>
              <Button
                variant="filled"
                size="lg"
                className="w-[353px]"
                onClick={() => onOpenChange(false)}
              >
                나한테 꼭 맞는 공고 보러가기
              </Button>
            </DialogFooter>
          </>
        ) : (
          // 온보딩 진행 화면
          <>
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
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
