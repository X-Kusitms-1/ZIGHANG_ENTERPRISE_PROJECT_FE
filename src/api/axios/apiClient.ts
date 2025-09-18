import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from "axios";
import { fetchAdapter } from "./fetchAdapter";

/**
 * API 기본 설정
 */
const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 3 * 60000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 세션 기반 인증을 위해 추가
};

// 환경별 API 서버 URL 설정
export const getApiBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_BASE_URL || "";
};

/**
 * Next.js fetch를 사용하는 Axios 클라이언트
 */
export const apiClient: AxiosInstance = axios.create({
  ...API_CONFIG,
  adapter: fetchAdapter,
});

/**
 * 서버 사이드에서 사용하는 일반 Axios 클라이언트 (캐싱 미지원)
 */
export const serverApiClient: AxiosInstance = axios.create(API_CONFIG);

/**
 * 요청 인터셉터
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 인증 토큰 헤더 추가 로직은 세션 방식으로 변경되어 주석 처리
    // const token = getAuthToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    // 요청 로깅 (개발 환경에서만)
    if (process.env.NODE_ENV === "development") {
      console.log(
        `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`
      );
    }

    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

/**
 * 응답 인터셉터
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // 응답 로깅 (개발 환경에서만)
    if (process.env.NODE_ENV === "development") {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    }

    return response;
  },
  (error) => {
    // 에러 처리
    if (error.response) {
      const { status, data } = error.response;

      // 인증 에러 처리
      if (status === 401) {
        handleAuthError();
      }

      // 에러 로깅
      console.error(`❌ API Error: ${status}`, data);
    } else if (error.request) {
      console.error("❌ Network Error:", error.request);
    } else {
      console.error("❌ Request Setup Error:", error.message);
    }

    return Promise.reject(error);
  }
);

/**
 * 서버 사이드 클라이언트에도 동일한 인터셉터 적용
 */
serverApiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 인증 토큰 헤더 추가 로직은 세션 방식으로 변경되어 주석 처리
    // const token = getAuthToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    // 요청 로깅 (개발 환경에서만)
    if (process.env.NODE_ENV === "development") {
      console.log(
        `🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`
      );
    }

    return config;
  },
  (error) => {
    console.error("❌ Request Error:", error);
    return Promise.reject(error);
  }
);

serverApiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // 응답 로깅 (개발 환경에서만)
    if (process.env.NODE_ENV === "development") {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    }

    return response;
  },
  (error) => {
    // 에러 처리
    if (error.response) {
      const { status, data } = error.response;

      // 인증 에러 처리
      if (status === 401) {
        handleAuthError();
      }

      // 에러 로깅
      console.error(`❌ API Error: ${status}`, data);
    } else if (error.request) {
      console.error("❌ Network Error:", error.request);
    } else {
      console.error("❌ Request Setup Error:", error.message);
    }

    return Promise.reject(error);
  }
);

/**
 * 인증 토큰 가져오기 (구현 필요)
 */
// function getAuthToken(): string | null {
//   // 쿠키, 로컬스토리지, 세션스토리지 등에서 토큰 가져오기
//   if (typeof window !== "undefined") {
//     return localStorage.getItem("authToken");
//   }
//   return null;
// }

/**
 * 인증 에러 처리 (구현 필요)
 */
function handleAuthError(): void {
  // 세션 방식에서는 토큰 제거 불필요, 필요시 로그인 페이지로 리다이렉트만 사용
  // if (typeof window !== "undefined") {
  //   localStorage.removeItem("authToken");
  //   // window.location.href = '/login';
  // }
}

/**
 * API 요청 헬퍼 함수들
 */
export const api = {
  /**
   * GET 요청
   */
  get: <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return apiClient.get(url, config);
  },

  /**
   * POST 요청
   */
  post: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return apiClient.post(url, data, config);
  },

  /**
   * PUT 요청
   */
  put: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return apiClient.put(url, data, config);
  },

  /**
   * PATCH 요청
   */
  patch: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return apiClient.patch(url, data, config);
  },

  /**
   * DELETE 요청
   */
  delete: <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return apiClient.delete(url, config);
  },
};

/**
 * 서버 사이드 API 요청 헬퍼
 */
export const serverApi = {
  get: <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return serverApiClient.get(url, config);
  },
  post: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return serverApiClient.post(url, data, config);
  },
  put: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return serverApiClient.put(url, data, config);
  },
  patch: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return serverApiClient.patch(url, data, config);
  },
  delete: <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> => {
    return serverApiClient.delete(url, config);
  },
};
