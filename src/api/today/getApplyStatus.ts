import { serverApi } from "@/api/axios/apiClient";

// TODO: 응답 타입을 실제로 맞게 수정해야 합니다.
export const getApplyStatus = async () => {
  try {
    const response = await serverApi.get<any>("/api/post/apply");
    console.log(response.data.data, "오늘 지원 현황 가져오기");
    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch today apply list:", error);
    throw new Error("Failed to fetch today apply list");
  }
};
