import { serverApi, getApiBaseUrl } from "@/api/axios/apiClient";

// API 응답 데이터 타입
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

export const getTodayApplyList = async (): Promise<ApiApplyItem[]> => {
  try {
    const url = `${getApiBaseUrl()}/v1/user/today-apply`;
    const response = await serverApi.get<{ data: ApiApplyItem[] }>(url);
    console.log(response.data.data, "오늘의 지원 리스트 가져오기");
    return response.data.data;
  } catch (error: any) {
    // 그 외 다른 에러는 그대로 에러 처리
    console.error("Failed to fetch today apply list:", error);
    throw new Error("Failed to fetch today apply list");
  }
};
