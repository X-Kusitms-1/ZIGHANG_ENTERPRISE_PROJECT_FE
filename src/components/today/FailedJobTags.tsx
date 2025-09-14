"use client";

import React from "react";
import { Chip } from "@/components/ui/Chip";

function FailedJobTags() {
  const title = "불합격 공고들은 이런 특징이 있어요.";
  const subtitle = "불합격 공고의 공통점을 분석한 결과예요.";

  const tags = [
    "대기업",
    "어학성적 요구",
    "면허증 소유자",
    "3년차 이상",
    "HTML/CSS 기본지식 요구",
  ];

  return (
    <div className="border-border-line flex flex-col border-t pt-9">
      <h3 className="text-24-600 text-text-secondary">{title}</h3>
      <p className="text-16-500 text-text-tertiary mt-2">{subtitle}</p>

      {/* 태그 플렉스 */}
      <div className="mt-8 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Chip key={index} variant="default" className="justify-center">
            {tag}
          </Chip>
        ))}
      </div>
    </div>
  );
}

export default FailedJobTags;
