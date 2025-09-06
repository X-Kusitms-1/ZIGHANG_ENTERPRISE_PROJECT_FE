import { useInfiniteQuery } from "@tanstack/react-query";
import { getNewList } from "@/api/news/getNewList";
import type { NewsResponse } from "@/api/type/news";

export type NewsListFilters = {
  // 필요 시 확장
  types?: Parameters<typeof getNewList>[0]["types"];
  jobGroups?: Parameters<typeof getNewList>[0]["jobGroups"];
  regionCodes?: Parameters<typeof getNewList>[0]["regionCodes"];
  size?: number;
  sort?: string;
};

export const newsQueryKeys = {
  all: ["news"] as const,
  list: (filters?: NewsListFilters) => {
    const key = {
      types: filters?.types
        ? Array.from(filters.types as Set<string>).sort()
        : undefined,
      jobGroups: filters?.jobGroups
        ? Array.from(filters.jobGroups as Set<string>).sort()
        : undefined,
      regionCodes: filters?.regionCodes
        ? Array.from(filters.regionCodes as Set<string>).sort()
        : undefined,
      size: filters?.size ?? 10,
      sort: filters?.sort ?? undefined,
    };
    return ["news", "list", key] as const;
  },
};

export const useGetNewsList = (filters?: NewsListFilters) => {
  const pageSize = typeof filters?.size === "number" ? filters.size : undefined;

  return useInfiniteQuery<NewsResponse>({
    queryKey: newsQueryKeys.list({ ...filters, size: pageSize }),
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const res = await getNewList({
        types: filters?.types,
        jobGroups: filters?.jobGroups,
        regionCodes: filters?.regionCodes,
        sort: filters?.sort,
        size: pageSize,
        page: pageParam as number,
      });
      return res;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.last) return undefined;
      return lastPage.number + 1;
    },
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 30,
  });
};
