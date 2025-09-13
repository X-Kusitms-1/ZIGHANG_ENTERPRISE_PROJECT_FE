import { serverApi, getApiBaseUrl } from "../axios/apiClient";
import {
  SearchWithNewsTypesEnum,
  SearchWithNewsJobGroupsEnum,
} from "../generated/api/company-controller-api";
import { SubscribedCompaniesWithNewsResponse } from "../type/news";

export async function getNewList({
  types,
  jobGroups,
  regionCodes,
  page = 1,
  size = 10,
  sort = "createdAt,asc",
}: {
  types?: Set<SearchWithNewsTypesEnum>;
  jobGroups?: Set<SearchWithNewsJobGroupsEnum>;
  regionCodes?: Set<string>;
  page?: number;
  size?: number;
  sort?: string;
}) {
  const params = new URLSearchParams();

  const appendRepeated = (key: string, valueSet?: Set<string>) => {
    if (!valueSet || valueSet.size === 0) return;
    for (const v of valueSet) params.append(key, v);
  };

  appendRepeated("types", types as unknown as Set<string>);
  appendRepeated("jobGroups", jobGroups as unknown as Set<string>);
  appendRepeated("regionCodes", regionCodes as unknown as Set<string>);

  if (typeof page === "number") params.set("page", String(page));
  if (typeof size === "number") params.set("size", String(size));
  if (typeof sort === "string" && sort) params.set("sort", sort);

  const url = `${getApiBaseUrl()}/v1/companies?${params.toString()}`;
  const response = await serverApi.get(url, {
    cache: "force-cache",
    revalidate: 60 * 24,
  });

  // API 래퍼 { statusCode, message, data } 중 data만 반환
  return response.data?.data ?? response.data;
}

export async function getSubscribedCompaniesWithNews(): Promise<SubscribedCompaniesWithNewsResponse> {
  const url = `${getApiBaseUrl()}/v1/companies/subscriptions`;
  const response = await serverApi.get(url);

  return response.data ?? response.data;
}
