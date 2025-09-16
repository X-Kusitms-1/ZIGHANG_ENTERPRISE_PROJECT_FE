import React, { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Image from "next/image";
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
      <section className="mt-4 w-full max-w-[1200px] rounded-2xl">
        <Image
          src="/banner/newsBanner.png"
          alt="news-banner"
          width={1200}
          height={1200}
        />
      </section>
      <NewsFilterProvider>
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
