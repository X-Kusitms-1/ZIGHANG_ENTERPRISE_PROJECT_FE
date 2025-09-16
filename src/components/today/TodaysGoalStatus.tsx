"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getUserName } from "@/utils/localStorage";
import { useGetTodayApplyList } from "@/hooks/today/useGetApplyList";
import { ApiApplyItem } from "@/api/today/getTodayApplyList";

export function TodaysGoalStatus({}) {
  const [userName, setUserName] = useState("사용자");
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const { data } = useGetTodayApplyList();

  // 배열의 길이를 total로, isApplied가 true인 개수를 completed로 설정
  const total = data?.length || 0;
  const completed =
    data?.filter((item: ApiApplyItem) => item.isApplied).length || 0;

  // completed/total로 퍼센트 계산
  const targetPercentage =
    total > 0 ? Math.round((completed / total) * 100) : 0;
  const progressWidth = `${animatedPercentage}%`;

  useEffect(() => {
    const storedUserName = getUserName();
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  // 퍼센트 애니메이션 효과
  useEffect(() => {
    if (targetPercentage === animatedPercentage) return;

    const duration = 1000; // 1초 동안 애니메이션
    const startValue = animatedPercentage;
    const endValue = targetPercentage;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeOutCubic 함수로 자연스러운 애니메이션
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const easedProgress = easeOutCubic(progress);

      const currentValue = startValue + (endValue - startValue) * easedProgress;
      setAnimatedPercentage(Math.round(currentValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [targetPercentage, animatedPercentage]);

  return (
    <div className="bg-bg-base relative flex h-[142px] w-full min-w-[402px] flex-col justify-between rounded-[12px] p-5 pb-7">
      {/* Title */}
      <div className="flex justify-between">
        <div className="text-18-600 text-text-tertiary leading-[28px]">
          {userName}님의 목표달성 현황
        </div>
        {/* Progress Count */}
        <div className="text-18-600 text-text-primary mb-[10px] leading-[28px]">
          {completed}/{total}개
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="relative">
        {/* Background Bar */}
        <div className="bg-border-tertiary h-2.5 w-full rounded-full" />

        {/* Progress Fill */}
        <div
          className="bg-bg-primary absolute top-0 left-0 h-2.5 rounded-full"
          style={{
            width: progressWidth,
            minWidth: animatedPercentage > 0 ? "10px" : "0px", // 최소 너비 설정으로 rounded 유지
          }}
        />

        {/* Tooltip: 진행바 끝나는 지점 위에 위치 */}
        {animatedPercentage === 0 ? (
          <div className="absolute -top-11 left-0">
            <div className="relative flex flex-col items-center">
              {/* Tooltip Content */}
              <div className="bg-bg-transparent-mostdarkest text-text-inverse text-12-500 rounded-[8px] px-3 py-1.5">
                시작이 반이에요!
              </div>
              {/* Tooltip Arrow */}
              <div className="absolute top-full left-[10px] transform">
                <Image
                  src="/today/triangle.svg"
                  alt="툴팁 화살표"
                  width={8}
                  height={7}
                  style={{ display: "block" }}
                />
              </div>
            </div>
          </div>
        ) : animatedPercentage === 100 ? (
          <div
            className="absolute -top-11 right-0" // 100%일 때는 오른쪽 끝에 고정
          >
            <div className="relative flex flex-col items-center">
              {/* Tooltip Content */}
              <div className="bg-bg-transparent-mostdarkest text-text-inverse text-12-500 rounded-[8px] px-3 py-1.5 whitespace-nowrap">
                축하해요! 오늘도 해냈어요!
              </div>
              {/* Tooltip Arrow */}
              <div className="absolute top-full right-[8px] transform">
                <Image
                  src="/today/triangle.svg"
                  alt="툴팁 화살표"
                  width={8}
                  height={7}
                  style={{ display: "block" }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div
            className="absolute -top-11"
            style={{ left: `calc(${animatedPercentage}% - 25px)` }} // 애니메이션된 퍼센트로 위치 계산
          >
            <div className="relative flex flex-col items-center">
              {/* Tooltip Content */}
              <div className="bg-bg-transparent-mostdarkest text-text-inverse text-12-500 rounded-[8px] px-3 py-1.5">
                {`${animatedPercentage}%`}
              </div>
              {/* Tooltip Arrow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 transform">
                <Image
                  src="/today/triangle.svg"
                  alt="툴팁 화살표"
                  width={8}
                  height={7}
                  style={{ display: "block" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
