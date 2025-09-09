import { api } from "../axios";

export async function subscribeCompany(companyId: string) {
  const response = await api.post(`/v1/subscriptions/${companyId}`);
  return response.data;
}

export async function unsubscribeCompany(companyId: string) {
  const response = await api.delete(`/v1/subscriptions/${companyId}`);

  return response.data;
}
