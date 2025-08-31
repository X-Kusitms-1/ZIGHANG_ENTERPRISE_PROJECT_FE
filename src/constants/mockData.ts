// 회사 데이터
export interface CompanyData {
  id: string;
  name: string;
  logo: string;
  companyType: string;
  jobCategory: string;
  location: string;
  isSubscribed: boolean;
  news: NewsItem[];
}

// 뉴스 아이템
export interface NewsItem {
  id: string;
  title: string;
  image: string;
  createdAt: string;
}

export const mockCompanyData: CompanyData[] = [
  {
    id: "1",
    name: "Viva Republica Inc.",
    logo: "/icons/storybook/toss.jpg",
    companyType: "중견기업",
    jobCategory: "프론트엔드 개발자",
    location: "서울 강남구",
    isSubscribed: false,
    news: [
      {
        id: "1-1",
        title: "토스, 새로운 금융 서비스 출시",
        image: "/news/default.png",
        createdAt: "2024.01.15",
      },
      {
        id: "1-2",
        title: "토스, 모바일 결제 시스템 업그레이드",
        image: "/news/default.png",
        createdAt: "2024.01.14",
      },
      {
        id: "1-3",
        title: "토스, 해외 진출 계획 발표",
        image: "/news/default.png",
        createdAt: "2024.01.13",
      },
      {
        id: "1-4",
        title: "토스, 해외 진출 계획 발표",
        image: "/news/default.png",
        createdAt: "2024.01.13",
      },
    ],
  },
  {
    id: "2",
    name: "Kakao Corp.",
    logo: "/icons/storybook/toss.jpg",
    companyType: "대기업",
    jobCategory: "백엔드 개발자",
    location: "경기 성남시",
    isSubscribed: true,
    news: [
      {
        id: "2-1",
        title: "카카오, AI 기술 개발 투자 확대",
        image: "/news/default.png",
        createdAt: "2024.01.15",
      },
      {
        id: "2-2",
        title: "카카오톡, 새로운 기능 업데이트",
        image: "/news/default.png",
        createdAt: "2024.01.14",
      },
      {
        id: "2-3",
        title: "카카오, 게임 사업 확장",
        image: "/news/default.png",
        createdAt: "2024.01.13",
      },
      {
        id: "2-4",
        title: "카카오, 게임 사업 확장",
        image: "/news/default.png",
        createdAt: "2024.01.13",
      },
    ],
  },
  {
    id: "3",
    name: "Naver Corp.",
    logo: "/icons/storybook/toss.jpg",
    companyType: "대기업",
    jobCategory: "풀스택 개발자",
    location: "경기 성남시",
    isSubscribed: false,
    news: [
      {
        id: "3-1",
        title: "네이버, 클라우드 서비스 시장 진출",
        image: "/news/default.png",
        createdAt: "2024.01.15",
      },
      {
        id: "3-2",
        title: "네이버 지식iN, 새로운 인터페이스 적용",
        image: "/news/default.png",
        createdAt: "2024.01.14",
      },
    ],
  },
  {
    id: "4",
    name: "Coupang Inc.",
    logo: "/icons/storybook/toss.jpg",
    companyType: "대기업",
    jobCategory: "DevOps 엔지니어",
    location: "서울 송파구",
    isSubscribed: true,
    news: [
      {
        id: "4-1",
        title: "쿠팡, 로봇 배송 시스템 도입",
        image: "/news/default.png",
        createdAt: "2024.01.15",
      },
      {
        id: "4-2",
        title: "쿠팡, 신선식품 배송 서비스 확대",
        image: "/news/default.png",
        createdAt: "2024.01.14",
      },
      {
        id: "4-3",
        title: "쿠팡, 해외 시장 진출 계획",
        image: "/news/default.png",
        createdAt: "2024.01.13",
      },
      {
        id: "4-4",
        title: "쿠팡, AI 추천 시스템 개선",
        image: "/news/default.png",
        createdAt: "2024.01.12",
      },
    ],
  },
  {
    id: "5",
    name: "당근마켓",
    logo: "/icons/storybook/toss.jpg",
    companyType: "스타트업",
    jobCategory: "모바일 개발자",
    location: "서울 서초구",
    isSubscribed: false,
    news: [
      {
        id: "5-1",
        title: "당근마켓, 중고거래 플랫폼 혁신",
        image: "/news/default.png",
        createdAt: "2024.01.15",
      },
      {
        id: "5-2",
        title: "당근마켓, 지역 커뮤니티 기능 강화",
        image: "/news/default.png",
        createdAt: "2024.01.14",
      },
    ],
  },
  {
    id: "6",
    name: "토스증권",
    logo: "/icons/storybook/toss.jpg",
    companyType: "금융기관",
    jobCategory: "보안 엔지니어",
    location: "서울 강남구",
    isSubscribed: true,
    news: [
      {
        id: "6-1",
        title:
          "매우 긴 뉴스 제목이 들어갈 때의 레이아웃 테스트를 위한 샘플 데이터입니다",
        image: "/news/default.png",
        createdAt: "2024.01.15",
      },
      {
        id: "6-2",
        title: "토스증권, 새로운 투자 상품 출시",
        image: "/news/default.png",
        createdAt: "2024.01.14",
      },
    ],
  },
];

// 기존 인터페이스 호환성을 위한 타입
export interface CompanyInfo {
  id: string;
  name: string;
  logo: string;
  companyType: string;
  jobCategory: string;
  location: string;
  isSubscribed: boolean;
}

export interface NewsCard {
  id: string;
  title: string;
  image: string;
  createdAt: string;
  onClick: () => void;
}

// 변환 함수들
export const getCompanyInfo = (company: CompanyData): CompanyInfo => ({
  id: company.id,
  name: company.name,
  logo: company.logo,
  companyType: company.companyType,
  jobCategory: company.jobCategory,
  location: company.location,
  isSubscribed: company.isSubscribed,
});

export const getNewsCard = (
  newsItem: NewsItem,
  companyName: string
): NewsCard => ({
  id: newsItem.id,
  title: newsItem.title,
  image: newsItem.image,
  createdAt: newsItem.createdAt,
  onClick: () => console.log(`${companyName} 뉴스 클릭: ${newsItem.title}`),
});

// 모든 뉴스를 평면화한 배열
export const getAllNews = (): NewsCard[] => {
  const allNews: NewsCard[] = [];
  mockCompanyData.forEach((company) => {
    company.news.forEach((newsItem) => {
      allNews.push(getNewsCard(newsItem, company.name));
    });
  });
  return allNews.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
};

// 뉴스 데이터 (기존 호환성 - 첫 번째 뉴스만)
export const mockNewsData: NewsCard[] = mockCompanyData.map((company) =>
  getNewsCard(company.news[0], company.name)
);

// 필터링된 데이터 함수들
export const getSubscribedCompanies = () =>
  mockCompanyData.filter((company) => company.isSubscribed);

export const getCompaniesByType = (type: string) =>
  mockCompanyData.filter((company) => company.companyType === type);

export const getRecentNews = (count: number = 3) =>
  getAllNews().slice(0, count);

// 특정 회사의 뉴스 가져오기
export const getCompanyNews = (companyId: string): NewsCard[] => {
  const company = mockCompanyData.find((c) => c.id === companyId);
  if (!company) return [];
  return company.news.map((newsItem) => getNewsCard(newsItem, company.name));
};
