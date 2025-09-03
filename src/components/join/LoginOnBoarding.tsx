import { useToggle } from "@/hooks/useToggle";
import OnBoardingModal from "../onboarding/OnBoardingModal";
import LoginModal from "./LoginModal";

interface LoginOnBoardingProps {
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginOnBoarding({
  open,
  onOpenChange,
}: LoginOnBoardingProps) {
  const {
    isToggle: onBoardingOpen,
    onOpenToggle: openOnBoarding,
    setIsToggle: setOnBoardingOpen,
  } = useToggle();

  // 소셜 로그인 버튼 클릭 시 온보딩 모달로 전환
  const handleSocialLogin = () => {
    onOpenChange(false); // 로그인 모달 닫기
    openOnBoarding(); // 온보딩 모달 열기
  };

  return (
    <>
      <LoginModal
        open={open}
        onOpenChange={onOpenChange}
        handleSocialLogin={handleSocialLogin}
      />
      <OnBoardingModal open={onBoardingOpen} onOpenChange={setOnBoardingOpen} />
    </>
  );
}
