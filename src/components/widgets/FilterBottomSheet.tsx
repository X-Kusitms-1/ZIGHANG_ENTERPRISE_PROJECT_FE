"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Funnel, Check, X, RotateCw } from "lucide-react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/Button";
import { filterData, type FilterOption } from "@/constants/filterData";
import { useGetNewsList } from "@/hooks/news/useGetNewsList";
import {
  mapCompanyTypes,
  mapJobGroups,
  mapRegionsToCodes,
  normalizeKoreanLabel,
} from "@/constants/filterMappings";
import { FilterButton } from "../ui/FilterButton";
import { Chip } from "../ui/Chip";

function FilterBottomSheet() {
  const queryClient = useQueryClient();
  const [selectedCategory, setSelectedCategory] = useState<string>("기업 형태");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[];
  }>({
    "기업 형태": [],
    직군: [],
    지역: [],
  });

  const apiFilters = useMemo(() => {
    const companyTypes = mapCompanyTypes(selectedFilters["기업 형태"] || []);
    const jobGroups = mapJobGroups(selectedFilters["직군"] || []);
    const regionCodes = mapRegionsToCodes(selectedFilters);

    return {
      types: companyTypes.length ? (new Set(companyTypes) as any) : undefined,
      jobGroups: jobGroups.length ? (new Set(jobGroups) as any) : undefined,
      regionCodes: regionCodes.length
        ? (new Set(regionCodes) as any)
        : undefined,
      size: 10,
      sort: undefined,
    } as const;
  }, [selectedFilters]);

  const { data: TotalNewData, isFetching } = useGetNewsList(apiFilters);

  // 최소 1초 동안 로딩 유지
  const [delayDone, setDelayDone] = useState(true);
  useEffect(() => {
    setDelayDone(false);
    const t = setTimeout(() => setDelayDone(true), 1000);
    return () => clearTimeout(t);
  }, [selectedFilters]);
  const isLoadingUI = isFetching || !delayDone;

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
    value = normalizeKoreanLabel(value);
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

  // 탭 버튼 렌더링
  const renderTabButton = (title: string) => {
    const isActive = selectedCategory === title;
    const selectedCount = selectedFilters[title]?.length || 0;

    return (
      <button
        key={title}
        type="button"
        onClick={() => {
          setSelectedCategory(title);
          setSelectedRegion(null);
        }}
        className={`text-16-600 relative flex h-12 flex-1 items-center justify-center gap-2 transition-colors ${
          isActive ? "text-text-primary" : "text-text-tertiary"
        }`}
      >
        {title}
        {selectedCount > 0 && (
          <span className="bg-text-primary text-bg-base text-12-500 flex h-5 w-5 items-center justify-center rounded-full">
            {selectedCount}
          </span>
        )}
      </button>
    );
  };

  // 지역의 상위 지역 버튼 렌더링
  const renderRegionButton = (option: FilterOption, index: number) => {
    const isActive = selectedRegion === option.name;
    const selectedCount = selectedFilters[`지역-${option.name}`]?.length || 0;

    return (
      <button
        key={index}
        type="button"
        onClick={() => setSelectedRegion(option.name)}
        className={`text-16-500 flex h-12 w-full items-center justify-between rounded-lg px-4 py-2 text-left transition-colors ${
          isActive
            ? "bg-bg-info text-text-info"
            : "bg-bg-base text-text-tertiary hover:bg-bg-info"
        }`}
      >
        {option.name}
        {selectedCount > 0 && (
          <span className="text-12-500 text-text-info">{selectedCount}</span>
        )}
      </button>
    );
  };

  // 필터 옵션 버튼 렌더링
  const renderFilterOption = (option: string | FilterOption, index: number) => {
    const value = typeof option === "string" ? option : option.name;
    let isSelected = selectedFilters[selectedCategory]?.includes(value);

    // "전체" 버튼의 경우, 모든 다른 옵션이 선택되었는지 확인
    if (value === "전체") {
      const allOtherOptions = getCurrentOptions()
        .filter((opt) => {
          const optValue = typeof opt === "string" ? opt : opt.name;
          return optValue !== "전체";
        })
        .map((opt) => (typeof opt === "string" ? opt : opt.name));

      const selectedCount = selectedFilters[selectedCategory]?.length || 0;
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
  };

  // 지역의 하위 지역 버튼 렌더링
  const renderSubRegionOption = (
    option: string | FilterOption,
    index: number
  ) => {
    const subRegion = typeof option === "string" ? option : option.name;
    const categoryKey = `지역-${selectedRegion}`;
    let isSelected = selectedFilters[categoryKey]?.includes(subRegion);

    // "전체" 버튼의 경우, 모든 다른 세부지역이 선택되었는지 확인
    if (subRegion === "전체") {
      const allOtherRegions = getCurrentOptions()
        .filter((opt) => {
          const optValue = typeof opt === "string" ? opt : opt.name;
          return optValue !== "전체";
        })
        .map((opt) => (typeof opt === "string" ? opt : opt.name));

      const selectedCount = selectedFilters[categoryKey]?.length || 0;
      isSelected = selectedCount === allOtherRegions.length;
    }

    return (
      <button
        key={index}
        type="button"
        onClick={() => toggleFilter(subRegion)}
        className={`text-16-500 flex h-10 w-full items-center gap-2 rounded-lg px-3 py-2 transition-colors ${
          isSelected
            ? "bg-bg-info text-text-info"
            : "bg-bg-base text-text-tertiary hover:bg-bg-info"
        }`}
      >
        <span>{subRegion}</span>
        {isSelected && <Check className="size-4" />}
      </button>
    );
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <FilterButton size="sm">
          <Funnel className="size-3" />
        </FilterButton>
      </DrawerTrigger>
      <DrawerContent className="flex h-[80vh] flex-col bg-white">
        <DrawerHeader className="x-6 flex-shrink-0 py-4">
          <DrawerTitle className="text-18-600 text-text-primary text-left">
            필터 선택
          </DrawerTitle>
        </DrawerHeader>

        {/* 상단 탭 */}
        <div className="flex-shrink-0 px-6 py-2">
          <div className="relative flex">
            {filterData.map((data) => renderTabButton(data.title))}
            <div className="bg-border-line absolute right-0 bottom-0 left-0 h-0.5" />
            <div
              className="bg-text-info absolute bottom-0 h-0.5 transition-all duration-300 ease-in-out"
              style={{
                width: `${100 / filterData.length}%`,
                left: `${(filterData.findIndex((data) => data.title === selectedCategory) * 100) / filterData.length}%`,
              }}
            />
          </div>
        </div>

        {/* 메인 콘텐츠 영역 */}
        <div className="min-h-0 flex-1 overflow-hidden">
          {selectedCategory === "지역" ? (
            <div className="flex h-full">
              {/* 왼쪽: 상위 지역 목록 (40%) */}
              <div className="w-[40%] flex-shrink-0 border-r bg-white p-3">
                <div className="scrollbar-hide h-full space-y-2 overflow-y-auto">
                  {currentCategoryData?.options.map((option, index) => {
                    if (typeof option === "string") return null;
                    return renderRegionButton(option, index);
                  })}
                </div>
              </div>

              {/* 오른쪽: 하위 지역 목록 (60%) */}
              <div className="flex h-full flex-1 flex-col p-3">
                {selectedRegion ? (
                  <div className="scrollbar-hide w-full flex-1 space-y-2 overflow-y-auto">
                    {getCurrentOptions().map((option, index) =>
                      renderSubRegionOption(option, index)
                    )}
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-text-tertiary">지역을 선택해주세요</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* 기업 형태, 직군의 경우 */
            <div className="flex h-full flex-col p-6">
              <div className="scrollbar-hide grid grid-cols-2 gap-2 overflow-y-auto">
                {getCurrentOptions().map((option, index) =>
                  renderFilterOption(option, index)
                )}
              </div>
            </div>
          )}
        </div>

        {/* 선택된 필터 표시 */}
        <div className="flex-shrink-0 px-6 py-2">
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
              <p className="text-14-500 text-text-tertiary">
                선택된 필터가 없습니다
              </p>
            </div>
          )}
        </div>

        <DrawerFooter className="flex flex-shrink-0 flex-row gap-3 px-6 py-4">
          <Button
            type="button"
            variant="outlined"
            size="lg"
            className="w-[120px] gap-2"
            onClick={resetFilters}
          >
            <RotateCw className="size-4" />
            초기화
          </Button>
          <DrawerClose asChild>
            <Button
              type="button"
              variant="filled"
              className="flex-1"
              size="lg"
              disabled={isLoadingUI}
              onClick={() => {
                const f = apiFilters;
                // 1) 필터 키의 캐시에 현재 결과 선반영
                queryClient.setQueryData(
                  [
                    "news",
                    "list",
                    {
                      types: f.types
                        ? Array.from(f.types as Set<string>).sort()
                        : undefined,
                      jobGroups: f.jobGroups
                        ? Array.from(f.jobGroups as Set<string>).sort()
                        : undefined,
                      regionCodes: f.regionCodes
                        ? Array.from(f.regionCodes as Set<string>).sort()
                        : undefined,
                      size: f.size,
                      sort: undefined,
                    },
                  ],
                  TotalNewData
                );

                // 2) CompanyRow에 필터 적용 이벤트 전달
                const payload = {
                  companyTypes: f.types
                    ? Array.from(f.types as Set<string>)
                    : [],
                  jobGroups: f.jobGroups
                    ? Array.from(f.jobGroups as Set<string>)
                    : [],
                  regionCodes: f.regionCodes
                    ? Array.from(f.regionCodes as Set<string>)
                    : [],
                  size: f.size,
                  sort: undefined,
                };
                window.dispatchEvent(
                  new CustomEvent("zighang:apply_filters", { detail: payload })
                );
              }}
            >
              {isLoadingUI
                ? "로딩중..."
                : `${TotalNewData?.pages?.[0]?.totalElements ?? 0}건 소식 보기`}
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default FilterBottomSheet;
