"use client";

import { useState } from "react";
import NowApplyEachComponent from "./NowApplyEachComponent";

export interface ApplyListItem {
  id: string;
  number: string;
  companyName: string;
  companyType: string;
  jobTitle: string;
  isApplied: boolean;
}

// 더미데이터를 컴포넌트 내부로 이동
const sampleApplyListItems: ApplyListItem[] = [
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

export default function NowApplyList() {
  const [items, setItems] = useState<ApplyListItem[]>(sampleApplyListItems);

  const handleApplyClick = (item: ApplyListItem) => {
    console.log("Apply clicked for:", item);
    // TODO: 백엔드 API 호출 - 지원하기
    // await applyToJob(item.id);
  };

  const handleApplicationStatusChange = (id: string, checked: boolean) => {
    // 로컬 상태 업데이트
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isApplied: checked } : item
      )
    );

    // TODO: 백엔드 API 호출 - 지원 상태 업데이트
    // await updateApplicationStatus(id, checked);
  };
  return (
    <div className="mr-5 flex w-full flex-col gap-1 rounded-[12px] bg-white pb-1">
      {/* Header Row */}
      <div className="border-border-line flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex w-[41px] items-center justify-center px-2.5">
            <span className="text-12-500 text-text-tertiary text-center">
              번호
            </span>
          </div>
          <div className="flex w-[120px] items-center px-2.5">
            <span className="text-12-500 text-text-tertiary">기업명</span>
          </div>
          <div className="flex w-[120px] items-center px-2.5">
            <span className="text-12-500 text-text-tertiary">기업 형태</span>
          </div>
          <div className="flex w-[120px] items-center px-2.5">
            <span className="text-12-500 text-text-tertiary">직무명</span>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex w-20 items-center justify-center px-2.5">
            <span className="text-12-500 text-text-tertiary">지원하기</span>
          </div>
          <div className="flex w-20 items-center justify-center px-2.5">
            <span className="text-12-500 text-text-tertiary text-center">
              지원여부
            </span>
          </div>
        </div>
      </div>

      {/* Data Rows */}
      <div className="flex flex-col px-1">
        {items.map((item) => (
          <NowApplyEachComponent
            key={item.id}
            item={item}
            onApplyClick={handleApplyClick}
            onApplicationStatusChange={handleApplicationStatusChange}
          />
        ))}
      </div>
    </div>
  );
}
