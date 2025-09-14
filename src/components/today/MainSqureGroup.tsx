"use client";
import Image from "next/image";
import { useGetApplyStatus } from "@/hooks/today/useGetApplyStatus";

export default function MainSqureGroup() {
  const { data } = useGetApplyStatus();


  // 받아온 데이터에서 각 숫자 추출
  const todayApplyCount = data?.todayApplyCount ?? 0;
  const thisWeekApplyCount = data?.thisWeekApplyCount ?? 0;
  const totalApplyCount = data?.totalApplyCount ?? 0;

  function MainSqureComponent({
    number,
    title,
  }: {
    number: number;
    title: string;
  }) {
    return (
      <div className="bg-bg-base flex h-[126px] w-[126px] flex-col gap-2 rounded-[12px] p-4 pr-0">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F9F2FD]">
          <Image
            src="/today/page.svg"
            alt="페이지 아이콘"
            width={10}
            height={22}
            style={{ display: "block" }}
          />
        </div>
        <p className="text-14-600 text-text-tertiary leading-5">{title}</p>
        <p className="text-18-600 text-text-primary leadin-7">{number}</p>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <MainSqureComponent number={todayApplyCount} title="오늘 지원한 곳" />
      <MainSqureComponent
        number={thisWeekApplyCount}
        title="이번 주 지원 현황"
      />
      <MainSqureComponent number={totalApplyCount} title="누적 지원 현황" />
    </div>
  );
}
