"use client";

import React, { useState, useMemo, useEffect, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryClient } from "@tanstack/react-query";
import NewsCard from "@/components/news/NewsCard";
import {
  useGetCompanyWithNews,
  companyQueryKeys,
} from "@/hooks/news/useGetCompanyWithNews";
import { getCompanyWithNews } from "@/api/news/companyWithNews";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import NewsGridSkeleton from "./NewsGridSkeleton";
import NewsGridError from "./NewsGridError";

interface NewsGridProps {
  companyId: string;
  itemsPerPage?: number;
}

export default function NewsGrid({
  companyId,
  itemsPerPage = 9,
}: NewsGridProps) {
  return (
    <ErrorBoundary fallback={<NewsGridError />}>
      <Suspense fallback={<NewsGridSkeleton itemsPerPage={9} />}>
        <NewsGridInternal companyId={companyId} itemsPerPage={itemsPerPage} />
      </Suspense>
    </ErrorBoundary>
  );
}

function NewsGridInternal({ companyId, itemsPerPage = 9 }: NewsGridProps) {
  const { data } = useGetCompanyWithNews(companyId);
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  const paginatedData = useMemo(() => {
    if (!data?.newAll) return { items: [], totalPages: 0 };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const items = data.newAll.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.newAll.length / itemsPerPage);

    return { items, totalPages };
  }, [data?.newAll, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 현재 페이지의 다음 페이지 프리페칭
  useEffect(() => {
    if (currentPage < paginatedData.totalPages) {
      queryClient.prefetchQuery({
        queryKey: companyQueryKeys.detail(companyId),
        queryFn: () => getCompanyWithNews(companyId),
        staleTime: 1000 * 60 * 5, // 5분
      });
    }
  }, [currentPage, paginatedData.totalPages, companyId, queryClient]);

  const generatePageNumbers = () => {
    const { totalPages } = paginatedData;
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisiblePages - 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  if (!data?.newAll) return null;

  return (
    <>
      <div className="max-tablet:grid-cols-2 mt-6 grid grid-cols-3 gap-x-6 gap-y-10">
        {paginatedData.items.map((news, index) => (
          <NewsCard key={`news-${index}`} newsCard={news} />
        ))}
      </div>

      {paginatedData.totalPages > 0 && (
        <div className="max-pc:my-8 mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {generatePageNumbers().map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => handlePageChange(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  className={
                    currentPage === paginatedData.totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
}
