import React from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import CompanyInfo from "@/components/news/CompanyInfo";
import getQueryClient from "@/utils/getQueryClient";
import { companyQueryKeys } from "@/hooks/news/useGetCompanyWithNews";
import { getCompanyWithNews } from "@/api/news/companyWithNews";
import CompanyContent from "@/components/news/CompanyContent";
import SimilarCompaniesGrid from "@/components/news/SimilarCompaniesGrid";
import CompanySidebarPC from "@/components/news/CompanySidebarPC";

async function CompanyNewsPage({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;

  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: companyQueryKeys.detail(companyId),
    queryFn: () => getCompanyWithNews(companyId),
  });

  const companyData = await getCompanyWithNews(companyId);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex w-full max-w-[1200px] gap-8">
        <div className="max-pc:hidden relative mt-20 mb-15 w-full max-w-[300px]">
          <div className="max-tablet:hidden sticky top-6 float-left">
            <div className="flex flex-col gap-2">
              <CompanyInfo variant="sub" companyInfo={companyData.company} />
              <div className="mt-10">
                <CompanySidebarPC />
              </div>
            </div>
          </div>
        </div>
        <section
          id="all-news"
          className="max-tablet:ml-0 pc:mt-20 max-pc:mt-6 w-full"
        >
          <CompanyContent companyId={companyId} companyData={companyData} />
          <div
            id="similar-companies"
            className="max-pc:hidden mt-15 w-full max-w-[900px]"
          >
            <h3 className="text-24-600 text-text-secondary">
              같은 금융권 기업의 소식을 보여드릴까요?
            </h3>
            <SimilarCompaniesGrid companies={companyData.similarCompanies} />
          </div>
        </section>
      </div>
    </HydrationBoundary>
  );
}

export default CompanyNewsPage;
