import { News } from "./news";

export interface Company {
  id: string;
  companyNameKr: string;
  companyThumbnailUrl: string;
  companyTypeLabel: string;
}

export interface CompanyWithNews {
  company: Company;
  news: News[];
}

export interface CompanyDetailWithNewsResponse {
  company: Company;
  newAll: News[];
  similarCompanies: CompanyWithNews[];
}
