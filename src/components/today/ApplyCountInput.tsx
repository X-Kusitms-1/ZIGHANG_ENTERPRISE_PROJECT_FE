"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { useGetTodayApplyList } from "@/hooks/today/useGetApplyList";
import { postApplyCountApi } from "@/api/today/userTodayApply";
import { Skeleton } from "@/components/ui/Skeleton";
import AnnouncementModal from "./AnnouncementModal";
// 지원할 공고 개수를 입력하는 컴포넌트 (PC/노트북 해상도에 유연하게 반응)
export default function ApplyCountInput() {
  const [count, setCount] = useState(1);
  const { data: todayApplyList, isLoading } = useGetTodayApplyList();

  // 개수 감소
  const handleDecrement = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      postApplyCountApi(newCount);
    }
  };
  // 개수 증가
  const handleIncrement = () => {
    if (count < 10) {
      const newCount = count + 1;
      setCount(newCount);
      postApplyCountApi(newCount);
    }
  };

  // 데이터 로딩 중에는 스켈레톤 UI 노출
  if (isLoading) {
    return (
      <div className="bg-bg-info-hovered relative flex h-[280px] w-[432px] flex-shrink-0 flex-col gap-[10px] rounded-[12px]">
        {/* 배경 이미지 (기존과 동일) */}
        <div className="absolute inset-0 h-[204.4px] w-full">
          <Image
            src="/today/apply-component.svg"
            alt="지원할 공고 개수 배경 이미지"
            fill
            className="z-0 rounded-[12px] object-cover"
            style={{ zIndex: 0 }}
          />
        </div>
        {/* 메인 영역만 스켈레톤 */}
        <Skeleton className="absolute z-10 right-3 bottom-3 left-3 h-[52px] w-[calc(100%-24px)] rounded-[10px] bg-bg-info" />
      </div>
    );
  }

  // 지원리스트가 이미 있으면 안내 버튼만 보여줌
  if (Array.isArray(todayApplyList) && todayApplyList.length > 0) {
    return (
      <div className="bg-bg-info-hovered relative flex h-[280px] w-[432px] flex-shrink-0 flex-col rounded-[12px]">
        <div className="absolute inset-0 h-[204.4px] w-full">
          <Image
            src="/today/apply-component.svg"
            alt="지원할 공고 개수 배경 이미지"
            fill
            className="z-0 rounded-[12px] object-cover"
            style={{ zIndex: 0 }}
          />
        </div>
        <button className="bg-bg-info text-16-500 absolute right-3 bottom-3 left-3 flex h-[52px] w-[calc(100%-24px)] items-center justify-center rounded-[10px] px-4 py-4 text-[rgba(112,29,165,1)] shadow">
          오늘의 지원리스트는 이미 생성했어요
        </button>
      </div>
    );
  }

  return (
    <div className="bg-bg-info-hovered relative flex h-[280px] w-[432px] flex-shrink-0 flex-col gap-[10px] rounded-[12px]">
      {/* 배경 이미지 (absolute, z-0) */}
      <div className="absolute inset-0 h-[204.4px] w-full">
        <Image
          src="/today/apply-component.svg"
          alt="지원할 공고 개수 배경 이미지"
          fill
          className="z-0 rounded-[12px] object-cover"
          style={{ zIndex: 0 }}
        />
      </div>
      {/* 입력 컨트롤 영역 (relative, z-10) */}
      <div className="bg-bg-info absolute bottom-3 left-4 z-10 flex h-[52px] w-[296px] items-center justify-between rounded-[10px] px-3 py-[16px]">
        <label className="text-text-secondary text-16-600 leading-6">
          지원할 공고 개수
        </label>
        {/* 카운터 컨트롤 */}
        <div className="bg-bg-base flex h-9 w-[45.6%] items-center rounded-[8px]">
          {/* 감소 버튼 */}
          <button
            onClick={handleDecrement}
            disabled={count <= 1}
            className="hover:bg-bg-base-hovered active:bg-bg-base-focused flex h-9 w-9 items-center justify-center border-0 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Minus className="text-text-secondary h-4 w-4" />
          </button>
          {/* 개수 표시 */}
          <div className="flex h-9 flex-1 items-center justify-center border-0">
            <span className="text-text-primary text-14-500">{count}</span>
          </div>
          {/* 증가 버튼 */}
          <button
            onClick={handleIncrement}
            disabled={count >= 10}
            className="hover:bg-bg-base-hovered active:bg-bg-base-focused flex h-9 w-9 items-center justify-center border-0 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus className="text-text-secondary h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="absolute right-4 bottom-3 z-10">
        <AnnouncementModal />
      </div>
    </div>
  );
}
