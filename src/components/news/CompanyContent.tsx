"use client";

import React, { useState } from "react";
import NewsGrid from "@/components/news/NewsGrid";
import CompanySidebar from "@/components/news/CompanySidebar";
import SimilarCompaniesGrid from "@/components/news/SimilarCompaniesGrid";
import { useGetCompanyWithNews } from "@/hooks/news/useGetCompanyWithNews";
import CompanyInfoContainer from "./CompanyInfoContainer";

interface CompanyContentProps {
  companyId: string;
}

export default function CompanyContent({ companyId }: CompanyContentProps) {
  const [activeSection, setActiveSection] = useState("all-news");

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);

    if (sectionId === "all-news") {
      // 전체 소식 버튼을 누르면 페이지 맨 위로 스크롤
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // 다른 섹션은 해당 섹션으로 스크롤
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const { data: companyData } = useGetCompanyWithNews(companyId);
  if (!companyData) {
    return <></>;
  }

  return (
    <>
      <CompanyInfoContainer
        className="pc:hidden"
        variant="sub"
        companyInfo={companyData.company}
      />
      <div className="pc:hidden">
        <CompanySidebar
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
        />
      </div>

      {/* 탭에 따른 조건부 렌더링 */}
      {activeSection === "all-news" ? (
        <>
          <h2 className="text-24-600 text-text-secondary max-pc:mt-6">
            전체 소식
          </h2>
          <NewsGrid companyId={companyId} />
        </>
      ) : (
        <div id="similar-companies" className="w-full max-w-[900px]">
          <h2 className="text-24-600 text-text-secondary max-pc:mt-6">
            같은 직군 기업의 소식
          </h2>
          <SimilarCompaniesGrid companies={companyData.similarCompanies} />
        </div>
      )}
    </>
  );
}
