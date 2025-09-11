import { useQuery } from "@tanstack/react-query";
import { getCompanyWithNews } from "@/api/news/companyWithNews";
import type { CompanyDetailWithNewsResponse } from "@/api/type/company";

export const companyQueryKeys = {
  detail: (companyId: string, pageId?: number) => [
    "company",
    "detail",
    companyId,
    pageId,
  ],
};

export const useGetCompanyWithNews = (companyId: string, pageId?: number) => {
  return useQuery<CompanyDetailWithNewsResponse>({
    queryKey: companyQueryKeys.detail(companyId, pageId),
    queryFn: () => getCompanyWithNews(companyId),
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5분
  });
};
