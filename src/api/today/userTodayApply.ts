import { getApiBaseUrl, serverApi } from "../axios";

import { UserTodayApply } from "../type/today";

export const getUserTodayApply = async (): Promise<UserTodayApply[]> => {
  const url = `${getApiBaseUrl()}/api/post/today-apply/recommend`;
  const response = await serverApi.get(url);

  return response.data.data;
};

export const postUserTodayApply = async (
  recruitmentIdList: string[]
): Promise<void> => {
  const url = `${getApiBaseUrl()}/api/post/today-apply`;
  await serverApi.post(url, { recruitmentIdList });
};

export const postApplyCountApi = async (applyCount: number): Promise<void> => {
  const url = "/v1/user/today-apply";
  try {
    await serverApi.post(url, { applyCount });
  } catch (e) {
    console.error("applyCount 전송 실패", e);
  }
};
