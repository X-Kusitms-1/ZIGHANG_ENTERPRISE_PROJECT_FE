"use client";

import React from "react";

function ImprovementSuggestions() {
  const title = "이런 부분을 더 준비하면 좋아요.";
  const subtitle = "불합격 공고의 특징을 바탕으로 준비한 내용이에요.";

  const categories = [
    {
      title: "기술스택",
      items: ["Adobe Illustrator", "HTML 기본지식"],
    },
    {
      title: "어학성적",
      items: ["TOEIC 800+", "TOEIC SPEAKING IH"],
    },
  ];

  return (
    <div className="border-border-line flex flex-col border-t pt-9">
      <h3 className="text-24-600 text-text-secondary">{title}</h3>
      <p className="text-16-500 text-text-tertiary mt-2">{subtitle}</p>

      {/* 카테고리별 제안사항 */}
      <div className="mt-8 space-y-8">
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-8">
            {category.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="flex items-center justify-between gap-6"
              >
                <h4 className="text-14-500 text-text-tertiary min-w-[80px]">
                  {category.title}
                </h4>
                <div className="text-14-500 text-text-secondary">{item}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImprovementSuggestions;
