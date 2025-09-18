import { getApiBaseUrl, serverApi } from "../axios";
import { UserAccuracy } from "../type/today";

export const PostUserAccuracy = async (accuracy: {
  question1: string[];
  question2: string[];
  question3: string[];
  question4: string[];
  question5: string[];
  question6: string[];
  question7: string[];
  question8: string[];
  question9: string[];
  question10: string[];
}): Promise<void> => {
  const url = `${getApiBaseUrl()}/v1/user/accuracy`;
  const response = await serverApi.post(url, accuracy);

  return response.data.data;
};

export const getUserAccuracy = async (): Promise<UserAccuracy> => {
  const url = `${getApiBaseUrl()}/v1/user/accuracy`;
  const response = await serverApi.get(url);

  return response.data.data;
};

export const putUserAccuracy = async (accuracy: {
  question1: string[];
  question2: string[];
  question3: string[];
  question4: string[];
  question5: string[];
  question6: string[];
  question7: string[];
}): Promise<void> => {
  const url = `${getApiBaseUrl()}/v1/user/accuracy`;
  const response = await serverApi.put(url, accuracy);

  return response.data.data;
};
