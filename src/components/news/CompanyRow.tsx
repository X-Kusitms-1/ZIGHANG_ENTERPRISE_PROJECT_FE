"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useGetNewsList } from "@/hooks/news/useGetNewsList";
import { useIntersect } from "@/hooks/useIntersect";
import CompanyInfo from "./CompanyInfo";
import NewsCarousel from "./NewsCarousel";
import CompanyRowSkeleton from "./CompanyRowSkeleton";
import CompanyRowError from "./CompanyRowError";
import type { NewsItem } from "@/api/type/news";
import type {
  SearchWithNewsJobGroupsEnum,
  SearchWithNewsTypesEnum,
} from "@/api/generated/api/company-controller-api";

export default function CompanyRow() {
  const [filters, setFilters] = useState<{
    types?: Set<SearchWithNewsTypesEnum>;
    jobGroups?: Set<SearchWithNewsJobGroupsEnum>;
    regionCodes?: Set<string>;
    size?: number;
    sort?: string;
  }>({ size: 10 });

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as {
        companyTypes: string[];
        jobGroups: string[];
        regionCodes: string[];
        size?: number;
        sort?: string;
      };
      setFilters({
        types: detail.companyTypes?.length
          ? new Set(detail.companyTypes as unknown as SearchWithNewsTypesEnum[])
          : undefined,
        jobGroups: detail.jobGroups?.length
          ? new Set(
              detail.jobGroups as unknown as SearchWithNewsJobGroupsEnum[]
            )
          : undefined,
        regionCodes: detail.regionCodes?.length
          ? new Set(detail.regionCodes)
          : undefined,
        size: detail.size ?? 10,
        sort: detail.sort,
      });
    };
    window.addEventListener("zighang:apply_filters", handler as EventListener);
    return () =>
      window.removeEventListener(
        "zighang:apply_filters",
        handler as EventListener
      );
  }, []);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetched } =
    useGetNewsList(filters);

  const companies: NewsItem[] = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((p) => p.content);
  }, [data]);

  const ref = useIntersect<HTMLDivElement>(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, hasNextPage && !isFetchingNextPage);

  if (!isFetched) return <CompanyRowSkeleton />;

  return (
    <ErrorBoundary fallback={<CompanyRowError />}>
      {companies.map((company) => (
        <div
          key={company.company.id}
          className="max-pc:flex-col max-pc:py-0 max-pc:pb-11 flex w-full gap-6 py-11"
        >
          <CompanyInfo variant="main" companyInfo={company.company} />
          <NewsCarousel newsCards={company.news} />
        </div>
      ))}

      {/* 무한 스크롤 트리거 */}
      <div
        ref={ref}
        style={{ width: "1px", height: "1px", marginTop: "10px" }}
      />
    </ErrorBoundary>
  );
}
