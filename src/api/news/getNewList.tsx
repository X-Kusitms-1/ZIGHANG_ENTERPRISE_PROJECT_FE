import { apiClient, getApiBaseUrl } from "../axios/apiClient";
import {
  SearchWithNewsTypesEnum,
  SearchWithNewsJobGroupsEnum,
} from "../generated/api/company-controller-api";

export async function getNewList({
  types,
  jobGroups,
  regionCodes,
  page,
  size,
  sort,
}: {
  types?: Set<SearchWithNewsTypesEnum>;
  jobGroups?: Set<SearchWithNewsJobGroupsEnum>;
  regionCodes?: Set<string>;
  page?: number;
  size?: number;
  sort?: string;
}) {
  const response = await apiClient.get(`${getApiBaseUrl()}/v1/companies`, {
    params: {
      types,
      jobGroups,
      regionCodes,
      page,
      size,
      sort,
    },
  });

  return response.data;
}
