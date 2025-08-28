/**
 * 서버 액션에서 API 클라이언트 사용 예시 (Next.js App Router)
 */

"use server";

import { revalidateTag } from "next/cache";
import { serverApi } from "./axios";

/**
 * 사용자 생성 서버 액션
 */
export async function createUserAction(formData: FormData) {
  try {
    const userData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
    };

    // 서버에서 API 호출
    const newUser = await serverApi.post("/users", userData);

    // 관련 캐시 무효화
    revalidateTag("users");

    return { success: true, user: newUser.data };
  } catch (error) {
    console.error("사용자 생성 실패:", error);
    return { success: false, error: "사용자 생성에 실패했습니다" };
  }
}

/**
 * 사용자 업데이트 서버 액션
 */
export async function updateUserAction(userId: string, formData: FormData) {
  try {
    const userData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
    };

    // 서버에서 API 호출
    const updatedUser = await serverApi.put(`/users/${userId}`, userData);

    // 관련 캐시 무효화
    revalidateTag("users");
    revalidateTag(`user-${userId}`);

    return { success: true, user: updatedUser.data };
  } catch (error) {
    console.error("사용자 업데이트 실패:", error);
    return { success: false, error: "사용자 업데이트에 실패했습니다" };
  }
}

/**
 * 사용자 삭제 서버 액션
 */
export async function deleteUserAction(userId: string) {
  try {
    // 서버에서 API 호출
    await serverApi.delete(`/users/${userId}`);

    // 관련 캐시 무효화
    revalidateTag("users");
    revalidateTag(`user-${userId}`);

    return { success: true };
  } catch (error) {
    console.error("사용자 삭제 실패:", error);
    return { success: false, error: "사용자 삭제에 실패했습니다" };
  }
}
