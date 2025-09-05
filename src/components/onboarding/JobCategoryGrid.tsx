"use client";
import { useState } from "react";
import Image from "next/image";
import { Scrollbar } from "react-scrollbars-custom";
import { Checkbox } from "@/components/ui/checkbox";
import { JOB_CATEGORIES } from "@/constants/JobKind";

type JobItem = {
  jobFamily: string;
  role: string;
};

interface JobCategoryGridProps {
  jobList: JobItem[];
  setJobList: React.Dispatch<React.SetStateAction<JobItem[]>>;
  isUndecided: boolean;
  setIsUndecided: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function JobCategoryGrid(props: JobCategoryGridProps) {
  const { jobList, setJobList, isUndecided, setIsUndecided } = props;

  const jobCategoriesData = JOB_CATEGORIES;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    jobCategoriesData.length > 0 ? jobCategoriesData[0].name : null
  );
  // 직군별 선택된 직무를 저장하는 객체
  const [selectedRoles, setSelectedRoles] = useState<{
    [jobFamily: string]: Set<string>;
  }>(
    jobList.length > 0
      ? jobList.reduce(
          (acc, item) => {
            if (!acc[item.jobFamily]) acc[item.jobFamily] = new Set();
            acc[item.jobFamily].add(item.role);
            return acc;
          },
          {} as { [jobFamily: string]: Set<string> }
        )
      : {}
  );

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    // 직군 변경 시 selectedRoles는 그대로 유지
  };

  const handleRoleClick = (roleName: string) => {
    if (!selectedCategory) return;
    const prev = selectedRoles[selectedCategory] || new Set<string>();
    const newSet = new Set<string>();

    if (roleName === "전체") {
      // "전체" 클릭 시
      if (prev.has("전체")) {
        // 이미 "전체"가 선택되어 있으면 해제
      } else {
        // "전체" 선택 시 다른 모든 직무 해제하고 "전체"만 선택
        newSet.add("전체");
      }
    } else {
      // 개별 직무 클릭 시
      if (prev.has(roleName)) {
        // 이미 선택된 직무면 해제
        prev.forEach((role) => {
          if (role !== roleName) newSet.add(role);
        });
      } else {
        // 새로운 직무 선택 시 "전체" 해제하고 기존 개별 직무들과 함께 선택
        prev.forEach((role) => {
          if (role !== "전체") newSet.add(role);
        });
        newSet.add(roleName);
      }
    }

    const newSelectedRoles = { ...selectedRoles, [selectedCategory]: newSet };
    setSelectedRoles(newSelectedRoles);
    // 모든 직군의 선택값을 industryList에 반영
    const allSelected = Object.entries(newSelectedRoles).flatMap(
      ([jobFamily, roles]) =>
        Array.from(roles).map((role) => ({ jobFamily, role }))
    );
    setJobList(allSelected);
  };

  const handleUndecidedChange = () => {
    const newUndecided = !isUndecided;
    setIsUndecided(newUndecided);
    if (newUndecided) {
      setSelectedRoles({});
      setJobList([]);
      setSelectedCategory(null);
    }
  };

  const selectedCategoryData = jobCategoriesData.find(
    (cat) => cat.name === selectedCategory
  );

  return (
    <div className="flex flex-col gap-3 pt-8">
      {/* 전체 레이아웃 컨테이너 */}
      <div className="border-t-border-line border-b-border-line flex border-t border-b">
        {/* 카테고리(직군) 영역 */}
        <div className="flex h-[340px] w-[200px] p-2">
          <div className="flex w-[172px] flex-col gap-2">
            <Scrollbar
              style={{ width: "192px", height: "100%" }}
              thumbXProps={{
                style: {
                  display: "none",
                },
              }}
              thumbYProps={{
                style: {
                  height: "76px",
                  background: "#E0E5F0",
                  width: "4px",
                  borderRadius: "9999px",
                  margin: "0 auto",
                  minHeight: "76px",
                  top: "0",
                },
              }}
              trackYProps={{
                style: {
                  background: "transparent",
                  width: "20px",
                  right: "0px",
                  top: "0",
                  height: "324px",
                  paddingTop: "0",
                },
              }}
              trackXProps={{
                style: {
                  display: "none",
                },
              }}
            >
              <div className="flex w-[172px] flex-col gap-2">
                {jobCategoriesData.map((category) => {
                  const selectedSet = selectedRoles[category.name] || new Set();
                  const isWholeSelected = selectedSet.has("전체");

                  // "전체"가 선택된 경우 해당 직군의 전체 직무 개수 (전체 제외)
                  // "전체"가 선택되지 않은 경우 선택된 개별 직무 개수
                  const selectedCount = isWholeSelected
                    ? category.roles.filter((role) => role.name !== "전체")
                        .length
                    : Array.from(selectedSet).filter((role) => role !== "전체")
                        .length;

                  const isSelectedCategory = selectedCategory === category.name;
                  const hasSelectedRoles = selectedCount > 0;
                  return (
                    <button
                      key={category.name}
                      onClick={() => handleCategoryClick(category.name)}
                      className={`flex h-[40px] items-center justify-between rounded-lg py-2 pr-4 pl-5 text-left transition-colors ${
                        isSelectedCategory
                          ? "bg-bg-info text-text-info text-16-600"
                          : hasSelectedRoles
                            ? "text-text-primary text-16-600 hover:bg-bg-base-hovered"
                            : "text-text-tertiary text-16-500 hover:bg-bg-base-hovered"
                      }`}
                      disabled={isUndecided}
                    >
                      <span>{category.name}</span>
                      {hasSelectedRoles && (
                        <span className="text-16-500 text-text-info">
                          {selectedCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </Scrollbar>
          </div>
        </div>

        {/* 역할(직무) 영역 */}
        <div className="border-l-border-line flex h-[340px] flex-1 border-l p-2">
          <div className="flex flex-col gap-2" style={{ width: "272px" }}>
            <Scrollbar
              style={{ width: "292px", height: "100%" }}
              thumbXProps={{
                style: {
                  display: "none",
                },
              }}
              thumbYProps={{
                style: {
                  height: "76px",
                  background: "#E0E5F0",
                  width: "4px",
                  borderRadius: "9999px",
                  margin: "0 auto",
                  minHeight: "76px",
                  top: "0",
                },
              }}
              trackYProps={{
                style: {
                  background: "transparent",
                  width: "20px",
                  right: "0px",
                  top: "0",
                  height: "324px",
                  paddingTop: "0",
                },
              }}
              trackXProps={{
                style: {
                  display: "none",
                },
              }}
            >
              <div className="flex w-[272px] flex-col gap-2">
                {selectedCategoryData && (
                  <>
                    {selectedCategoryData.roles.map((role) => {
                      const isSelected =
                        selectedCategory !== null &&
                        selectedRoles[selectedCategory]?.has(role.name);
                      return (
                        <button
                          key={role.name}
                          onClick={() => handleRoleClick(role.name)}
                          className={`flex h-10 items-center gap-2 rounded-lg py-2 pr-4 pl-5 text-left transition-colors ${
                            isSelected
                              ? "bg-bg-info text-text-info text-16-600"
                              : "text-text-tertiary hover:bg-bg-base-hovered text-16-500"
                          } `}
                          disabled={isUndecided}
                        >
                          <span>{role.name}</span>
                          {isSelected && (
                            <Image
                              src="/onboarding/check.svg"
                              alt="체크"
                              width={20}
                              height={20}
                            />
                          )}
                        </button>
                      );
                    })}
                  </>
                )}
              </div>
            </Scrollbar>
          </div>
          {/* 역할 오른쪽 구분선 */}
        </div>
      </div>

      {/* 미정(아직 선택하지 않음) 옵션 영역 - shadcn Checkbox 사용 */}
      <div className="flex items-center gap-1 py-2">
        <Checkbox
          checked={isUndecided}
          onCheckedChange={handleUndecidedChange}
          className="border-border-inverse h-[16px] w-[16px] rounded-[4px] border"
          id="undecided-checkbox"
          bgColor="primary"
        />
        <label
          htmlFor="undecided-checkbox"
          className={`text-14 cursor-pointer ${
            isUndecided
              ? "text-text-primary text-14-600"
              : "text-text-tertiary text-14-500"
          }`}
        >
          직군/직무를 아직 정하지 못했어요.
        </label>
      </div>
    </div>
  );
}
