import React from "react";
import { Flame, Send } from "lucide-react";
import FilterModal from "@/components/widgets/FilterModal";
import { FilterButton } from "@/components/ui/FilterButton";
import { mockCompanyData } from "@/constants/mockData";
import NewsCarousel from "@/components/news/NewsCarousel";
import CompanyInfo from "@/components/news/CompanyInfo";

function NewsPage() {
  return (
    <>
      <section className="bg-bg-neutral mt-4 flex w-full max-w-[1200px] flex-col justify-center gap-1 rounded-2xl px-8 py-11">
        <p className="text-14-600 text-text-info">기업 소식</p>
        <h2 className="text-24-600 text-text-primary">
          관심 기업의 뉴스레터를 확인해 보세요
        </h2>
      </section>
      <section className="mt-6 flex w-full max-w-[1200px] items-center space-x-2">
        <FilterModal />
        <FilterButton className="gap-1" size="sm">
          <Flame />
          채용중
        </FilterButton>
        <FilterButton className="gap-1" size="sm">
          <Send />
          소식 받고 있는 기업
        </FilterButton>
      </section>
      <section className="max-tablet:hidden mt-12 w-full max-w-[1200px]">
        <h3 className="text-18-600 text-text-secondary">
          전체 소식 <span className="text-text-info">1000건</span>
        </h3>
      </section>
      <section className="max-tablet:mt-12 flex w-full max-w-[1200px] flex-col gap-4">
        {mockCompanyData.map((company) => (
          <div
            key={company.id}
            className="max-tablet:flex-col max-tablet:py-0 max-tablet:pb-11 flex w-full gap-6 py-11"
          >
            <CompanyInfo
              variant="main"
              key={company.id}
              companyInfo={company}
            />
            <NewsCarousel newsCards={company.news} />
          </div>
        ))}
      </section>
    </>
  );
}

export default NewsPage;
