"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useGetPastApplyList } from "@/hooks/today/useGetApplyList";
import PastApplyEachComponent from "./PastApplyEachComponent";

export default function PastApplyList() {
  const { data, isLoading } = useGetPastApplyList();
  const items = Array.isArray(data) ? data : [];
  const [currentPage, setCurrentPage] = useState(1);

  // 10개씩 페이징
  const itemsPerPage = 10;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  // number 필드 추가
  const formattedItems = items.map((item: any, idx: number) => ({
    ...item,
    number: String(idx + 1).padStart(2, "0"),
  }));
  const pagedItems = formattedItems.slice(startIdx, endIdx);

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 페이지 범위 계산 (한 번에 5개씩)
  const getPageRange = () => {
    const maxPagesToShow = 5;
    const startPage =
      Math.floor((currentPage - 1) / maxPagesToShow) * maxPagesToShow + 1;
    const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <div className="flex w-full flex-col gap-6 rounded-xl bg-white pb-4">
      {/* Header and Data Container */}
      <div className="flex flex-col gap-1">
        {/* Header Row */}
        <div className="flex items-center justify-between border-b border-[#F1F5F9] px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex w-[68px] items-center justify-center px-2.5">
              <span className="text-center text-xs leading-4 font-medium text-[#686D79]">
                합격여부
              </span>
            </div>
            <div className="flex w-[60px] items-center justify-center px-2.5">
              <span className="text-center text-xs leading-4 font-medium text-[#686D79]">
                번호
              </span>
            </div>
            <div className="flex w-[180px] items-center px-2.5">
              <span className="text-center text-xs leading-4 font-medium text-[#686D79]">
                기업명
              </span>
            </div>
            <div className="flex w-[180px] items-center px-2.5">
              <span className="text-center text-xs leading-4 font-medium text-[#686D79]">
                직무명
              </span>
            </div>
            <div className="flex w-[150px] items-center px-2.5">
              <span className="text-center text-xs leading-4 font-medium text-[#686D79]">
                지원날짜
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex w-[100px] items-center justify-center px-2.5">
              <span className="text-center text-xs leading-4 font-medium text-[#686D79]">
                파일첨부
              </span>
            </div>
          </div>
        </div>

        {/* Data Rows */}
        <div className="flex flex-col px-1">
          {isLoading ? (
            <div className="py-8 text-center text-gray-400">불러오는 중...</div>
          ) : pagedItems.length === 0 ? (
            <div className="py-8 text-center text-gray-400">
              지난 지원 내역이 없습니다.
            </div>
          ) : (
            pagedItems.map((item: any) => (
              <PastApplyEachComponent
                key={item.id || item.recruitmentId}
                item={item}
                // 파일 업로드/삭제 기능은 실제 API에 맞게 구현 필요
              />
            ))
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
        {/* Previous Button */}
        <button
          className="flex h-11 w-11 items-center justify-center gap-2.5 rounded-lg bg-white p-3"
          onClick={handlePrevClick}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={16} color="#2D3139" />
        </button>

        {/* Page Numbers */}
        {getPageRange().map((page) => (
          <button
            key={page}
            className="flex h-8 w-8 flex-col items-center justify-center bg-white"
            onClick={() => handlePageClick(page)}
          >
            <span
              className={`text-14-500 text-center leading-5 ${
                page === currentPage ? "text-[#2D3139]" : "text-[#686D79]"
              }`}
            >
              {page}
            </span>
          </button>
        ))}

        {/* Next Button */}
        <button
          className="flex h-11 w-11 items-center justify-center gap-2.5 rounded-lg bg-white p-3"
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={16} color="#2D3139" />
        </button>
      </div>
    </div>
  );
}
