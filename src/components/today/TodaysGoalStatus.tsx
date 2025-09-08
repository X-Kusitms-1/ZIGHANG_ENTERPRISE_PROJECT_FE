import React from "react";
import TooltipArrow from "./TooltipArrow";

interface TodaysGoalStatusProps {
  userName?: string;
  completed?: number;
  total?: number;
  // percentage prop 제거
}

export function TodaysGoalStatus({
  userName = "소현",
  completed = 3,
  total = 5,
}: TodaysGoalStatusProps) {
  // completed/total로 퍼센트 계산
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const progressWidth = `${percentage}%`;

  return (
    <div className="bg-bg-base relative h-[142px] w-full rounded-[12px] p-5 pb-0 min-w-[402px]">
      {/* Title */}
      <div className="text-18-600 text-text-tertiary mb-[18px] leading-[28px]">
        {userName}님의 목표달성 현황
      </div>

      {/* Progress Count */}
      <div className="text-18-600 text-text-primary mb-[10px] leading-[28px]">
        {completed}/{total}개
      </div>

      {/* Progress Bar Container */}
      <div className="relative">
        {/* Background Bar */}
        <div className="bg-border-tertiary h-2.5 w-full rounded-full" />

        {/* Progress Fill */}
        <div
          className="bg-bg-primary absolute top-0 left-0 h-2.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: progressWidth }}
        />

        {/* Tooltip: 진행바 끝나는 지점 위에 위치 */}
        <div
          className="absolute -top-11"
          style={{ left: `calc(${progressWidth} - 25px)` }} // 20px은 툴팁의 절반 너비(중앙 정렬)
        >
          <div className="relative flex flex-col items-center">
            {/* Tooltip Content */}
            <div className="bg-bg-transparent-mostdarkest text-text-inverse text-12-500 rounded-[8px] px-3 py-1.5">
              {percentage}%
            </div>
            {/* Tooltip Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 transform">
              <TooltipArrow
                style={{ color: "var(--color-bg-transparent-mostdarkest)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
