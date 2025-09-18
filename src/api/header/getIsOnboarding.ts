/**
 * 온보딩 상태 API status 코드만 반환
 * @returns Promise<number> (HTTP status code)
 */
export async function getOnboardingStatus(): Promise<number> {
  try {
    const response = await serverApiClient.get("/v1/user/status");
    return response.status;
  } catch (e: any) {
    if (e?.response?.status) return e.response.status;
    return 0;
  }
}
import { serverApiClient } from "@/api";

/**
 * 온보딩 완료 여부를 반환하는 API 함수
 * @returns Promise<boolean> (true: 온보딩 완료, false: 미완료)
 */
export async function getIsOnboarding(): Promise<boolean> {
  try {
    const response = await serverApiClient.get("/v1/user/status");
    return !!response.data?.data?.isOnboarded;
  } catch (e) {
    console.log("온보딩 정보 가져오기 실패", e);
    return false;
  }
}
