import apiClient, { getApiBaseUrl } from "../axios";
import { CompanyDetailWithNewsResponse } from "../type/company";

export const getCompanyWithNews = async (
  companyId: string
): Promise<CompanyDetailWithNewsResponse> => {
  const url = `${getApiBaseUrl()}/v1/companies/${companyId}`;
  const response = await apiClient.get(url);

  return response.data;
};
