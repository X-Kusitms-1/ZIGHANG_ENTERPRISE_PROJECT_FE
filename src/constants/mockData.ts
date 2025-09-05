// 실제 API와 동일한 구조에 맞춘 목 데이터
// CompanyInfo(components)에서 기대하는 필드명: companyNameKr, companyThumbnailUrl, companyTypeLabel, isSubscribed
// NewsCard(components)에서 기대하는 필드명: title, url, publishedAt, thumbnailUrl

export interface MockNews {
  title: string;
  url: string;
  publishedAt: string;
  thumbnailUrl: string;
}

export interface MockCompany {
  id: string;
  companyNameKr: string;
  companyThumbnailUrl: string;
  companyTypeLabel: string;
  isSubscribed: boolean;
  news: MockNews[];
}

export const mockCompanyData: MockCompany[] = [
  {
    id: "1",
    companyNameKr: "Viva Republica Inc.",
    companyThumbnailUrl: "/icons/storybook/toss.jpg",
    companyTypeLabel: "중견기업",
    isSubscribed: false,
    news: [
      {
        title: "토스, 새로운 금융 서비스 출시",
        url: "https://example.com/news/1",
        thumbnailUrl: "/news/default.png",
        publishedAt: "2024.01.15",
      },
      {
        title: "토스, 모바일 결제 시스템 업그레이드",
        url: "https://example.com/news/2",
        thumbnailUrl: "/news/default.png",
        publishedAt: "2024.01.14",
      },
      {
        title: "토스, 해외 진출 계획 발표",
        url: "https://example.com/news/3",
        thumbnailUrl: "/news/default.png",
        publishedAt: "2024.01.13",
      },
      {
        title: "토스, 해외 진출 계획 발표",
        url: "https://example.com/news/4",
        thumbnailUrl: "/news/default.png",
        publishedAt: "2024.01.13",
      },
      {
        title: "토스, 해외 진출 계획 발표",
        url: "https://example.com/news/5",
        thumbnailUrl: "/news/default.png",
        publishedAt: "2024.01.13",
      },
      {
        title: "토스, 해외 진출 계획 발표",
        url: "https://example.com/news/6",
        thumbnailUrl: "/news/default.png",
        publishedAt: "2024.01.13",
      },
      {
        title: "토스, 해외 진출 계획 발표",
        url: "https://example.com/news/7",
        thumbnailUrl: "/news/default.png",
        publishedAt: "2024.01.13",
      },
      {
        title: "토스, 해외 진출 계획 발표",
        url: "https://example.com/news/8",
        thumbnailUrl: "/news/default.png",
        publishedAt: "2024.01.13",
      },
      {
        title: "토스, 해외 진출 계획 발표",
        url: "https://example.com/news/9",
        thumbnailUrl: "/news/default.png",
        publishedAt: "2024.01.13",
      },
      {
        title: "토스, 해외 진출 계획 발표",
        url: "https://example.com/news/10",
        thumbnailUrl: "/news/default.png",
        publishedAt: "2024.01.13",
      },
      {
        title: "토스, 해외 진출 계획 발표",
        url: "https://example.com/news/11",
        thumbnailUrl: "/news/default.png",
        publishedAt: "2024.01.13",
      },
      {
        title: "토스, 해외 진출 계획 발표",
        url: "https://example.com/news/12",
        thumbnailUrl: "/news/default.png",
        publishedAt: "2024.01.13",
      },
      {
        title: "토스, 해외 진출 계획 발표",
        url: "https://example.com/news/13",
        thumbnailUrl: "/news/default.png",
        publishedAt: "2024.01.13",
      },
      {
        title: "토스, 해외 진출 계획 발표",
        url: "https://example.com/news/14",
        thumbnailUrl: "/news/default.png",
        publishedAt: "2024.01.13",
      },
      {
        title: "토스, 해외 진출 계획 발표",
        url: "https://example.com/news/15",
        thumbnailUrl: "/news/default.png",
        publishedAt: "2024.01.13",
      },
    ],
  },
  {
    id: "2",
    companyNameKr: "Kakao Corp.",
    companyThumbnailUrl: "/icons/storybook/toss.jpg",
    companyTypeLabel: "대기업",
    isSubscribed: true,
    news: [
      {
        title: "카카오, AI 기술 개발 투자 확대",
        url: "https://example.com/news/21",
        thumbnailUrl: "/news/default.png",
        publishedAt: "2024.01.15",
      },
      {
        title: "카카오톡, 새로운 기능 업데이트",
        url: "https://example.com/news/22",
        thumbnailUrl: "/news/default.png",
        publishedAt: "2024.01.14",
      },
      {
        title: "카카오, 게임 사업 확장",
        url: "https://example.com/news/23",
        thumbnailUrl: "/news/default.png",
        publishedAt: "2024.01.13",
      },
      {
        title: "카카오, 게임 사업 확장",
        url: "https://example.com/news/24",
        thumbnailUrl: "/news/default.png",
        publishedAt: "2024.01.13",
      },
    ],
  },
  {
    id: "3",
    companyNameKr: "Naver Corp.",
    companyThumbnailUrl: "/icons/storybook/toss.jpg",
    companyTypeLabel: "대기업",
    isSubscribed: false,
    news: [
      {
        title: "네이버, 클라우드 서비스 시장 진출",
        url: "https://example.com/news/31",
        thumbnailUrl: "/news/default.png",
        publishedAt: "2024.01.15",
      },
      {
        title: "네이버 지식iN, 새로운 인터페이스 적용",
        url: "https://example.com/news/32",
        thumbnailUrl: "/news/default.png",
        publishedAt: "2024.01.14",
      },
    ],
  },
  {
    id: "4",
    companyNameKr: "Coupang Inc.",
    companyThumbnailUrl: "/icons/storybook/toss.jpg",
    companyTypeLabel: "대기업",
    isSubscribed: true,
    news: [
      {
        title: "쿠팡, 로봇 배송 시스템 도입",
        url: "https://example.com/news/41",
        thumbnailUrl: "/news/default.png",
        publishedAt: "2024.01.15",
      },
      {
        title: "쿠팡, 신선식품 배송 서비스 확대",
        url: "https://example.com/news/42",
        thumbnailUrl: "/news/default.png",
        publishedAt: "2024.01.14",
      },
      {
        title: "쿠팡, 해외 시장 진출 계획",
        url: "https://example.com/news/43",
        thumbnailUrl: "/news/default.png",
        publishedAt: "2024.01.13",
      },
      {
        title: "쿠팡, AI 추천 시스템 개선",
        url: "https://example.com/news/44",
        thumbnailUrl: "/news/default.png",
        publishedAt: "2024.01.12",
      },
    ],
  },
  {
    id: "5",
    companyNameKr: "당근마켓",
    companyThumbnailUrl: "/icons/storybook/toss.jpg",
    companyTypeLabel: "스타트업",
    isSubscribed: false,
    news: [
      {
        title: "당근마켓, 중고거래 플랫폼 혁신",
        url: "https://example.com/news/51",
        thumbnailUrl: "/news/default.png",
        publishedAt: "2024.01.15",
      },
      {
        title: "당근마켓, 지역 커뮤니티 기능 강화",
        url: "https://example.com/news/52",
        thumbnailUrl: "/news/default.png",
        publishedAt: "2024.01.14",
      },
    ],
  },
  {
    id: "6",
    companyNameKr: "토스증권",
    companyThumbnailUrl: "/icons/storybook/toss.jpg",
    companyTypeLabel: "금융기관",
    isSubscribed: true,
    news: [
      {
        title: "매우 긴 뉴스 제목이 들어갈 때의 레이아웃 테스트 샘플",
        url: "https://example.com/news/61",
        thumbnailUrl: "/news/default.png",
        publishedAt: "2024.01.15",
      },
      {
        title: "토스증권, 새로운 투자 상품 출시",
        url: "https://example.com/news/62",
        thumbnailUrl: "/news/default.png",
        publishedAt: "2024.01.14",
      },
    ],
  },
];
// 선택 유틸: 특정 회사의 뉴스
export const getCompanyNews = (companyId: string) => {
  const company = mockCompanyData.find((c) => c.id === companyId);
  if (!company) return [] as MockNews[];
  return company.news;
};
