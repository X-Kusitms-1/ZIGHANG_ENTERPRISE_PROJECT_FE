"use client";

import { useEffect, useState } from "react";
import { getTodayApplyList } from "@/api/today/getTodayApplyList";
import NowApplyEachComponent from "./NowApplyEachComponent";

export interface ApplyListItem {
  recruitmentId: number;
  number: string;
  companyName: string;
  companyType: string;
  jobTitle: string;
  isApplied: boolean;
}

// API 응답 데이터 타입 (가정)
// TODO: 실제 API 응답 타입에 맞게 수정해야 합니다.
export interface ApiApplyItem {
  recruitmentId: number;
  viewCount: number;
  title: string;
  recruitmentRegion: string;
  minCareer: number;
  maxCareer: number;
  recruitmentEndDate: string | null;
  companyName: string;
  workSummary: string;
  recruitmentOriginUrl: string;
  depthTwo: string[];
  isApplied: boolean;
}

export default function NowApplyList() {
  const [items, setItems] = useState<ApplyListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplyList = async () => {
      try {
        setLoading(true);
        const data = await getTodayApplyList();
        // API 데이터를 UI에 맞는 형태로 변환
        const formattedData = data.map((item:ApiApplyItem, index:number) => ({
          ...item,
          recruitmentId: item.recruitmentId, // API 응답의 recruitmentId 사용
          number: String(index + 1).padStart(2, "0"), // 번호 생성
        }));

        setItems(formattedData);
      } catch (err) {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplyList();
  }, []);

  const handleApplyClick = (item: ApplyListItem) => {
    console.log("Apply clicked for:", item);
    // TODO: 백엔드 API 호출 - 지원하기
    // await applyToJob(item.recruitmentId);
  };

  const handleApplicationStatusChange = (recruitmentId: number, checked: boolean) => {
    // 로컬 상태 업데이트
    setItems((prev) =>
      prev.map((item) =>
        item.recruitmentId === recruitmentId ? { ...item, isApplied: checked } : item
      )
    );

    // TODO: 백엔드 API 호출 - 지원 상태 업데이트
    // await updateApplicationStatus(id, checked);
  };

  if (loading) {
    return (
      <div className="mr-5 flex w-full items-center justify-center rounded-[12px] bg-white p-10">
        <span className="text-12-500 text-text-primary">로딩 중...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mr-5 flex w-full items-center justify-center rounded-[12px] bg-white p-10">
        <span className="text-12-500 text-text-primary">{error}</span>
      </div>
    );
  }

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
      {items.length === 0 ? (
        <div className="10 flex h-[294px] w-full flex-col items-center justify-center gap-1">
          <span className="text-14-500 text-text-tertiary leading-5">
            오늘의 지원 리스트를 생성하지 않았어요.
          </span>
          <span className="text-14-500 text-text-tertiary leading-5">
            지원할 공고 개수를 입력하면 적합한 공고를 추천해드려요.
          </span>
        </div>
      ) : (
        <div className="flex flex-col px-1">
          {items.map((item) => (
            <NowApplyEachComponent
              key={item.recruitmentId}
              item={item}
              onApplyClick={handleApplyClick}
              onApplicationStatusChange={handleApplicationStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
