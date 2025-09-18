"use client";
import Lottie from "lottie-react";
import MobileHeader from "@/components/mobileLogin/MobileHeader";
import MobileLoginTitle from "@/components/mobileLogin/MobileLoginTitle";
import MobileSubTitle from "@/components/mobileLogin/MobileSubTitle";
import onBoardingAnimation from "@/../public/animation/onboarding.json";
import SuccessSubTitle from "./SuccessSubTitle";
import SuccessButton from "./SuccessButton";

export default function OnBoardingSuccessPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-white px-5 pb-5">
      <MobileHeader showCloseButton={false} />
      <div className="flex flex-1 flex-col">
        <div className="flex flex-col items-center">
          <div className="mobile:my-15 flex w-full flex-col gap-2 text-left">
            <MobileLoginTitle text="회원가입을 축하해요!" />
            <MobileSubTitle text={<SuccessSubTitle />} />
          </div>
        </div>
        <div className="flex flex-1 grow items-center justify-center mb-30">
          <Lottie
            animationData={onBoardingAnimation}
            loop={true}
            autoplay={true}
            style={{ width: 280, height: 280 }}
          />
        </div>
        <SuccessButton />
      </div>
    </div>
  );
}
