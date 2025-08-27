/**
 * 서비스의 api 클라이언트를 사용한 간단한 예시
 */

import { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { api, serverApi, apiClient } from "./axios";

/**
 * 1. 기본 API 호출
 */
export async function basicApiExample() {
  try {
    // GET 요청
    const users = await api.get("/users");
    console.log("사용자 목록:", users.data);

    // POST 요청
    const newUser = await api.post("/users", {
      name: "홍길동",
      email: "hong@example.com",
    });
    console.log("새 사용자:", newUser.data);

    // PUT 요청
    const updatedUser = await api.put("/users/1", {
      name: "김철수",
      email: "kim@example.com",
    });
    console.log("수정된 사용자:", updatedUser.data);

    // DELETE 요청
    await api.delete("/users/1");
    console.log("사용자 삭제 완료");

    return { users, newUser, updatedUser };
  } catch (error) {
    console.error("API 호출 실패:", error);
    throw error;
  }
}

/**
 * 2. Next.js 캐싱과 함께 사용
 */
export async function cachingApiExample() {
  try {
    // 1분간 캐시
    const cachedUsers = await apiClient.get("/users", {
      revalidate: 60,
      tags: ["users"],
      cache: "force-cache",
    });

    // 5분간 캐시, 특정 태그
    const cachedPosts = await apiClient.get("/posts", {
      revalidate: 300,
      tags: ["posts", "content"],
    });

    // 캐시 없이 항상 최신 데이터
    const liveData = await apiClient.get("/live-data", {
      cache: "no-store",
    });

    return { cachedUsers, cachedPosts, liveData };
  } catch (error) {
    console.error("캐싱 API 호출 실패:", error);
    throw error;
  }
}

/**
 * 3. 서버 컴포넌트에서 사용
 */
export async function serverApiExample() {
  try {
    // 서버에서 API 호출
    const serverUsers = await serverApi.get("/users");
    const serverPosts = await serverApi.get("/posts");

    return {
      users: serverUsers.data,
      posts: serverPosts.data,
    };
  } catch (error) {
    console.error("서버 API 호출 실패:", error);
    return {
      users: [],
      posts: [],
    };
  }
}

/**
 * 4. 파일 업로드 예시
 */
export async function uploadFileExample(file: File) {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", "업로드된 파일");

    const response = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("파일 업로드 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("파일 업로드 실패:", error);
    throw error;
  }
}

/**
 * 5. 에러 처리 예시
 */
export async function errorHandlingExample() {
  try {
    const response = await api.get("/users/999"); // 존재하지 않는 사용자
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      switch (error.response?.status) {
        case 404:
          console.log("사용자를 찾을 수 없습니다");
          break;
        case 401:
          console.log("인증이 필요합니다");
          // 자동으로 로그인 페이지로 리다이렉트 (apiClient에서 처리됨)
          break;
        case 403:
          console.log("권한이 없습니다");
          break;
        case 500:
          console.log("서버 오류가 발생했습니다");
          break;
        default:
          console.log("알 수 없는 오류:", error.message);
      }
    }
    throw error;
  }
}

/**
 * 6. React Hook 패턴
 */
export function useApiData<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient.get<T>(url, {
          revalidate: 60,
          tags: [url],
        });

        setData(response.data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "데이터를 가져오는데 실패했습니다"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  const refetch = () => {
    const fetchData = async () => {
      try {
        setError(null);
        const response = await apiClient.get<T>(url, {
          cache: "no-store", // 캐시 없이 최신 데이터
        });
        setData(response.data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "데이터를 가져오는데 실패했습니다"
        );
      }
    };

    fetchData();
  };

  return { data, loading, error, refetch };
}

/**
 * 7. 서버 액션 예시는 별도 파일 참조
 * @see ./server-actions.ts
 */
