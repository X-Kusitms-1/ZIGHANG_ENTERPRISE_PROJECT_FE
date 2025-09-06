import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import CompanyInfo from "@/components/news/CompanyInfo";
import NewsCard from "@/components/news/NewsCard";
import { CompanyWithNews } from "@/api/type/company";
import SimilarCompaniesError from "@/components/news/SimilarCompaniesError";

interface SimilarCompaniesGridProps {
  companies: CompanyWithNews[];
}

export default function SimilarCompaniesGrid({
  companies,
}: SimilarCompaniesGridProps) {
  return (
    <ErrorBoundary fallback={<SimilarCompaniesError />}>
      <div className="max-pc:grid-cols-1 mt-6 grid w-full max-w-[1200px] grid-cols-3 gap-4">
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
    </ErrorBoundary>
  );
}
