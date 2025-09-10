"use client";
import { useState } from "react";
import ApplyListMenu from "./ApplyListMenu";
import NowApplyList, { type ApplyListItem } from "./NowApplyList";

// Sample data - replace with actual data from your API
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

export default function ApplyList() {
  const [activeTab, setActiveTab] = useState<"today" | "past">("today");
  const [applyItems, setApplyItems] =
    useState<ApplyListItem[]>(sampleApplyListItems);

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
        <div className="text-text-tertiary py-8 text-center">
          과거 지원 내역이 표시됩니다.
        </div>
      )}
    </div>
  );
}
