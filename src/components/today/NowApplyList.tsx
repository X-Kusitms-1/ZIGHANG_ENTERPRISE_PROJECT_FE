"use client";

import { useGetTodayApplyList } from "@/hooks/today/useGetTodayApplyList";
import NowApplyEachComponent from "./NowApplyEachComponent";
import { useGetApplyStatus } from "@/hooks/today/useGetApplyStatus";

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
  number?: string;
}

export default function NowApplyList() {
  const { data, isLoading, refreshTodayApplyList } = useGetTodayApplyList();
  const { refetchApplyStatus} = useGetApplyStatus();

  const handleApplicationStatusChange = (
    recruitmentId: number,
    isApplied: boolean
  ) => {
    import("@/api/today/ChangeApplyStatus").then(({ ChangeApplyStatus }) => {
      // isApplied가 true면 DELETE 요청, false면 POST 요청
      const method = isApplied ? "DELETE" : "POST";
      ChangeApplyStatus(recruitmentId, method)
        .then(() => {
          refreshTodayApplyList();
          refetchApplyStatus();
        })
        .catch((err) => {
          console.error("지원 상태 업데이트 에러:", err);
        });
    });
  };

  if (isLoading) {
    return (
      <div className="10 flex h-[294px] w-full flex-col items-center justify-center gap-1 rounded-[12px]">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-purple-500" />
      </div>
    );
  }

  // number 필드 추가
  const formattedData = data
    ? data.map((item: ApiApplyItem, idx: number) => ({
        ...item,
        number: String(idx + 1).padStart(2, "0"),
      }))
    : [];

  return (
    <div className="mr-5 flex w-full max-w-[836px] flex-col gap-1 rounded-[12px] bg-white pb-1">
      {/* Header Row */}
      <div className="border-border-line flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="flex w-[41px] items-center justify-center px-2.5">
            <span className="text-12-500 text-text-tertiary text-center">
              번호
            </span>
          </div>
          <div className="flex w-[180px] items-center pl-2.5">
            <span className="text-12-500 text-text-tertiary">기업명</span>
          </div>
          <div className="flex w-[180px] items-center pl-2.5">
            <span className="text-12-500 text-text-tertiary">기업 형태</span>
          </div>
          <div className="flex w-[180px] items-center pl-2.5">
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
      {!formattedData || formattedData.length === 0 ? (
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
          {formattedData.map((item: ApiApplyItem) => (
            <NowApplyEachComponent
              key={item.recruitmentId}
              item={item}
              onApplicationStatusChange={handleApplicationStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}
