"use client";

import { useState, useMemo } from "react";
import { JOB_CATEGORIES } from "@/constants/JobKind";

interface JobRole {
  name: string;
}

interface JobCategory {
  name: string;
  roles: JobRole[];
}

interface JobCategoryGridProps {
  onSelectionChange?: (
    selectedCategories: string[],
    selectedRoles: string[],
    isUndecided: boolean
  ) => void;
}

export default function JobCategoryGrid({
  onSelectionChange,
}: JobCategoryGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<Set<string>>(new Set());
  const [isUndecided, setIsUndecided] = useState(false);

  // 환경변수 대신 상수에서 직무직군 데이터 가져오기
  const jobCategoriesData = JOB_CATEGORIES;

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setSelectedRoles(new Set()); // Clear role selections when changing category
  };

  const handleRoleClick = (roleName: string) => {
    const newSelectedRoles = new Set(selectedRoles);
    if (newSelectedRoles.has(roleName)) {
      newSelectedRoles.delete(roleName);
    } else {
      newSelectedRoles.add(roleName);
    }
    setSelectedRoles(newSelectedRoles);

    if (onSelectionChange) {
      onSelectionChange(
        selectedCategory ? [selectedCategory] : [],
        Array.from(newSelectedRoles),
        isUndecided
      );
    }
  };

  const handleUndecidedChange = () => {
    const newUndecided = !isUndecided;
    setIsUndecided(newUndecided);

    if (onSelectionChange) {
      onSelectionChange(
        selectedCategory ? [selectedCategory] : [],
        Array.from(selectedRoles),
        newUndecided
      );
    }
  };

  const selectedCategoryData = selectedCategory
    ? jobCategoriesData.find((cat) => cat.name === selectedCategory)
    : null;

  return (
    <div className="flex flex-col gap-3 pt-6">
      {/* 전체 레이아웃 컨테이너 */}
      <div className="flex">
        {/* 카테고리(직군) 영역 */}
        <div className="flex h-[480px] w-[200px] p-2">
          <div
            className="flex w-[172px] flex-col gap-2 overflow-y-auto"
            style={{
              scrollbarWidth: "thin",
              // 배경색 제거, thumb만 지정
              scrollbarColor: "#E0E5F0 transparent",
            }}
          >
            {/* Tailwind 기반 커스텀 스크롤바 (웹킷) */}
            <style>{`
              .job-category-scroll::-webkit-scrollbar {
                width: 4px;
                background: transparent;
                border-radius: 6px;
              }
              .job-category-scroll::-webkit-scrollbar-thumb {
                background: #;
                min-height: 76px;
                border-radius: 6px;
              }
              .job-category-scroll::-webkit-scrollbar-button {
                display: none;
                height: 0;
                width: 0;
              }
            `}</style>
            <div className="job-category-scroll">
              {jobCategoriesData.map((category) => (
                <button
                  key={category.name}
                  onClick={() => handleCategoryClick(category.name)}
                  className={`flex h-[40px] w-[172px] items-center px-5 py-2 text-left transition-colors ${
                    selectedCategory === category.name
                      ? "bg-bg-info text-text-info text-16-500 rounded-lg"
                      : "text-text-tertiary text-16-600 hover:bg-bg-base-hovered"
                  }`}
                  style={{
                    fontFamily: "var(--Font-font-family-primary)",
                    fontSize: "var(--Font-Size-Body-Body-M)",
                    fontWeight: "var(--Font-weight-500)",
                    lineHeight: "var(--Font-Line-height-Body-Body-M)",
                    letterSpacing: "var(--Font-letter-spacing-0)",
                  }}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          {/* 카테고리 오른쪽 구분선 */}
          <div className="ml-2 h-[76px] w-1 flex-shrink-0 rounded-full bg-[var(--Color-border-tertiary)]" />
        </div>

        {/* 역할(직무) 영역 */}
        <div className="flex h-[480px] flex-1 p-2">
          <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
            {selectedCategoryData ? (
              <>
                <button
                  onClick={() => {
                    // Select all roles in category
                    const allRoleNames = selectedCategoryData.roles.map(
                      (role) => role.name
                    );
                    setSelectedRoles(new Set(allRoleNames));
                    if (onSelectionChange) {
                      onSelectionChange(
                        [selectedCategory!],
                        allRoleNames,
                        isUndecided
                      );
                    }
                  }}
                  className="text-16-500 flex items-center rounded-lg p-2 pr-4 pl-5 text-left text-[var(--Color-text-disabled)] hover:bg-[var(--Color-bg-neutral-focused)]"
                  style={{
                    fontFamily: "var(--Font-font-family-primary)",
                    fontSize: "var(--Font-Size-Body-Body-M)",
                    fontWeight: "var(--Font-weight-500)",
                    lineHeight: "var(--Font-Line-height-Body-Body-M)",
                    letterSpacing: "var(--Font-letter-spacing-0)",
                  }}
                >
                  전체
                </button>
                {selectedCategoryData.roles.map((role) => (
                  <button
                    key={role.name}
                    onClick={() => handleRoleClick(role.name)}
                    className={`flex items-center rounded-lg p-2 pr-4 pl-5 text-left transition-colors ${
                      selectedRoles.has(role.name)
                        ? "bg-[var(--Color-bg-info)] text-[var(--Color-text-info)]"
                        : "text-[var(--Color-text-disabled)] hover:bg-[var(--Color-bg-neutral-focused)]"
                    } text-16-500`}
                    style={{
                      fontFamily: "var(--Font-font-family-primary)",
                      fontSize: "var(--Font-Size-Body-Body-M)",
                      fontWeight: "var(--Font-weight-500)",
                      lineHeight: "var(--Font-Line-height-Body-Body-M)",
                      letterSpacing: "var(--Font-letter-spacing-0)",
                    }}
                  >
                    {role.name}
                  </button>
                ))}
              </>
            ) : (
              <div className="text-16-500 p-4 text-center text-[var(--Color-text-disabled)]">
                직군을 선택해주세요
              </div>
            )}
          </div>
          {/* 역할 오른쪽 구분선 */}
          <div className="ml-2 h-[76px] w-1 flex-shrink-0 rounded-full bg-[var(--Color-border-tertiary)]" />
        </div>
      </div>

      {/* 미정(아직 선택하지 않음) 옵션 영역 */}
      <div className="flex w-[500px] items-center gap-1 rounded-lg p-2">
        <button
          onClick={handleUndecidedChange}
          className="flex h-5 w-5 items-center justify-center rounded-[var(--border-radius-md)] p-[3px]"
        >
          <div
            className={`flex items-center justify-center rounded-[var(--border-radius-md)] ${
              isUndecided
                ? "bg-[var(--Color-bg-primary)]"
                : "bg-[var(--Color-border-tertiary)]"
            }`}
          >
            {isUndecided && (
              <svg
                width="16"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
              >
                <path
                  d="M13.6895 4.93945L6.86654 11.7624L3.31055 8.20638L4.02279 7.49349L6.86654 10.3372L12.9772 4.22656L13.6895 4.93945Z"
                  fill="white"
                />
              </svg>
            )}
          </div>
        </button>
        <span
          className="text-14-600 text-[var(--Color-text-primary)]"
          style={{
            fontFamily: "var(--Font-font-family-primary)",
            fontSize: "var(--Font-Size-Body-Body-S)",
            fontWeight: "var(--Font-weight-600)",
            lineHeight: "var(--Font-Line-height-Body-Body-S)",
          }}
        >
          직군/직무를 아직 정하지 못했어요.
        </span>
      </div>
    </div>
  );
}
