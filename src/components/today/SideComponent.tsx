"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

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
  const [displayTitle, setDisplayTitle] = useState(title);

  useEffect(() => {
    if (title.includes("사용자")) {
      let userName = "사용자";
      const storedName = localStorage.getItem("userName");
      console.log("localStorage에서 가져온 값:", storedName);
      if (storedName && storedName.trim()) {
        userName = storedName;
      }
      const newTitle = title.replace("사용자", userName);
      setDisplayTitle(newTitle);
    }
  }, [title]);  

  return (
    <div
      className={`flex w-[342px] flex-col items-center rounded-xl bg-white p-6 ${className}`}
    >
      <div className="flex flex-col items-start gap-1 self-stretch">
        <div className="text-lg leading-7 font-semibold text-[#2D3139]">
          {displayTitle}
        </div>
        <div className="text-xs leading-4 font-medium text-[#686D79]">
          {subtitle}
        </div>
      </div>
      <div className="h-[80px] w-[100px] bg-gray-300">
        {image && (
          <Image
            src={image}
            alt={displayTitle}
            width={100}
            height={80}
            className="h-full w-full object-cover"
          />
        )}
      </div>
      <button className="flex w-full items-center justify-center rounded-lg bg-[#F9F2FD] p-3">
        <div className="text-sm leading-5 font-medium text-[#701DA5]">
          {buttonText}
        </div>
      </button>
    </div>
  );
}

export default function SideGroup() {
  return (
    <div className="flex flex-col gap-3">
      <SideComponent
        title="타이틀1"
        subtitle="서브타이틀1"
        image="/today/page.svg"
        buttonText="리포트 보러 가기"
        className="gap-[30px]"
      />
      <SideComponent
        title="사용자 님은 무슨 타입이에요?"
        subtitle="성향, 좋아하는 스타일을 알려주시면 더 정확한 추천이 가능해요!"
        image="/today/apply-component.svg"
        buttonText="추천 정확도 올리기"
        className="gap-6"
      />
    </div>
  );
}
