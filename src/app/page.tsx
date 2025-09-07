"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import SearchInput from "@/components/widgets/SearchInput";
import JobCategoryGrid from "@/components/widgets/JobCategoryGrid";
import Banner from "@/components/widgets/Banner";
import OnBoardingModal from "@/components/onboarding/OnBoardingModal";

export default function Home() {
  
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const shouldShowOnboarding = urlParams.get("showOnboarding");
    if (shouldShowOnboarding === "true") {
      // 백엔드에서 온보딩 완료 여부 검증
      import("@/api").then(({ serverApiClient }) => {
        serverApiClient
          .get("/v1/user/status")
          .then((response) => {
            const onboardingComplete = response.data.data.isOnboarded;
            if (!onboardingComplete) {
              setShowOnboarding(true);
            } else {
              setShowOnboarding(false);
            }
          })
          .catch(() => {
            setShowOnboarding(false);
          });
      });
    }
  }, []);

  return (
    <>
      {showOnboarding && <OnBoardingModal defaultOpen={true} />}
      <div className="my-6 flex w-full flex-col items-center">
        <div className="tablet:flex-row tablet:text-[22px] flex flex-col items-center gap-1 text-[18px] font-bold">
          <span>대기업 및 유니콘 채용 공고를</span>
          <div className="flex items-center">
            <span className="text-[#6F00B6]">빠짐없이 모두</span>
            <span>&nbsp;모았어요.</span>
          </div>
        </div>
        <SearchInput />
        <div className="tablet:gap-4 relative inline-flex items-center gap-2">
          <Link
            href="/company"
            className="relative inline-flex flex-[0_0_auto] cursor-pointer items-center gap-1"
          >
            <p className="tablet:text-base relative w-fit text-sm leading-[normal] font-semibold tracking-[0] whitespace-nowrap">
              <span className="text-[#6F00B6]">33764개 기업</span>
              <span className="text-[#646464]"> 전체 보기</span>
            </p>
            <ChevronRight className="h-4 w-4 text-[#646464]" />
          </Link>
          <Link
            href="/all"
            className="relative inline-flex flex-[0_0_auto] cursor-pointer items-center gap-1"
          >
            <p className="tablet:text-base relative w-fit text-sm leading-[normal] font-semibold tracking-[0] whitespace-nowrap">
              <span className="text-[#6F00B6]">99968개 공고</span>
              <span className="text-[#646464]"> 전체 보기</span>
            </p>
            <ChevronRight className="h-4 w-4 text-[#646464]" />
          </Link>
        </div>
      </div>
      <JobCategoryGrid />
      <Banner />
    </>
  );
}
