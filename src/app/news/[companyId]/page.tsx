import React from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import CompanyInfoAside from "@/components/news/CompanyInfoAside";
import getQueryClient from "@/utils/getQueryClient";
import { getServerCompanyWithNews } from "@/api/news/companyWithNews";
import CompanyContent from "@/components/news/CompanyContent";
import SimilarCompaniesGrid from "@/components/news/SimilarCompaniesGrid";

async function CompanyNewsPage({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
  const { companyId } = await params;

  const queryClient = getQueryClient();

  const companyData = await getServerCompanyWithNews(companyId);
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="flex w-full max-w-[1200px] gap-8">
        <CompanyInfoAside companyId={companyId} />
        <section
          id="all-news"
          className="max-tablet:ml-0 pc:mt-20 max-pc:mt-6 w-full"
        >
          <CompanyContent companyId={companyId} />
          <div
            id="similar-companies"
            className="max-pc:hidden mt-15 w-full max-w-[900px]"
          >
            <h3 className="text-24-600 text-text-secondary">
              유사 기업의 소식
            </h3>
            <SimilarCompaniesGrid companies={companyData.similarCompanies} />
          </div>
        </section>
      </div>
    </HydrationBoundary>
  );
}

export default CompanyNewsPage;
