import { getApiBaseUrl, serverApi } from "../axios";

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
