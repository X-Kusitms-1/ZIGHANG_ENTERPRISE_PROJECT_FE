"use client";

import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const COLORS = ["#A74DDF", "#F1F5F9"]; // 보라색과 회색

import { UserReportResponse } from "@/api/type/today";

function ReportChart({ userReport }: { userReport: UserReportResponse }) {
  const { passedCount, rejectedCount } = userReport;

  // 동적 데이터 생성
  const data = [
    { name: "합격 공고", value: passedCount },
    { name: "불합격 공고", value: rejectedCount },
  ];

  // 퍼센트 계산 함수
  const calculatePercentages = () => {
    const total = passedCount + rejectedCount;
    if (total === 0) {
      return { passedPercentage: 0, rejectedPercentage: 0 };
    }

    const passedPercentage = ((passedCount / total) * 100).toFixed(1);
    const rejectedPercentage = ((rejectedCount / total) * 100).toFixed(1);

    return { passedPercentage, rejectedPercentage };
  };

  const { passedPercentage, rejectedPercentage } = calculatePercentages();

  return (
    <div className="flex flex-col">
      <h3 className="text-24-600 text-text-secondary">이번주 합격발표 현황</h3>
      <p className="text-16-500 text-text-tertiary mt-2">
        이번주에 입력한 서류 합격 여부를 시각화했어요.
      </p>

      {/* 파이 차트 */}
      <PieChart
        width={220}
        height={220}
        tabIndex={-1}
        className="pointer-events-none mx-auto mt-11"
      >
        <Pie
          data={data}
          dataKey="value"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={3}
          style={{ pointerEvents: "none" }}
          tabIndex={-1}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>

      {/* 커스텀 범례 */}
      <div className="mx-auto mt-6 space-y-4">
        {data.map((entry, index) => {
          const percentage =
            index === 0 ? passedPercentage : rejectedPercentage;
          return (
            <div key={index} className="flex w-48 items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="h-5 w-5 rounded-[4px]"
                  style={{
                    backgroundColor: COLORS[index % COLORS.length],
                  }}
                />
                <span className="text-14-400 text-text-transparent">
                  {entry.name}
                </span>
              </div>
              <div className="flex items-end gap-2 text-right">
                <p className="text-14-400 text-text-tertiary">
                  {entry.value}건
                </p>
                <p className="text-14-400 text-text-tertiary">
                  ({percentage}%)
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ReportChart;
