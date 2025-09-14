import { serverApi, getApiBaseUrl } from "@/api/axios/apiClient";

// TODO: 응답 타입을 실제로 맞게 수정해야 합니다.
export const getTodayApplyList = async () => {
  try {
    const url = `${getApiBaseUrl()}/v1/user/today-apply`;
    const response = await serverApi.get<any>(url);
    console.log(response.data.data, "오늘의 지원 리스트 가져오기");
    return response.data.data;
  } catch (error: any) {
    // 그 외 다른 에러는 그대로 에러 처리
    console.error("Failed to fetch today apply list:", error);
    throw new Error("Failed to fetch today apply list");
  }
};
