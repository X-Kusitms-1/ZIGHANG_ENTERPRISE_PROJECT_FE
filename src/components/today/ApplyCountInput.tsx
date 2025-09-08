"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/Button";

// 지원할 공고 개수를 입력하는 컴포넌트 (PC/노트북 해상도에 유연하게 반응)
export default function ApplyCountInput() {
  const [count, setCount] = useState(1);

  // 개수 감소
  const handleDecrement = () => {
    if (count > 1) setCount(count - 1);
  };
  // 개수 증가
  const handleIncrement = () => {
    setCount(count + 1);
  };
  // 제출
  const handleSubmit = () => {
    console.log(`선택된 공고 개수: ${count}`);
  };

  return (
    <div className="bg-bg-info-hovered flex h-[38vh] relative max-h-[280px] w-full max-w-[432px] min-w-[400px] flex-shrink-0 flex-col gap-[10px] rounded-[12px] ">
      {/* 배경 이미지 (absolute, z-0) */}
      <div className="absolute inset-0 h-[73%] w-full">
          <Image
            src="/today/apply-component.svg"
            alt="지원할 공고 개수 배경 이미지"
            fill
            className="z-0 rounded-[12px] object-cover"
            style={{ zIndex: 0 }}
          />
      </div>
      {/* 입력 컨트롤 영역 (relative, z-10) */}
      <div className="bg-bg-info absolute bottom-3 left-4 z-10 flex h-[52px] w-[68.5%] min-w-[200px] items-center justify-between rounded-[10px] px-3 py-[16px]">
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
            <span className="text-text-primary text-14-500">
              {count}
            </span>
          </div>
          {/* 증가 버튼 */}
          <button
            onClick={handleIncrement}
            className="hover:bg-bg-base-hovered active:bg-bg-base-focused flex h-9 w-9 items-center justify-center border-0"
          >
            <Plus className="text-text-secondary h-4 w-4" />
          </button>
        </div>
      </div>
      {/* 제출 버튼 */}
      <div className="absolute bottom-3 right-4 z-10">
        <Button
          onClick={handleSubmit}
          variant="filled"
          size="lg"
          className="h-[52px] w-[92px] rounded-[10px]"
        >
          <span className="text-base">공고 확인</span>
        </Button>
      </div>
    </div>
  );
}
