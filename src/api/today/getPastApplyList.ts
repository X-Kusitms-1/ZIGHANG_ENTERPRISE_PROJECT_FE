import { serverApi, getApiBaseUrl } from "@/api/axios/apiClient";

// API 응답 데이터 타입
export interface PastApplyItem {
  recruitmentId: number;
  companyName: string;
  recruitmentOriginUrl: string;
  depthTwo: string[];
  applyStatus: string;
  createdAt?: string; // 지원 날짜
  number?: string; // 리스트 번호
}

export const getPastApplyList = async (): Promise<PastApplyItem[]> => {
  try {
    const url = `${getApiBaseUrl()}/api/post/apply-history`;
    const response = await serverApi.get<{ data: PastApplyItem[] }>(url);
    console.log(response.data.data, "오늘의 지원 리스트 가져오기");
    return response.data.data;
  } catch (error: any) {
    // 그 외 다른 에러는 그대로 에러 처리
    console.error("Failed to fetch today apply list:", error);
    throw new Error("Failed to fetch today apply list");
  }
};
