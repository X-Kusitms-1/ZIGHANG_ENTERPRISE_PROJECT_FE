import React from "react";
import CompanyInfo from "@/components/news/CompanyInfo";
import NewsCard from "@/components/news/NewsCard";
import { CompanyWithNews } from "@/api/type/company";

interface SimilarCompaniesGridProps {
  companies: CompanyWithNews[];
}

export default function SimilarCompaniesGrid({
  companies,
}: SimilarCompaniesGridProps) {
  return (
    <div className="max-tablet:grid-cols-2 mt-6 grid grid-cols-3 gap-4">
      {companies.map((companyWithNews) => (
        <div
          key={companyWithNews.company.id}
          className="flex flex-col space-y-4"
        >
          <CompanyInfo
            variant="company"
            companyInfo={companyWithNews.company}
          />
          {companyWithNews.news.slice(0, 3).map((news, index) => (
            <NewsCard
              key={`${companyWithNews.company.id}-${index}`}
              newsCard={news}
              variant={index === 1 || index === 2 ? "text" : "main"}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
