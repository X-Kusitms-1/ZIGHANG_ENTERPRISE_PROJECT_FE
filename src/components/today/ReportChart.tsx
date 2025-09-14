"use client";

import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "합격 공고", value: 3 },
  { name: "불합격 공고", value: 4 },
];
const COLORS = ["#A74DDF", "#F1F5F9"]; // 보라색과 회색

function ReportChart() {
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
          const total = data.reduce((sum, item) => sum + item.value, 0);
          const percentage = ((entry.value / total) * 100).toFixed(1);
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
