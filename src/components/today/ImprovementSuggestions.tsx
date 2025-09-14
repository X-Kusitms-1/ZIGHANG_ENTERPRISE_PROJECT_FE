"use client";

import React from "react";
import { UserReportResponse } from "@/api/type/today";

function ImprovementSuggestions({
  userReport,
}: {
  userReport: UserReportResponse;
}) {
  const title = "이런 부분을 더 준비하면 좋아요.";
  const subtitle = "불합격 공고의 특징을 바탕으로 준비한 내용이에요.";

  const { recommendations } = userReport.reportData;

  // 카테고리별로 그룹화
  const groupedRecommendations = recommendations.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, typeof recommendations>
  );

  return (
    <div className="border-border-line flex flex-col border-t pt-9">
      <h3 className="text-24-600 text-text-secondary">{title}</h3>
      <p className="text-16-500 text-text-tertiary mt-2">{subtitle}</p>

      {/* 카테고리별 제안사항 */}
      <div className="mt-8 space-y-8">
        {Object.entries(groupedRecommendations).map(
          ([category, items], categoryIndex) => (
            <div key={categoryIndex} className="space-y-4">
              {items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex items-center justify-between gap-6"
                >
                  <h4 className="text-14-500 text-text-tertiary min-w-[80px]">
                    {category}
                  </h4>
                  <div className="text-14-500 text-text-secondary">
                    {item.requirement}
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default ImprovementSuggestions;
