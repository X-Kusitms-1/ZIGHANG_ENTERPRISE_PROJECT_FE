"use client";
import Image from "next/image";
import AccuracyModal from "./AccuracyModal";
import ReportModal from "./ReportModal";
// import 제거: useEffect, useState 불필요

interface SideComponentProps {
  title: string;
  subtitle: string;
  image: string;
  className?: string;
  children?: React.ReactNode;
}

function SideComponent({
  title,
  subtitle,
  image,
  className = "",
  children,
}: SideComponentProps) {
  return (
    <div
      className={`flex w-[342px] flex-col items-center rounded-[12px] bg-white p-6 ${className}`}
    >
      <div className="flex flex-col items-start gap-1 self-stretch">
        <div
          className="text-18-600 text-text-secondary leading-7"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <div className="text-12-500 text-text-tertiary overflow-hidden leading-4 text-ellipsis whitespace-nowrap">
          {subtitle}
        </div>
      </div>
      <div className="h-[100px] w-[120px]">
        {image && (
          <Image
            src={image}
            alt={title}
            width={100}
            height={80}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      {children}
    </div>
  );
}

export default function SideGroup() {
  return (
    <div className="flex flex-col gap-3">
      <SideComponent
        title="주간 레포트를 통해<br>나의 강약점을 확인해보세요."
        subtitle="지난 한 주 동안 업로드된 파일을 분석해 레포트를 생성해드려요."
        image="/today/report.svg"
        className="gap-[30px]"
      >
        <ReportModal>
          <button className="bg-bg-info text-14-500 block w-full cursor-pointer items-center justify-center self-stretch rounded-[8px] p-3 leading-5 text-[#701DA5]">
            내 레포트 확인하기
          </button>
        </ReportModal>
      </SideComponent>
      <SideComponent
        title="더 적합한 공고를 추천 받고 싶다면?"
        subtitle="간단한 질문에 답하면 조건에 가까운 공고를 추천해드릴게요."
        image="/today/recommend.svg"
        className="gap-6"
      >
        <AccuracyModal>
          <button className="bg-bg-info text-14-500 block w-full cursor-pointer items-center justify-center self-stretch rounded-[8px] p-3 leading-5 text-[#701DA5]">
            추천 정확도 올리기
          </button>
        </AccuracyModal>
      </SideComponent>
    </div>
  );
}
