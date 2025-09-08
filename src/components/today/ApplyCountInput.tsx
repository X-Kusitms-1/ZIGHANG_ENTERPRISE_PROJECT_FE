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
    <div className="bg-bg-info-hovered flex h-[38vh] relative min-h-[220px] w-full max-w-[480px] min-w-[320px] flex-shrink-0 flex-col gap-[10px] rounded-[12px] md:h-[320px] md:max-w-[400px]">
      {/* 배경 이미지 (absolute, z-0) */}
      <div className="absolute inset-0 h-[72%] w-full">
          <Image
            src="/today/apply-component.svg"
            alt="지원할 공고 개수 배경 이미지"
            fill
            className="z-0 rounded-[12px] object-cover"
            style={{ zIndex: 0 }}
          />
      </div>
      {/* 입력 컨트롤 영역 (relative, z-10) */}
      <div className="bg-bg-info relative z-10 mx-auto mt-[30vh] flex h-[52px] w-[70%] min-w-[200px] items-center justify-between rounded-[10px] p-3">
        <label className="text-text-secondary text-base font-semibold md:text-lg">
          지원할 공고 개수
        </label>
        {/* 카운터 컨트롤 */}
        <div className="flex h-9 w-[40%] min-w-[90px] items-center">
          {/* 감소 버튼 */}
          <button
            onClick={handleDecrement}
            disabled={count <= 1}
            className="bg-bg-base hover:bg-bg-base-hovered active:bg-bg-base-focused flex h-9 w-9 items-center justify-center rounded-l-lg border-0 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Minus className="text-text-secondary h-4 w-4" />
          </button>
          {/* 개수 표시 */}
          <div className="bg-bg-base flex h-9 flex-1 items-center justify-center border-0 px-4 py-2">
            <span className="text-text-primary text-sm md:text-base">
              {count}
            </span>
          </div>
          {/* 증가 버튼 */}
          <button
            onClick={handleIncrement}
            className="bg-bg-base hover:bg-bg-base-hovered active:bg-bg-base-focused flex h-9 w-9 items-center justify-center rounded-r-lg border-0"
          >
            <Plus className="text-text-secondary h-4 w-4" />
          </button>
        </div>
      </div>
      {/* 제출 버튼 */}
      <div className="absolute top-[75%] right-4 z-10">
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
