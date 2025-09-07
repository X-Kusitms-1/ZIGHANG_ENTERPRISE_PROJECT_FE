"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import MobileHeader from "@/components/mobileLogin/MobileHeader";
import MobileLoginTitle from "@/components/mobileLogin/MobileLoginTitle";
import MobileSubTitle from "@/components/mobileLogin/MobileSubTitle";

export default function OnBoardingSuccessPage() {
  const [displayName, setDisplayName] = useState("사용자");
  const router = useRouter();

  useEffect(() => {
    const userName = localStorage.getItem("userName");
    setDisplayName(userName ?? "사용자");
  }, []);

  const handleGoToMain = () => {
    router.push("/");
  };

  return (
    <div className="flex min-h-[100dvh] flex-col bg-white px-5 pb-5">
      <MobileHeader showCloseButton={false} />
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex flex-col items-center">
          <div className="mobile:my-15 flex w-full flex-col gap-2 text-left">
            <MobileLoginTitle text="회원가입을 축하해요!" />
            <MobileSubTitle
              text={
                <>
                  {displayName}님에게 맞는 맞춤형 공고들을 앞으로
                  <br className="mobile:block tablet:hidden" />
                  추천해드릴게요!
                </>
              }
            />
          </div>
          <div className="h-40 w-50 bg-[#D9D9D9]" />
        </div>
        <Button
          variant="filled"
          size="lg"
          className="h-[56px] w-full"
          onClick={handleGoToMain}
        >
          나한테 꼭 맞는 공고 보러가기
        </Button>
      </div>
    </div>
  );
}
