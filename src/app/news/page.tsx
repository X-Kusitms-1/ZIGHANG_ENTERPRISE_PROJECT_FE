import React, { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import FilterModal from "@/components/widgets/FilterModal";
import FilterBottomSheet from "@/components/widgets/FilterBottomSheet";
import SubscribedFilterButton from "@/components/news/SubscribedFilterButton";
import TotalNews from "@/components/news/TotalNews";
import CompanyRow from "@/components/news/CompanyRow";
import getQueryClient from "@/utils/getQueryClient";
import TotalNewsSkeleton from "@/components/news/TotalNewsSkeleton";
import { NewsFilterProvider } from "@/context/NewsFilterContext";

function NewsPage() {
  const queryClient = getQueryClient();
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NewsFilterProvider>
        <section className="bg-bg-neutral max-pc:px-5 max-pc:py-8 mt-4 flex w-full max-w-[1200px] flex-col justify-center gap-1 rounded-2xl px-8 py-11">
          <p className="text-14-600 text-text-info">기업 소식</p>
          <h2 className="text-24-600 text-text-primary max-pc:text-20-600 max-tablet:text-16-600">
            관심 기업의 뉴스레터를 확인해 보세요
          </h2>
        </section>
        <section className="mt-6 flex w-full max-w-[1200px] items-center space-x-2">
          {/* 모바일/태블릿에서만 바텀시트 필터 표시 */}
          <div className="pc:hidden">
            <FilterBottomSheet />
          </div>
          {/* PC에서만 모달 필터 표시 */}
          <div className="max-pc:hidden">
            <FilterModal />
          </div>
          <SubscribedFilterButton className="gap-1" />
        </section>
        <section className="max-pc:hidden mt-12 w-full max-w-[1200px]">
          <Suspense fallback={<TotalNewsSkeleton />}>
            <TotalNews />
          </Suspense>
        </section>
        <section className="max-pc:mt-12 flex w-full max-w-[1200px] flex-col gap-4">
          <CompanyRow />
        </section>
      </NewsFilterProvider>
    </HydrationBoundary>
  );
}

export default NewsPage;
