"use client";

import React, { useEffect, useMemo } from "react";
import { ErrorBoundary } from "react-error-boundary";
import {
  useGetNewsList,
  useGetSubscribedCompaniesWithNews,
} from "@/hooks/news/useGetNewsList";
import { useIntersect } from "@/hooks/useIntersect";
import { useNewsFilterContext } from "@/context/NewsFilterContext";
import { NewsItem } from "@/api/type/news";
import NewsCarousel from "./NewsCarousel";
import CompanyRowSkeleton from "./CompanyRowSkeleton";
import CompanyRowError from "./CompanyRowError";
import CompanyInfoContainer from "./CompanyInfoContainer";

export default function CompanyRow() {
  const { filters, showSubscribedOnly, setTotalCount } = useNewsFilterContext();

  // 컨텍스트 기반으로 동작하므로 커스텀 이벤트 불필요

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetched } =
    useGetNewsList(filters);

  const { data: subscribedCompaniesWithNews } =
    useGetSubscribedCompaniesWithNews();

  const companies: NewsItem[] = useMemo(() => {
    if (showSubscribedOnly) {
      const subscribed = subscribedCompaniesWithNews?.data;

      if (!subscribed) return [];
      return subscribed;
    }
    if (!data) return [];
    return data.pages.flatMap((p) => p.content);
  }, [data, showSubscribedOnly, subscribedCompaniesWithNews]);

  // 총 개수 업데이트
  useEffect(() => {
    if (showSubscribedOnly) {
      setTotalCount(companies.length);
    } else if (data) {
      const lastPage = data.pages[data.pages.length - 1];
      setTotalCount(lastPage?.totalElements ?? companies.length);
    }
  }, [showSubscribedOnly, companies.length, data, setTotalCount]);

  const ref = useIntersect<HTMLDivElement>(
    () => {
      if (!showSubscribedOnly && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    !showSubscribedOnly && hasNextPage && !isFetchingNextPage
  );

  const isReady = showSubscribedOnly
    ? Boolean(subscribedCompaniesWithNews)
    : isFetched;
  if (!isReady) return <CompanyRowSkeleton />;

  return (
    <ErrorBoundary fallback={<CompanyRowError />}>
      {companies.map((company) => (
        <div
          key={company.company.id}
          className="max-pc:flex-col max-pc:py-0 max-pc:pb-11 flex w-full gap-6 py-11"
        >
          <CompanyInfoContainer variant="main" companyInfo={company.company} />
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
