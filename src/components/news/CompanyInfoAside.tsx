"use client";

import React from "react";
import CompanySidebarPC from "@/components/news/CompanySidebarPC";
import { useGetCompanyWithNews } from "@/hooks/news/useGetCompanyWithNews";
import CompanyInfoAsideSkeleton from "./CompanyInfoAsideSkeleton";
import CompanyInfoContainer from "./CompanyInfoContainer";

interface CompanyInfoAsideProps {
  companyId: string;
}

function CompanyInfoAside({ companyId }: CompanyInfoAsideProps) {
  const { data: companyData } = useGetCompanyWithNews(companyId);

  if (!companyData) {
    return <CompanyInfoAsideSkeleton />;
  }

  return (
    <aside className="max-pc:hidden relative mt-20 mb-15 w-full max-w-[300px]">
      <div className="max-tablet:hidden sticky top-6 float-left">
        <div className="flex flex-col gap-2">
          <CompanyInfoContainer
            variant="sub"
            companyInfo={companyData.company}
          />
          <div className="mt-10">
            <CompanySidebarPC />
          </div>
        </div>
      </div>
    </aside>
  );
}

export default CompanyInfoAside;
