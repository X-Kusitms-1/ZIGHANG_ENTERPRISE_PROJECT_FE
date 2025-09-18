"use client";
import Image from "next/image";
import AccuracyModal from "./AccuracyModal";
import ReportModal from "./ReportModal";
// import 제거: useEffect, useState 불필요

interface SideComponentProps {
  tag: string;
  title: string;
  subtitle: string;
  image: string;
  className?: string;
  children?: React.ReactNode;
}

function SideComponent({
  tag,
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
        <div className="text-12-500 text-text-info leading-4">{tag}</div>
        <div className="text-18-600 text-text-secondary leading-7">{title}</div>
        <div className="text-12-500 text-text-tertiary overflow-hidden leading-4 text-ellipsis whitespace-nowrap">
          {subtitle}
        </div>
      </div>
      {children && (
        <div className="flex w-full items-start justify-start">
          {children}
        </div>
      )}
      <div className="flex h-[108px] w-full justify-end">
        {image && <Image src={image} alt={title} width={124} height={108} />}
      </div>
    </div>
  );
}

export default function SideGroup() {
  return (
    <div className="flex flex-col gap-3">
      <SideComponent
        tag="Weekly Report"
        title="나의 강약점을 알려주는 주간 리포트"
        subtitle="지난 한 주 동안 업로드된 파일을 분석해 리포트를 생성해요."
        image="/today/page-report.svg"
        className="gap-[30px]"
      >
        <ReportModal>
          <div className="bg-bg-neutral flex h-8 w-[105px] cursor-pointer items-center justify-center gap-1 rounded-full">
            <span className="text-14-500 text-text-tertiary leading-5">
              바로가기 →
            </span>
          </div>
        </ReportModal>
      </SideComponent>
      <SideComponent
        tag="Improving Accuracy"
        title="더 적합한 공고를 추천 받고 싶다면?"
        subtitle="간단한 질문에 답하면 조건에 가까운 공고를 추천해드릴게요."
        image="/today/recommend.svg"
        className="gap-6"
      >
        <AccuracyModal>
          <div className="bg-bg-neutral flex h-8 w-[105px] cursor-pointer items-center justify-center gap-1 rounded-full">
            <span className="text-14-500 text-text-tertiary leading-5">
              바로가기 →
            </span>
          </div>
        </AccuracyModal>
      </SideComponent>
    </div>
  );
}
