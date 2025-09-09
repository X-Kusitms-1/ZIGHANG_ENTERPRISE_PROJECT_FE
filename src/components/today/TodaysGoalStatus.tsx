import React from "react";
import Image from "next/image";

interface TodaysGoalStatusProps {
  userName?: string;
  completed?: number;
  total?: number;
  // percentage prop 제거
}

export function TodaysGoalStatus({
  userName = "소현",
  completed = 0,
  total = 5,
}: TodaysGoalStatusProps) {
  // completed/total로 퍼센트 계산
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  const progressWidth = `${percentage}%`;

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
          className="bg-bg-primary absolute top-0 left-0 h-2.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: progressWidth }}
        />

        {/* Tooltip: 진행바 끝나는 지점 위에 위치 */}
        {completed === 0 ? (
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
        ) : (
          <div
            className="absolute -top-11"
            style={{ left: `calc(${progressWidth} - 25px)` }} // 20px은 툴팁의 절반 너비(중앙 정렬)
          >
            <div className="relative flex flex-col items-center">
              {/* Tooltip Content */}
              <div className="bg-bg-transparent-mostdarkest text-text-inverse text-12-500 rounded-[8px] px-3 py-1.5">
                {`${percentage}%`}
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
