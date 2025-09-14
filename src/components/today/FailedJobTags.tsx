"use client";

import React from "react";
import { Chip } from "@/components/ui/Chip";
import { UserReportResponse } from "@/api/type/today";

function FailedJobTags({ userReport }: { userReport: UserReportResponse }) {
  const { failed_features } = userReport.reportData;

  const title = "불합격 공고들은 이런 특징이 있어요.";
  const subtitle = "불합격 공고의 공통점을 분석한 결과예요.";

  return (
    <div className="border-border-line flex flex-col border-t pt-9">
      <h3 className="text-24-600 text-text-secondary">{title}</h3>
      <p className="text-16-500 text-text-tertiary mt-2">{subtitle}</p>

      {/* 태그 플렉스 */}
      <div className="mt-8 flex flex-wrap gap-2">
        {failed_features.map((tag, index) => (
          <Chip key={index} variant="default" className="justify-center">
            {tag}
          </Chip>
        ))}
      </div>
    </div>
  );
}

export default FailedJobTags;
