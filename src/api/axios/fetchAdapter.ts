import type { AxiosAdapter, AxiosRequestConfig, AxiosResponse } from "axios";

/**
 * Next.js의 fetch 함수를 사용하는 Axios 어댑터
 * Next.js의 캐싱과 revalidation 기능을 활용할 수 있습니다.
 */
type NextFetchRequestInit = RequestInit & {
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

export const fetchAdapter: AxiosAdapter = async (
  config: AxiosRequestConfig
) => {
  const {
    url = "",
    method = "GET",
    data,
    headers = {},
    params,
    timeout = 0,
    ...restConfig
  } = config;

  // URL 파라미터 처리
  const searchParams = new URLSearchParams();
  if (params) {
    Object.keys(params).forEach((key) => {
      if (params[key] !== undefined && params[key] !== null) {
        searchParams.append(key, String(params[key]));
      }
    });
  }

  const queryString = searchParams.toString();
  const finalUrl = queryString ? `${url}?${queryString}` : url;

  // Axios 헤더를 Fetch Headers로 정규화
  const resolvedHeaders = new Headers();
  resolvedHeaders.set("Content-Type", "application/json");
  if (headers) {
    if (headers instanceof Headers) {
      headers.forEach((value, key) => {
        if (value != null) resolvedHeaders.set(key, String(value));
      });
    } else if (Array.isArray(headers)) {
      for (const [key, value] of headers as unknown as [string, any][]) {
        if (value != null) resolvedHeaders.set(key, String(value));
      }
    } else {
      for (const [key, value] of Object.entries(
        headers as Record<string, any>
      )) {
        if (value != null) resolvedHeaders.set(key, String(value));
      }
    }
  }

  // fetch 옵션 구성
  const fetchOptions: NextFetchRequestInit = {
    method: method.toUpperCase(),
    headers: resolvedHeaders,
    // Next.js 캐싱 옵션 (필요에 따라 조정)
    next: {
      revalidate: restConfig.revalidate || false,
      tags: restConfig.tags || [],
    },
    cache: restConfig.cache || "no-store",
  };

  // 요청 바디 처리
  if (data) {
    if (typeof data === "string") {
      fetchOptions.body = data;
    } else if (data instanceof FormData) {
      fetchOptions.body = data;
      // FormData일 때는 Content-Type을 자동으로 설정하도록 제거
      (fetchOptions.headers as Headers).delete("Content-Type");
    } else {
      fetchOptions.body = JSON.stringify(data);
    }
  }

  // 타임아웃 처리
  if (timeout > 0) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    fetchOptions.signal = controller.signal;

    try {
      const response = await fetch(finalUrl, fetchOptions);
      clearTimeout(timeoutId);

      return convertFetchResponseToAxiosResponse(response, config);
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  const response = await fetch(finalUrl, fetchOptions);
  return convertFetchResponseToAxiosResponse(response, config);
};

/**
 * Fetch Response를 Axios Response 형태로 변환
 */
async function convertFetchResponseToAxiosResponse(
  response: Response,
  config: AxiosRequestConfig
): Promise<AxiosResponse> {
  const responseHeaders: Record<string, string> = {};
  response.headers.forEach((value, key) => {
    responseHeaders[key] = value;
  });

  let data: any;
  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    try {
      data = await response.json();
    } catch {
      data = await response.text();
    }
  } else {
    data = await response.text();
  }

  return {
    data,
    status: response.status,
    statusText: response.statusText,
    headers: responseHeaders,
    config,
    request: {
      responseURL: response.url,
    },
  } as AxiosResponse;
}

// Next.js 확장 타입 정의
declare module "axios" {
  interface AxiosRequestConfig {
    revalidate?: number | false;
    tags?: string[];
    cache?: RequestCache;
  }
}
