import { serverApi } from "../axios";
import { getApiBaseUrl } from "../axios/apiClient";

export async function subscribeCompany(companyId: string) {
  const url = `${getApiBaseUrl()}/v1/subscriptions/${companyId}`;

  const response = await serverApi.post(url);
  return response.data;
}

export async function unsubscribeCompany(companyId: string) {
  const url = `${getApiBaseUrl()}/v1/subscriptions/${companyId}`;
  const response = await serverApi.delete(url);

  return response.data;
}
