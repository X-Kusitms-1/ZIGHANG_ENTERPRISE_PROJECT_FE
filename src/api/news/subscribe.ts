import { api } from "../axios";
import { getApiBaseUrl } from "../axios/apiClient";

export async function subscribeCompany(companyId: string) {
  const url = `${getApiBaseUrl()}/v1/subscriptions/${companyId}`;

  const response = await api.post(url);
  return response.data;
}

export async function unsubscribeCompany(companyId: string) {
  const url = `${getApiBaseUrl()}/v1/subscriptions/${companyId}`;
  const response = await api.delete(url);

  return response.data;
}
