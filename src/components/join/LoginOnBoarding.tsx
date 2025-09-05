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
    setIsToggle: setOnBoardingOpen,
  } = useToggle();

  // ...existing code...

  // 카카오 로그인 성공 후 온보딩 모달 열기 (예시: 쿼리 파라미터, localStorage 등 활용)
  // useEffect(() => {
  //   if (window.location.search.includes('social=success')) {
  //     setOnBoardingOpen(true);
  //   }
  // }, []);
  return (
    <>
      <LoginModal open={open} onOpenChange={onOpenChange} />
      <OnBoardingModal open={onBoardingOpen} onOpenChange={setOnBoardingOpen} />
    </>
  );
}
