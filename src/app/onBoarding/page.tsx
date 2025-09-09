"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MobileHeader from "@/components/mobileLogin/MobileHeader";
import MobileLoginTitle from "@/components/mobileLogin/MobileLoginTitle";
import MobileSubTitle from "@/components/mobileLogin/MobileSubTitle";

import CareerStep from "@/components/onboarding/CareerStep";
import CareerYear from "@/components/onboarding/CareerYear";
import JobFieldStep from "@/components/onboarding/JobFieldStep";
import LocationStep from "@/components/onboarding/LocationStep";
import { serverApiClient } from "@/api";

type JobItem = {
  jobFamily: string;
  role: string;
};
type LocationItem = {
  city: string;
  district: string;
};

export default function OnBoardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [career, setCareer] = useState<number>(-2);
  const [careerYear, setCareerYear] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1,
  });
  const [jobList, setJobList] = useState<JobItem[]>([]);
  const [isUndecided, setIsUndecided] = useState(false);
  const [locationList, setLocationList] = useState<LocationItem[]>([]);
  const [userName, setUserName] = useState<string>("");

  // 최초 마운트 시 로컬스토리지에서 userName 가져오기
  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) setUserName(name);
  }, []);

  // 온보딩 데이터 전송 함수
  const onSubmit = async () => {
    try {
      const payload = {
        minCareer: careerYear.min,
        maxCareer: careerYear.max,
        addressList: locationList,
        industryList: jobList,
      };
      console.log("온보딩 데이터 전송:", payload);

      // 실제 API 전송 예시
      const response = await serverApiClient.post(
        "/v1/user/onboarding",
        payload
      );

      // 응답이 200일 때만 성공 페이지로 이동
      if (response.status === 200) {
        router.replace("/onBoarding/success");
      }
    } catch (error) {
      alert("온보딩 데이터 입력 오류 다시 시도해주세요");
      router.replace("/onBoarding");
      console.error("온보딩 데이터 전송 실패:", error);
    }
  };

  const steps = [
    {
      title: `${userName ? userName : "사용자"}님, 경력이신가요?`,
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
      subtitle: (
        <>
          정확하지 않아도 괜찮아요! 마이페이지에서 언제든지
          <br className="mobile:block tablet:hidden" /> 수정할 수 있어요.
        </>
      ),
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
      subtitle: (
        <>
          복수 선택할 수 있어요. 선택 내용은 마이페이지에서
          <br className="mobile:block tablet:hidden" />
          언제든지 수정 가능해요.
        </>
      ),
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
      subtitle: (
        <>
          복수 선택할 수 있어요. 선택 내용은 마이페이지에서
          <br className="mobile:block tablet:hidden" />
          언제든지 수정 가능해요.
        </>
      ),
      content: (
        <LocationStep
          locationList={locationList}
          setLocationList={setLocationList}
          setCurrentStep={setCurrentStep}
          onSubmit={onSubmit}
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
        className={`tablet:px-8 pc:w-[768px] pc:mx-auto pc:px-0 mobile:pb-5 tablet:pb-8 flex flex-col ${currentStep === 2 ? "mobile:px-3" : "mobile:px-5"}`}
        style={{ minHeight: "calc(100dvh - 72px)" }}
      >
        <div
          className={`mt-[60px] flex flex-col gap-3 ${[2, 3].includes(currentStep) ? "mobile:mb-0" : "mb-[44px]"}`}
        >
          <MobileLoginTitle text={steps[currentStep].title} />
          <MobileSubTitle text={steps[currentStep].subtitle} />
        </div>
        {steps[currentStep].content}
      </div>
    </div>
  );
}
