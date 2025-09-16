// 지원 상태 변경 API 호출 함수
// recruitmentId를 받아 /api/post/apply로 POST 요청 또는 DELETE 요청
import { serverApi } from "@/api/axios/apiClient";

export async function ChangeApplyStatus(
  recruitmentId: number,
  method: "POST" | "DELETE" = "POST"
) {
  try {
    let res;
    if (method === "DELETE") {
      res = await serverApi.delete("/api/post/apply", {
        data: { recruitmentId },
      });
    } else {
      res = await serverApi.post("/api/post/apply", { recruitmentId });
    }
    return res.data; // 필요에 따라 반환값 처리
  } catch (err) {
    console.error("지원 상태 업데이트 에러:", err);
    throw err;
  }
}
