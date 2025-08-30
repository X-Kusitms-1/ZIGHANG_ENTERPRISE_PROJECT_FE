/**
 * API 설정
 */

// 환경별 API 서버 URL 설정
export const getApiBaseUrl = (): string => {
  // 환경 변수에서 API URL 가져오기
  const customUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (customUrl) {
    return customUrl.replace(/\/+$/, "");
  }

  // 환경별 기본값
  const env = process.env.NODE_ENV;

  switch (env) {
    case "development":
      return "http://localhost:8080";
    case "production":
      return "https://prd.ilhaeng.cloud";
    default:
      return "https://stg.ilhaeng.cloud";
  }
};

// API 타임아웃 설정
export const API_TIMEOUT = 30000; // 30초

// API 재시도 설정
export const API_RETRY_CONFIG = {
  retries: 3,
  retryDelay: 1000,
  retryCondition: (error: any) => {
    // 5xx 에러나 네트워크 에러일 때만 재시도
    return error.response?.status >= 500 || !error.response;
  },
};
