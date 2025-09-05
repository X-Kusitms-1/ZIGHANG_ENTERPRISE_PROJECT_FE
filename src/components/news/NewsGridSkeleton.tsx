import React from "react";

interface NewsGridSkeletonProps {
  itemsPerPage?: number;
}

export default function NewsGridSkeleton({
  itemsPerPage = 9,
}: NewsGridSkeletonProps) {
  return (
    <>
      <div className="max-tablet:grid-cols-2 mt-6 grid grid-cols-3 justify-items-center gap-4">
        {Array.from({ length: itemsPerPage }).map((_, index) => (
          <div
            key={`skeleton-${index}`}
            className="w-full max-w-[300px] animate-pulse"
          >
            {/* 이미지 스켈레톤 */}
            <div className="mb-3 aspect-video w-full rounded-lg bg-gray-200" />

            {/* 제목 스켈레톤 */}
            <div className="mb-3 space-y-2">
              <div className="h-4 w-3/4 rounded bg-gray-200" />
              <div className="h-4 w-1/2 rounded bg-gray-200" />
            </div>

            {/* 날짜 스켈레톤 */}
            <div className="h-3 w-1/3 rounded bg-gray-200" />
          </div>
        ))}
      </div>

      {/* 페이지네이션 스켈레톤 */}
      <div className="mt-8 flex justify-center">
        <div className="flex items-center space-x-2">
          <div className="h-9 w-20 animate-pulse rounded bg-gray-200" />
          <div className="h-9 w-9 animate-pulse rounded bg-gray-200" />
          <div className="h-9 w-9 animate-pulse rounded bg-gray-200" />
          <div className="h-9 w-9 animate-pulse rounded bg-gray-200" />
          <div className="h-9 w-20 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </>
  );
}
