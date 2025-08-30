// 자동 생성된 API 함수들
// 이 파일은 자동으로 생성됩니다. 수동으로 편집하지 마세요.

import { apiClient } from "./axios";
import { EmailControllerApi } from "./generated/api/email-controller-api";
import { ImageControllerApi } from "./generated/api/image-controller-api";
import { KakaoLoginControllerApi } from "./generated/api/kakao-login-controller-api";
import { OcrControllerApi } from "./generated/api/ocr-controller-api";
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

// EmailControllerApi 함수들
/**
 * *
 */
export async function sendEmail(
  options: ApiRequestOptions = {}
) {
  const client = createApiClient(options);
  const api = new EmailControllerApi(undefined, undefined, client);
  const response = await api.sendEmail();
  return response.data;
}


// ImageControllerApi 함수들
/**
 * *
 */
export async function presignedUrl(
  params: { prefix: string, fileName: string },
  options: ApiRequestOptions = {}
) {
  const client = createApiClient(options);
  const api = new ImageControllerApi(undefined, undefined, client);
  const response = await api.presignedUrl(params.prefix, params.fileName);
  return response.data;
}


// KakaoLoginControllerApi 함수들
/**
 * *
 */
export async function kakaoLogin(
  params: { code: string },
  options: ApiRequestOptions = {}
) {
  const client = createApiClient(options);
  const api = new KakaoLoginControllerApi(undefined, undefined, client);
  const response = await api.kakaoLogin(params.code);
  return response.data;
}


// OcrControllerApi 함수들
/**
 * *
 */
export async function ocrByUrl(
  params: { imageUrl: any },
  options: ApiRequestOptions = {}
) {
  const client = createApiClient(options);
  const api = new OcrControllerApi(undefined, undefined, client);
  const response = await api.ocrByUrl(params.imageUrl);
  return response.data;
}

/**
 * *
 */
export async function ocrTextByUrl(
  params: { imageUrl: any },
  options: ApiRequestOptions = {}
) {
  const client = createApiClient(options);
  const api = new OcrControllerApi(undefined, undefined, client);
  const response = await api.ocrTextByUrl(params.imageUrl);
  return response.data;
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


