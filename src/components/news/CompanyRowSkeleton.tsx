import React from "react";

interface CompanyRowSkeletonProps {
  count?: number;
}

export default function CompanyRowSkeleton({
  count = 3,
}: CompanyRowSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={`skeleton-${index}`}
          className="max-tablet:flex-col max-tablet:py-0 max-tablet:pb-11 flex w-full gap-6 py-11"
        >
          {/* CompanyInfo 스켈레톤 (main variant) */}
          <div className="max-tablet:flex-row max-tablet:space-x-4 max-tablet:justify-between pc:min-w-[280px] tablet:min-w-[280px] flex animate-pulse flex-col space-y-5">
            {/* 회사 정보 섹션 */}
            <div className="max-tablet:space-x-2 flex space-x-4">
              {/* 회사 로고 */}
              <div className="bg-bg-neutral max-tablet:w-11 max-tablet:h-11 aspect-square h-16 w-16 flex-shrink-0 rounded-[7.5px]" />

              {/* 회사 정보 텍스트 */}
              <div className="flex w-full flex-col justify-center space-y-2">
                <div className="flex justify-between gap-3">
                  <div className="flex space-x-2">
                    {/* 회사명 */}
                    <div className="max-tablet:w-24 h-5 w-32 rounded bg-gray-200" />
                  </div>
                  {/* ChevronRight 아이콘 */}
                  <div className="max-tablet:hidden size-4 rounded bg-gray-200" />
                </div>
                {/* 회사 타입 */}
                <div className="max-tablet:w-16 h-3 w-20 rounded bg-gray-200" />
              </div>
            </div>

            {/* 버튼 섹션 */}
            <div className="max-tablet:w-auto max-tablet:flex max-tablet:justify-start w-full">
              <div className="max-tablet:max-w-[92px] max-tablet:h-[36px] flex h-10 w-full items-center gap-2 rounded bg-gray-200" />
            </div>
          </div>

          {/* NewsCarousel 스켈레톤 */}
          <div className="w-full max-w-[900px] animate-pulse">
            <div className="max-tablet:space-x-2 flex w-full space-x-5">
              {Array.from({ length: 3 }).map((_, newsIndex) => (
                <div
                  key={`news-skeleton-${newsIndex}`}
                  className="max-tablet:max-w-[180px] flex-shrink-0 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="max-tablet:max-w-[180px] flex w-full max-w-[300px] flex-col space-y-4">
                    {/* 뉴스 이미지 */}
                    <div className="min-h-[130px] w-full rounded-[8px] bg-gray-200" />

                    {/* 뉴스 텍스트 */}
                    <div className="flex flex-col gap-2">
                      {/* 뉴스 제목 */}
                      <div className="h-4 w-full rounded bg-gray-200" />
                      <div className="h-4 w-3/4 rounded bg-gray-200" />

                      {/* 뉴스 날짜 */}
                      <div className="h-3 w-16 rounded bg-gray-200" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
