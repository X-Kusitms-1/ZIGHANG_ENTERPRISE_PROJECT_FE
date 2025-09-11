"use client";
import { useState } from "react";
import ApplyListMenu from "./ApplyListMenu";
import NowApplyList, { type ApplyListItem } from "./NowApplyList";
import PastApplyList, { type PastApplyListItem } from "./PastApplyList";

// 오늘 지원 리스트용 더미데이터
const sampleApplyListItems: ApplyListItem[] = [
  // ...기존 데이터 그대로...
  {
    id: "1",
    number: "01",
    companyName: "기업명",
    companyType: "기업 형태",
    jobTitle: "직무명",
    isApplied: false,
  },
  {
    id: "2",
    number: "02",
    companyName: "기업명",
    companyType: "기업 형태",
    jobTitle: "직무명",
    isApplied: false,
  },
  {
    id: "3",
    number: "03",
    companyName: "기업명",
    companyType: "기업 형태",
    jobTitle: "직무명",
    isApplied: true,
  },
  {
    id: "4",
    number: "04",
    companyName: "기업명",
    companyType: "기업 형태",
    jobTitle: "직무명",
    isApplied: true,
  },
  {
    id: "5",
    number: "05",
    companyName: "기업명",
    companyType: "기업 형태",
    jobTitle: "직무명",
    isApplied: true,
  },
  {
    id: "6",
    number: "06",
    companyName: "기업명",
    companyType: "기업 형태",
    jobTitle: "직무명",
    isApplied: true,
  },
  {
    id: "7",
    number: "07",
    companyName: "기업명",
    companyType: "기업 형태",
    jobTitle: "직무명",
    isApplied: true,
  },
  {
    id: "8",
    number: "08",
    companyName:
      "기업명ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴ",
    companyType: "기업 형태",
    jobTitle: "직무명",
    isApplied: true,
  },
];

// 지난 지원 리스트용 더미데이터 30개
const samplePastApplyListItems: PastApplyListItem[] = Array.from(
  { length: 86 },
  (_, i) => ({
    id: `${i + 1}`,
    status: ["대기중", "합격", "불합격"][i % 3] as "대기중" | "합격" | "불합격",
    number: (i + 1).toString().padStart(2, "0"),
    companyName: `기업명${i + 1}`,
    jobTitle: `직무명${i + 1}`,
    applicationDate: `2024-09-${((i % 30) + 1).toString().padStart(2, "0")}`,
    hasUploadedFile: i % 2 === 0,
  })
);

export default function ApplyList() {
  const [activeTab, setActiveTab] = useState<"today" | "past">("today");
  const [applyItems, setApplyItems] =
    useState<ApplyListItem[]>(sampleApplyListItems);
  const [currentPage, setCurrentPage] = useState(1);

  // 지난 지원 리스트용 더미데이터는 상태로 관리하지 않고 바로 사용

  const handleApplyClick = (item: ApplyListItem) => {
    console.log("Apply clicked for:", item);
    // Implement your apply logic here
  };

  const handleApplicationStatusChange = (id: string, checked: boolean) => {
    setApplyItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isApplied: checked } : item
      )
    );
  };

  // 지난 지원 리스트용 파일 첨부/관리 핸들러 예시
  const handleUploadClick = (item: PastApplyListItem) => {
    console.log("Upload clicked for:", item);
  };
  const handleFileManageClick = (item: PastApplyListItem) => {
    console.log("File manage clicked for:", item);
  };

  return (
    <div className="flex flex-col gap-5">
      <ApplyListMenu activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "today" && (
        <NowApplyList
          items={applyItems}
          onApplyClick={handleApplyClick}
          onApplicationStatusChange={handleApplicationStatusChange}
        />
      )}

      {activeTab === "past" && (
        <PastApplyList
          items={samplePastApplyListItems}
          currentPage={currentPage}
          onUploadClick={handleUploadClick}
          onFileManageClick={handleFileManageClick}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
