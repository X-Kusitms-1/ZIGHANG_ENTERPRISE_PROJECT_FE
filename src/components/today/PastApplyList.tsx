"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PastApplyEachComponent from "./PastApplyEachComponent";

export interface PastApplyListItem {
  id: string;
  status: "대기중" | "합격" | "불합격";
  number: string;
  companyName: string;
  jobTitle: string;
  applicationDate: string;
  files: File[]; // 백엔드에서 제공하는 파일 배열
}

// 지난 지원 리스트용 더미데이터 35개
const samplePastApplyListItems: PastApplyListItem[] = Array.from(
  { length: 35 },
  (_, i) => ({
    id: `past-${i + 1}`,
    status: ["대기중", "합격", "불합격"][i % 3] as "대기중" | "합격" | "불합격",
    number: (i + 1).toString().padStart(2, "0"),
    companyName: `기업명${i + 1}`,
    jobTitle: `직무명${i + 1}`,
    applicationDate: `2024-${((i % 12) + 1).toString().padStart(2, "0")}-${((i % 28) + 1).toString().padStart(2, "0")}`,
    files: i % 3 !== 0 ? [] : [], // 일단 빈 배열로 초기화 (실제로는 백엔드에서 파일 정보 제공)
  })
);

export default function PastApplyList() {
  const [items, setItems] = useState<PastApplyListItem[]>(
    samplePastApplyListItems
  );
  const [currentPage, setCurrentPage] = useState(1);

  // 파일 업로드 시 해당 아이템의 files 배열에 추가
  const handleUploadClick = (item: PastApplyListItem, files: File[]) => {
    setItems((prev) =>
      prev.map((i) =>
        i.id === item.id ? { ...i, files: [...i.files, ...files] } : i
      )
    );
    // TODO: 백엔드 API 호출 - 파일 업로드
    // await uploadFile(item.id, files);
  };

  // 파일 삭제 시 해당 아이템의 files 배열을 빈 배열로 만들기
  const handleFileDeleteClick = (item: PastApplyListItem) => {
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, files: [] } : i))
    );
    // TODO: 백엔드 API 호출 - 파일 삭제
    // await deleteFiles(item.id);
  };
  // 10개씩 페이징
  const itemsPerPage = 10;
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const pagedItems = items.slice(startIdx, endIdx);

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
              onUploadClick={handleUploadClick}
              onDeleteClick={handleFileDeleteClick}
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
