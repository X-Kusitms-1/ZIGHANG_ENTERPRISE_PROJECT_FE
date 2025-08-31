"use client";

import React, { useState } from "react";
import { Funnel, Check, X, RotateCw } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { filterData, type FilterOption } from "@/constants/filterData";
import { FilterButton } from "../ui/FilterButton";
import { Chip } from "../ui/Chip";

function FilterModal() {
  const [selectedCategory, setSelectedCategory] = useState<string>("기업 형태");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({
    "기업 형태": [],
    직군: [],
    지역: [],
  });

  // 현재 선택된 카테고리의 데이터 가져오기
  const currentCategoryData = filterData.find(
    (data) => data.title === selectedCategory
  );

  // 현재 표시할 옵션들 (지역의 경우 서브옵션 고려)
  const getCurrentOptions = () => {
    if (!currentCategoryData) return [];

    if (selectedCategory === "지역" && selectedRegion) {
      const regionData = currentCategoryData.options.find(
        (option): option is FilterOption =>
          typeof option === "object" && option.name === selectedRegion
      );
      return regionData?.subOptions || [];
    }

    return currentCategoryData.options;
  };

  // 필터 선택/해제
  const toggleFilter = (value: string) => {
    const categoryKey =
      selectedCategory === "지역" && selectedRegion
        ? `${selectedCategory}-${selectedRegion}`
        : selectedCategory;

    // "전체" 선택 시 모든 옵션 선택/해제 토글
    if (value === "전체") {
      const allOptions = getCurrentOptions()
        .filter((option) => {
          const optionValue = typeof option === "string" ? option : option.name;
          return optionValue !== "전체";
        })
        .map((option) => (typeof option === "string" ? option : option.name));

      const currentSelectedCount = selectedFilters[categoryKey]?.length || 0;
      const isAllSelected = currentSelectedCount === allOptions.length;

      setSelectedFilters((prev) => ({
        ...prev,
        [categoryKey]: isAllSelected ? [] : allOptions, // 모든 것이 선택되어 있으면 해제, 아니면 전체 선택
      }));
      return;
    }

    setSelectedFilters((prev) => ({
      ...prev,
      [categoryKey]: prev[categoryKey]?.includes(value)
        ? prev[categoryKey].filter((item) => item !== value)
        : [...(prev[categoryKey] || []), value],
    }));
  };

  // 필터 초기화
  const resetFilters = () => {
    setSelectedFilters({
      "기업 형태": [],
      직군: [],
      지역: [],
    });
    setSelectedRegion(null);
  };

  // 선택된 필터 개수 계산
  const getTotalSelectedCount = () => {
    return Object.values(selectedFilters).reduce(
      (total, filters) => total + filters.length,
      0
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <FilterButton size="sm">
          <Funnel className="size-3" />
          필터
        </FilterButton>
      </DialogTrigger>
      <DialogContent className="flex h-[680px] max-h-[80vh] min-h-[400px] flex-col gap-0 bg-white p-0 sm:max-w-[635px]">
        <DialogHeader className="flex flex-shrink-0 justify-center border-b px-5 py-6">
          <DialogTitle className="text-18-600">필터 선택</DialogTitle>
        </DialogHeader>
        <div className="flex min-h-0 flex-1">
          {/* 왼쪽 카테고리 목록 */}
          <div className="bg-bg-tertiary w-[180px] flex-shrink-0 p-3">
            <ul className="space-y-2">
              {filterData.map((data) => (
                <li key={data.title}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory(data.title);
                      setSelectedRegion(null);
                    }}
                    className={`text-16-600 h-10 w-full rounded-lg px-3 py-2 text-left transition-[background-color,color] duration-200 ease-in-out ${
                      selectedCategory === data.title
                        ? "bg-bg-base text-text-secondary"
                        : "hover:bg-bg-base text-text-tertiary"
                    }`}
                  >
                    {data.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 오른쪽 옵션 목록 */}
          <div className="min-h-0 flex-1 p-2">
            {/* 지역의 경우 2단계 구조 */}
            {selectedCategory === "지역" ? (
              <div className="flex h-full gap-3">
                {/* 왼쪽: 광역시/도 목록 */}
                <div className="min-h-0 w-[160px]">
                  <ul className="scrollbar-hide h-full space-y-2 overflow-y-auto">
                    {currentCategoryData?.options.map((option, index) => {
                      if (typeof option === "string") return null;
                      return (
                        <li key={index}>
                          <div
                            onClick={() => setSelectedRegion(option.name)}
                            className={`text-16-500 flex h-10 w-full items-center justify-between rounded-lg px-5 py-2 text-left transition-[background-color,color] duration-200 ease-in-out ${
                              selectedRegion === option.name
                                ? "text-text-info bg-bg-info"
                                : "bg-bg-base text-text-tertiary hover:bg-bg-info"
                            }`}
                          >
                            {option.name}
                            {selectedFilters[`지역-${option.name}`]?.length >
                              0 && (
                              <span className="text-16-500 text-text-info">
                                {selectedFilters[`지역-${option.name}`].length}
                              </span>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* 오른쪽: 선택된 지역의 세부지역 목록 */}
                <div className="border-bg-line border-l-solid min-h-0 w-[260px] flex-1 border-l-1 px-2">
                  {selectedRegion ? (
                    <div className="flex h-full flex-col">
                      <div className="scrollbar-hide grid h-full grid-cols-1 gap-2 overflow-y-auto">
                        {getCurrentOptions().map(
                          (option: string | FilterOption, index: number) => {
                            const subRegion =
                              typeof option === "string" ? option : option.name;
                            const categoryKey = `지역-${selectedRegion}`;
                            let isSelected =
                              selectedFilters[categoryKey]?.includes(subRegion);

                            // "전체" 버튼의 경우, 모든 다른 세부지역이 선택되었는지 확인
                            if (subRegion === "전체") {
                              const allOtherRegions = getCurrentOptions()
                                .filter((opt) => {
                                  const optValue =
                                    typeof opt === "string" ? opt : opt.name;
                                  return optValue !== "전체";
                                })
                                .map((opt) =>
                                  typeof opt === "string" ? opt : opt.name
                                );

                              const selectedCount =
                                selectedFilters[categoryKey]?.length || 0;
                              isSelected =
                                selectedCount === allOtherRegions.length;
                            }

                            return (
                              <div
                                key={index}
                                onClick={() => toggleFilter(subRegion)}
                                className={`text-16-500 flex h-10 w-full items-center gap-2 rounded-lg px-5 py-2 transition-colors ${
                                  isSelected
                                    ? "text-text-info bg-bg-info"
                                    : "hover:bg-bg-info bg-bg-base text-text-tertiary"
                                }`}
                              >
                                <span>{subRegion}</span>
                                {isSelected && <Check className="size-4" />}
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <p className="text-gray-500">지역을 선택해주세요</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* 기업 형태, 직군의 경우 기존 구조 */
              <div>
                <div className="flex flex-wrap gap-2">
                  {getCurrentOptions().map(
                    (option: string | FilterOption, index: number) => {
                      const value =
                        typeof option === "string" ? option : option.name;

                      let isSelected =
                        selectedFilters[selectedCategory]?.includes(value);

                      // "전체" 버튼의 경우, 모든 다른 옵션이 선택되었는지 확인
                      if (value === "전체") {
                        const allOtherOptions = getCurrentOptions()
                          .filter((opt) => {
                            const optValue =
                              typeof opt === "string" ? opt : opt.name;
                            return optValue !== "전체";
                          })
                          .map((opt) =>
                            typeof opt === "string" ? opt : opt.name
                          );

                        const selectedCount =
                          selectedFilters[selectedCategory]?.length || 0;
                        isSelected = selectedCount === allOtherOptions.length;
                      }

                      return (
                        <FilterButton
                          key={index}
                          variant="filled"
                          size="lg"
                          selected={isSelected}
                          onClick={() => toggleFilter(value)}
                        >
                          {value}
                        </FilterButton>
                      );
                    }
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 선택된 필터들을 카테고리별로 그룹화하여 표시 */}
        <div className="min-h-[60px] flex-shrink-0 border-t px-6 py-4">
          {getTotalSelectedCount() > 0 ? (
            <div className="flex flex-wrap gap-2">
              {Object.entries(selectedFilters)
                .filter(([, filters]) => filters.length > 0)
                .map(([category, filters]) => {
                  // 카테고리명 정리 (지역-서울 -> 서울)
                  const displayCategory = category.includes("-")
                    ? category.split("-")[1]
                    : category;

                  return (
                    <Chip
                      key={category}
                      variant="default"
                      onClick={() => {
                        setSelectedFilters((prev) => ({
                          ...prev,
                          [category]: [],
                        }));
                      }}
                      aria-label={`${displayCategory} 필터 모두 제거`}
                    >
                      {displayCategory} {filters.length}개
                      <X className="size-3" />
                    </Chip>
                  );
                })}
            </div>
          ) : (
            <div className="flex h-8 items-center justify-center">
              <p className="text-sm text-gray-400">선택된 필터가 없습니다</p>
            </div>
          )}
        </div>

        <DialogFooter className="flex w-full flex-shrink-0 items-center justify-between gap-3 px-6 py-4">
          <Button
            type="button"
            variant="outlined"
            size="lg"
            className="w-[200px] gap-2 p-4"
            onClick={resetFilters}
          >
            <RotateCw className="size-5" />
            초기화
          </Button>
          <Button type="submit" variant="filled" className="w-full" size="lg">
            {getTotalSelectedCount() > 0
              ? `${getTotalSelectedCount()}개 필터로 검색`
              : "전체 결과 보기"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default FilterModal;
