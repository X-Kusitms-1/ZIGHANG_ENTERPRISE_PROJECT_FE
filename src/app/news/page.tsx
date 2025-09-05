import React, { Suspense } from "react";
import { Send } from "lucide-react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import FilterModal from "@/components/widgets/FilterModal";
import { FilterButton } from "@/components/ui/FilterButton";
import { getNewList } from "@/api/news/getNewList";
import TotalNews from "@/components/news/TotalNews";
import CompanyRow from "@/components/news/CompanyRow";
import getQueryClient from "@/utils/getQueryClient";
import TotalNewsSkeleton from "@/components/news/TotalNewsSkeleton";

function NewsPage() {
  const queryClient = getQueryClient();
  const dehydratedState = dehydrate(queryClient);

  const newsData = getNewList({
    page: 0,
    size: 1,
  });

  return (
    <HydrationBoundary state={dehydratedState}>
      <section className="bg-bg-neutral mt-4 flex w-full max-w-[1200px] flex-col justify-center gap-1 rounded-2xl px-8 py-11">
        <p className="text-14-600 text-text-info">기업 소식</p>
        <h2 className="text-24-600 text-text-primary">
          관심 기업의 뉴스레터를 확인해 보세요
        </h2>
      </section>
      <section className="mt-6 flex w-full max-w-[1200px] items-center space-x-2">
        <FilterModal />
        <FilterButton className="gap-1" size="sm">
          <Send />
          소식 받고 있는 기업
        </FilterButton>
      </section>
      <section className="max-tablet:hidden mt-12 w-full max-w-[1200px]">
        <Suspense fallback={<TotalNewsSkeleton />}>
          <TotalNews newsData={newsData} />
        </Suspense>
      </section>
      <section className="max-tablet:mt-12 flex w-full max-w-[1200px] flex-col gap-4">
        <CompanyRow />
      </section>
    </HydrationBoundary>
  );
}

export default NewsPage;
