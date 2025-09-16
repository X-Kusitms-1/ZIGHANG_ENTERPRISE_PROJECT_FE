"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Funnel, Check, X, RotateCw } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { filterData, type FilterOption } from "@/constants/filterData";
import { useGetNewsList } from "@/hooks/news/useGetNewsList";
import {
  mapCompanyTypes,
  mapJobGroups,
  mapRegionsToCodes,
  normalizeKoreanLabel,
} from "@/constants/filterMappings";
import { useNewsFilterContext } from "@/context/NewsFilterContext";
import { FilterButton } from "../ui/FilterButton";
import { Chip } from "../ui/Chip";

// 로컬 스토리지 키
const FILTER_STORAGE_KEY = "newsFilterSettings";

// 로컬 스토리지에 필터 정보 저장
const saveFiltersToStorage = (filters: { [key: string]: string[] }) => {
  try {
    localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(filters));
  } catch (error) {
    console.error("필터 정보 저장 실패:", error);
  }
};

// 로컬 스토리지에서 필터 정보 불러오기
const loadFiltersFromStorage = (): { [key: string]: string[] } | null => {
  try {
    const saved = localStorage.getItem(FILTER_STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error("필터 정보 불러오기 실패:", error);
    return null;
  }
};

function FilterModal() {
  const queryClient = useQueryClient();
  const { setFilters } = useNewsFilterContext();
  const [isOpen, setIsOpen] = useState(false);
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

  // 모달이 열릴 때 로컬 스토리지에서 필터 정보 불러오기
  useEffect(() => {
    if (isOpen) {
      const savedFilters = loadFiltersFromStorage();
      if (savedFilters) {
        setSelectedFilters(savedFilters);

        // 지역 필터가 있는 경우 첫 번째 지역을 선택
        const regionKeys = Object.keys(savedFilters).filter((key) =>
          key.startsWith("지역-")
        );
        if (regionKeys.length > 0) {
          const firstRegion = regionKeys[0].replace("지역-", "");
          setSelectedRegion(firstRegion);
        }
      }
    }
  }, [isOpen]);

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

  // 모달 닫기 처리 (X 버튼으로 닫을 때 필터 초기화)
  const handleModalClose = (open: boolean) => {
    if (!open) {
      // 모달이 닫힐 때 필터 초기화
      resetFilters();
    }
    setIsOpen(open);
  };

  // 선택된 필터 개수 계산
  const getTotalSelectedCount = () => {
    return Object.values(selectedFilters).reduce(
      (total, filters) => total + filters.length,
      0
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleModalClose}>
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
          <div className="min-h-0 flex-1 p-5">
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
              /* 기업 형태, 직군: 2열 그리드로 버튼 배치 */
              <div>
                <div className="grid grid-cols-2 gap-2">
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
                          className="w-full"
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
          <DialogClose asChild>
            <Button
              type="button"
              variant="filled"
              className="w-full"
              size="lg"
              disabled={isLoadingUI}
              onClick={() => {
                const f = apiFilters;
                // 1) 필터 키의 캐시에 현재 결과 선반영 (선택)
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

                // 2) 컨텍스트로 필터 상태 적용
                setFilters({
                  types: f.types as any,
                  jobGroups: f.jobGroups as any,
                  regionCodes: f.regionCodes as any,
                  size: f.size,
                  sort: undefined,
                });

                // 3) 로컬 스토리지에 필터 정보 저장
                saveFiltersToStorage(selectedFilters);
              }}
            >
              {isLoadingUI
                ? "로딩중..."
                : `${TotalNewData?.pages?.[0]?.totalElements ?? 0}건 소식 보기`}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default FilterModal;
