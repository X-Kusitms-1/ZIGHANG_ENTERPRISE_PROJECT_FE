"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import PastApplyEachComponent from "./PastApplyEachComponent";

export interface PastApplyListItem {
  id: string;
  status: "대기중" | "합격" | "불합격";
  number: string;
  companyName: string;
  jobTitle: string;
  applicationDate: string;
  hasUploadedFile: boolean;
}

export interface PastApplyListProps {
  items: PastApplyListItem[];
  currentPage?: number;
  totalPages?: number;
  onUploadClick: (item: PastApplyListItem) => void;
  onFileManageClick: (item: PastApplyListItem) => void;
  onPageChange?: (page: number) => void;
}

export default function PastApplyList({
  items,
  currentPage = 1,
  totalPages,
  onUploadClick,
  onFileManageClick,
  onPageChange,
}: PastApplyListProps) {
  // 10개씩 페이징
  const itemsPerPage = 10;
  const calculatedTotalPages =
    totalPages ?? Math.ceil(items.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const pagedItems = items.slice(startIdx, endIdx);

  const handlePageClick = (page: number) => {
    if (onPageChange && page !== currentPage) {
      onPageChange(page);
    }
  };

  const handlePrevClick = () => {
    if (onPageChange && currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (onPageChange && currentPage < calculatedTotalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // 페이지 범위 계산 (한 번에 5개씩)
  const getPageRange = () => {
    const maxPagesToShow = 5;
    let startPage =
      Math.floor((currentPage - 1) / maxPagesToShow) * maxPagesToShow + 1;
    let endPage = Math.min(
      startPage + maxPagesToShow - 1,
      calculatedTotalPages
    );

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
            <div className="flex w-[100px] items-center px-2.5">
              <span className="text-center text-xs leading-4 font-medium text-[#686D79]">
                기업명
              </span>
            </div>
            <div className="flex w-[100px] items-center px-2.5">
              <span className="text-center text-xs leading-4 font-medium text-[#686D79]">
                직무명
              </span>
            </div>
            <div className="flex w-[100px] items-center px-2.5">
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
          {pagedItems.map((item) => (
            <PastApplyEachComponent
              key={item.id}
              item={item}
              onUploadClick={onUploadClick}
              onFileManageClick={onFileManageClick}
            />
          ))}
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
              className={`text-center leading-5 text-14-500 ${
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
          disabled={currentPage === calculatedTotalPages}
        >
          <ChevronRight size={16} color="#2D3139" />
        </button>
      </div>
    </div>
  );
}
