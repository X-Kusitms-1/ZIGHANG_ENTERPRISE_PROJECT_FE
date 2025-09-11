import { api, getApiBaseUrl, serverApi } from "../axios";
import { CompanyDetailWithNewsResponse } from "../type/company";

export const getCompanyWithNews = async (
  companyId: string
): Promise<CompanyDetailWithNewsResponse> => {
  const url = `${getApiBaseUrl()}/v1/companies/${companyId}`;
  const response = await serverApi.get(url);

  return response.data.data;
};

export const getServerCompanyWithNews = async (
  companyId: string
): Promise<CompanyDetailWithNewsResponse> => {
  const url = `${getApiBaseUrl()}/v1/companies/${companyId}`;
  const response = await api.get(url, {
    cache: "force-cache",
    revalidate: 60 * 24,
  });

  return response.data.data;
};
