"use client";
import Image from "next/image";
// import 제거: useEffect, useState 불필요

interface SideComponentProps {
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  className?: string;
}

function SideComponent({
  title,
  subtitle,
  image,
  buttonText,
  className = "",
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
      <button className="bg-bg-info text-14-500 flex w-full cursor-pointer items-center justify-center rounded-[8px] p-3 leading-5 text-[#701DA5]">
        {buttonText}
      </button>
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
        buttonText="내 레포트 확인하기"
        className="gap-[30px]"
      />
      <SideComponent
        title="더 적합한 공고를 추천 받고 싶다면?"
        subtitle="간단한 질문에 답하면 조건에 가까운 공고를 추천해드릴게요."
        image="/today/recommend.svg"
        buttonText="추천 정확도 올리기"
        className="gap-6"
      />
    </div>
  );
}
