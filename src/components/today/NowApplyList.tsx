"use client";

import NowApplyEachComponent from "./NowApplyEachComponent";

export interface ApplyListItem {
  id: string;
  number: string;
  companyName: string;
  companyType: string;
  jobTitle: string;
  isApplied: boolean;
}

export interface NowApplyListProps {
  items: ApplyListItem[];
  onApplyClick: (_item: ApplyListItem) => void;
  onApplicationStatusChange: (_id: string, _checked: boolean) => void;
}

export default function NowApplyList({
  items,
  onApplyClick,
  onApplicationStatusChange,
}: NowApplyListProps) {
  return (
    <div className="flex w-full flex-col gap-1 rounded-[12px] bg-white pb-1">
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
            onApplyClick={onApplyClick}
            onApplicationStatusChange={onApplicationStatusChange}
          />
        ))}
      </div>
    </div>
  );
}
