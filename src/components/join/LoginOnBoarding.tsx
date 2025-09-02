import { useState } from "react";
import LoginModal from "./LoginModal";
import OnBoardingModal from "../onboarding/OnBoardingModal";

interface LoginOnBoardingProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function LoginOnBoarding({ open, onOpenChange }: LoginOnBoardingProps) {
  const [onBoardingOpen, setOnBoardingOpen] = useState(false);

  // 소셜 로그인 버튼 클릭 시 온보딩 모달로 전환
  const handleSocialLogin = () => {
    onOpenChange(false); // 로그인 모달 닫기
    setOnBoardingOpen(true); // 온보딩 모달 열기
  };

  return (
    <>
      <LoginModal open={open} onOpenChange={onOpenChange} handleSocialLogin={handleSocialLogin} />
      <OnBoardingModal open={onBoardingOpen} onOpenChange={setOnBoardingOpen} />
    </>
  );
}
