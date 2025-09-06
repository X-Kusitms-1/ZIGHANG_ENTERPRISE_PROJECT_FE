"use client";

import React from "react";
import { Button } from "@/components/ui/Button";

interface CompanySidebarProps {
  activeSection: string;
  onSectionChange: (_sectionId: string) => void;
}

export default function CompanySidebar({
  activeSection,
  onSectionChange,
}: CompanySidebarProps) {
  const tabs = [
    { id: "all-news", label: "전체 소식", count: "999+" },
    { id: "similar-companies", label: "같은 직군 기업의 소식", count: "999+" },
  ];

  return (
    <>
      {/* PC: 세로 사이드바 */}
      <div className="max-pc:hidden space-y-2">
        <Button
          variant="inversed"
          size="lg"
          className={`w-full justify-start ${
            activeSection === "all-news" ? "bg-gray-100 text-gray-900" : ""
          }`}
          onClick={() => onSectionChange("all-news")}
        >
          전체 소식
        </Button>
        <Button
          variant="inversed"
          size="lg"
          className={`w-full justify-start space-x-2 ${
            activeSection === "similar-companies"
              ? "bg-gray-100 text-gray-900"
              : ""
          }`}
          onClick={() => onSectionChange("similar-companies")}
        >
          같은 직군 기업의 소식
        </Button>
      </div>

      {/* 모바일/태블릿: 가로 탭 */}
      <div className="pc:hidden mt-6">
        <div className="relative border-b">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSectionChange(tab.id)}
                className={`text-16-600 relative flex flex-1 items-center justify-center gap-2 py-4 transition-colors ${
                  activeSection === tab.id
                    ? "text-text-primary"
                    : "text-text-tertiary"
                }`}
              >
                <span className="truncate">{tab.label}</span>
              </button>
            ))}
          </div>
          {/* 동적으로 움직이는 보라색 선 */}
          <div
            className="bg-bg-primary info absolute bottom-0 z-10 h-0.5 transition-all duration-300 ease-in-out"
            style={{
              width: `${100 / tabs.length}%`,
              left: `${(tabs.findIndex((tab) => tab.id === activeSection) * 100) / tabs.length}%`,
            }}
          />
          {/* 전체 탭 영역의 배경 선 (회색) */}
          <div className="bg-border-line absolute right-0 bottom-0 left-0 h-0.5" />
        </div>
      </div>
    </>
  );
}
