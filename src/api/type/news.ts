export interface Company {
  id: string;
  companyNameKr: string;
  companyThumbnailUrl: string;
  companyTypeLabel: string;
}

export interface News {
  title: string;
  url: string;
  publishedAt: string;
  thumbnailUrl: string;
}

export interface NewsItem {
  company: Company;
  news: News[];
}

export interface Sort {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
  offset: number;
  sort: Sort[];
}

export interface NewsResponse {
  totalPages: number;
  totalElements: number;
  pageable: Pageable;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  size: number;
  content: NewsItem[];
  number: number;
  sort: Sort[];
  empty: boolean;
}
