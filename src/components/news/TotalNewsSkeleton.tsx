import React from "react";

export default function TotalNewsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex items-center space-x-2">
        {/* "전체 소식" 텍스트 스켈레톤 */}
        <div className="h-5 w-16 rounded bg-gray-200" />

        {/* 숫자 스켈레톤 */}
        <div className="h-5 w-8 rounded bg-gray-200" />
      </div>
    </div>
  );
}
