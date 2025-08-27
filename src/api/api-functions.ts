// 자동 생성된 API 함수들
// 이 파일은 자동으로 생성됩니다. 수동으로 편집하지 마세요.

import { apiClient } from "./axios";
import { UserControllerApi } from "./generated/api/user-controller-api";
import type {
  PostUserOnboardingDto,
} from "./generated/models";

export interface ApiRequestOptions {
  token?: string;
  headers?: Record<string, string>;
  cache?: "force-cache" | "no-store";
  revalidate?: number | false;
  tags?: string[];
}

function createApiClient(options: ApiRequestOptions = {}) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const client = apiClient.create({
    ...apiClient.defaults,
    headers: { ...apiClient.defaults.headers, ...headers },
    cache: options.cache,
    revalidate: options.revalidate,
    tags: options.tags,
  });

  return client;
}

// UserControllerApi 함수들
/**
 * *
 */
export async function userOnboardingInfo(
  params: { userOnboardingInfoDto: PostUserOnboardingDto },
  options: ApiRequestOptions = {}
) {
  const client = createApiClient(options);
  const api = new UserControllerApi(undefined, undefined, client);
  const response = await api.postUserOnboardingInfo(params.userOnboardingInfoDto);
  return response.data;
}


