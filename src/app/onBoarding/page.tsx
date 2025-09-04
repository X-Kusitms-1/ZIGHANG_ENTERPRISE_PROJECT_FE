"use client";
import { useState } from "react";
import MobileHeader from "@/components/mobileLogin/MobileHeader";
import MobileLoginTitle from "@/components/mobileLogin/MobileLoginTitle";
import MobileSubTitle from "@/components/mobileLogin/MobileSubTitle";

import CareerStep from "@/components/onboarding/CareerStep";
import CareerYear from "@/components/onboarding/CareerYear";
import JobFieldStep from "@/components/onboarding/JobFieldStep";
import LocationStep from "@/components/onboarding/LocationStep";

type JobItem = {
  jobFamily: string;
  role: string;
};
type LocationItem = {
  city: string;
  district: string;
};

export default function OnBoardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [career, setCareer] = useState<number>(-2);
  const [careerYear, setCareerYear] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1,
  });
  const [jobList, setJobList] = useState<JobItem[]>([]);
  const [isUndecided, setIsUndecided] = useState(false);
  const [locationList, setLocationList] = useState<LocationItem[]>([]);

  const steps = [
    {
      title: "소현님, 경력이신가요?",
      subtitle: (
        <>
          단 1분, 프로필을 작성하시면 맞춤형 공고를
          <br className="mobile:block tablet:hidden" /> 추천해드릴게요.
        </>
      ),
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
        />
      ),
    },
  ];

  return (
    <div className="flex min-h-[100dvh] w-full flex-col bg-white">
      <MobileHeader
        showCloseButton={false}
        currentStep={currentStep}
        totalSteps={steps.length}
      />
      <div
        className="tablet:px-8 pc:w-[768px] pc:mx-auto mobile:px-5 pc:px-0 flex flex-col pb-5"
        style={{ minHeight: "calc(100dvh - 72px)" }}
      >
        <div className="mt-[7.04dvh] mb-[16.4dvh] flex flex-col gap-3">
          <MobileLoginTitle text={steps[currentStep].title} />
          <MobileSubTitle text={steps[currentStep].subtitle} />
        </div>
        {steps[currentStep].content}
      </div>
    </div>
  );
}
