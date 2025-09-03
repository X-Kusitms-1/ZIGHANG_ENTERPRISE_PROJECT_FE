"use client";

import React, { useMemo } from "react";
import { useGetNewsList } from "@/hooks/news/useGetNewsList";
import { useIntersect } from "@/hooks/useIntersect";
import CompanyInfo from "./CompanyInfo";
import NewsCarousel from "./NewsCarousel";
import type { NewsItem } from "@/api/type/news";

function CompanyRow() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetched } =
    useGetNewsList({ size: 10 });

  const companies: NewsItem[] = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((p) => p.content);
  }, [data]);

  const ref = useIntersect<HTMLDivElement>(
    () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    hasNextPage && !isFetchingNextPage && isFetched
  );

  return (
    <>
      {companies.map((company) => (
        <div
          key={company.company.id}
          className="max-tablet:flex-col max-tablet:py-0 max-tablet:pb-11 flex w-full gap-6 py-11"
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
    </>
  );
}

export default CompanyRow;
