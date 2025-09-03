import React from "react";
import { Building2 } from "lucide-react";
import CompanyInfo from "@/components/news/CompanyInfo";
import { mockCompanyData } from "@/constants/mockData";
import NewsCard from "@/components/news/NewsCard";
import { Button } from "@/components/ui/Button";

function CompanyNewsPage() {
  return (
    <div className="max-tablet:flex-col mt-20 mb-15 flex w-full max-w-[1200px] gap-8">
      <section className="flex flex-col gap-4">
        <CompanyInfo variant="sub" companyInfo={mockCompanyData[0]} />
        <Button variant="inversed" size="lg" className="w-full justify-start">
          전체 소식
        </Button>
        <Button
          variant="inversed"
          size="lg"
          className="w-full justify-start space-x-2"
        >
          <Building2 />
          같은 직군 기업의 소식
        </Button>
      </section>
      <section>
        <h2 className="text-24-600 text-text-secondary">전체 소식</h2>
        <div className="max-tablet:grid-cols-2 mt-6 grid grid-cols-3 justify-items-center gap-4">
          {mockCompanyData[0].news.map((news, index) => (
            <NewsCard key={`first-${index}`} newsCard={news} />
          ))}
        </div>
        <div className="max-tablet:hidden mt-15 w-full max-w-[1200px]">
          <h3 className="text-24-600 text-text-secondary">
            같은 금융권 기업의 소식을 보여드릴까요?
          </h3>
          <div className="max-tablet:grid-cols-2 mt-6 grid grid-cols-3 gap-4">
            {mockCompanyData.slice(0, 3).map((company) => (
              <div key={company.id} className="flex flex-col space-y-4">
                <CompanyInfo variant="company" companyInfo={company} />
                {company.news.slice(0, 3).map((news, index) => (
                  <NewsCard
                    key={`${company.id}-${index}`}
                    newsCard={news}
                    variant={index === 1 || index === 2 ? "text" : "main"}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default CompanyNewsPage;
