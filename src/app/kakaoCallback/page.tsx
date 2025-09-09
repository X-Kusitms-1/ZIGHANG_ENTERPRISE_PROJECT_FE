"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { serverApi } from "@/api";

export default function KakaoCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        // 쿼리 파라미터에서 name 추출
        const urlParams = new URLSearchParams(window.location.search);
        const name = urlParams.get("name");

        // name이 있으면 로컬스토리지에 저장
        if (name) {
          localStorage.setItem("userName", name);
        }

        const response = await serverApi.get("/v1/user/status");
        const onboardingComplete  = response.data.data.isOnboarded;
        if (!onboardingComplete) {
          // 온보딩이 완료되지 않은 경우
          const isMobile = window.innerWidth < 768; // 모바일 기준 (tablet: 768px)

          if (isMobile) {
            router.replace("/onBoarding");
          } else {
            // PC일 때는 메인 페이지로 이동하면서 쿼리 파라미터로 온보딩 모달 열기 신호
            router.replace("/?showOnboarding=true");
          }
        } else {
          // 온보딩이 완료된 경우 메인 페이지로 이동
          router.replace("/");
        }
      } catch (error) {
        console.error("사용자 상태 확인 실패:", error);
        // 에러 발생 시 메인 페이지로 이동
        router.replace("/");
      }
    };

    checkUserStatus();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-purple-500" />
    </div>
  );
}
