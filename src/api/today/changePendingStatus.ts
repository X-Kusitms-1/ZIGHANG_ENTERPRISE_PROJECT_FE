import { serverApi } from "@/api/axios/apiClient";

export type PendingStatusCode = "pending" | "passed" | "rejected";

export async function changePendingStatus(
  recruitmentId: number,
  statusCode: PendingStatusCode
) {
  try {
    const response = await serverApi.put("/api/post/apply-status", {
      recruitmentId,
      statusCode,
    });
    return response.data.data;
  } catch (error) {
    console.error("지원 상태 변경 실패:", error);
    throw error;
  }
}
