export const KOREAN_TO_COMPANY_TYPE: Record<string, string> = {
  대기업: "LARGE_ENTERPRISE",
  중견기업: "MID_SIZED_ENTERPRISE",
  중소기업: "SMALL_MEDIUM_ENTERPRISE",
  스타트업: "STARTUP",
  유니콘: "UNICORN",
  외국계기업: "FOREIGN_COMPANY",
  "공공기관, 공기업": "PUBLIC_OR_STATE_OWNED",
  금융권: "FINANCIAL_SERVICES",
  기타: "OTHER",
};

export const KOREAN_TO_JOB_GROUP: Record<string, string> = {
  개발: "SOFTWARE_ENGINEERING",
  "데이터/AI": "DATA_AI",
  디자인: "DESIGN",
  "기획/PM": "PRODUCT_MANAGEMENT",
  "마케팅/광고/PR": "MARKETING_ADS_PR",
  "영업/세일즈": "SALES_BUSINESS",
  "경영/HR/재무": "BUSINESS_ADMIN_HR",
  "CS/고객지원": "CUSTOMER_SUCCESS_SUPPORT",
  "생산/품질/구매": "MANUFACTURING_QA_PROCUREMENT",
  "물류/운송": "LOGISTICS_TRANSPORT",
  "연구/R&D": "RESEARCH_RND",
  교육: "EDUCATION",
  "의료/바이오": "MEDICAL_BIO",
  "기타 전문직": "OTHER_PROFESSIONALS",
};

export function normalizeKoreanLabel(label: string): string {
  return label.replace(/\s+/g, " ").trim();
}

export function mapCompanyTypes(koreanValues: string[]): string[] {
  return koreanValues
    .map(normalizeKoreanLabel)
    .filter((v) => v !== "전체")
    .map((v) => KOREAN_TO_COMPANY_TYPE[v])
    .filter(Boolean);
}

export function mapJobGroups(koreanValues: string[]): string[] {
  return koreanValues
    .map(normalizeKoreanLabel)
    .filter((v) => v !== "전체")
    .map((v) => KOREAN_TO_JOB_GROUP[v])
    .filter(Boolean);
}

// 광역시/도 매핑
export const REGION_TO_CODE: Record<string, string> = {
  서울: "SEOUL",
  부산: "BUSAN",
  대구: "DAEGU",
  인천: "INCHEON",
  광주: "GWANGJU",
  대전: "DAEJEON",
  울산: "ULSAN",
  세종: "SEJONG",
  경기: "GYEONGGI",
  강원: "GANGWON",
  충북: "CHUNGBUK",
  충남: "CHUNGNAM",
  전북: "JEONBUK",
  전남: "JEONNAM",
  경북: "GYEONGBUK",
  경남: "GYEONGNAM",
  제주: "JEJU",
};

// 시/군/구 매핑 (필요한 것만 우선 등록, 점진 보강)
export const DISTRICT_TO_CODE: Record<string, string> = {
  // 서울
  종로구: "SEOUL_JONGNO_GU",
  중구: "SEOUL_JUNG_GU",
  용산구: "SEOUL_YONGSAN_GU",
  성동구: "SEOUL_SEONGDONG_GU",
  광진구: "SEOUL_GWANGJIN_GU",
  동대문구: "SEOUL_DONGDAEMUN_GU",
  중랑구: "SEOUL_JUNGNANG_GU",
  성북구: "SEOUL_SEONGBUK_GU",
  강북구: "SEOUL_GANGBUK_GU",
  도봉구: "SEOUL_DOBONG_GU",
  노원구: "SEOUL_NOWON_GU",
  은평구: "SEOUL_EUNPYEONG_GU",
  서대문구: "SEOUL_SEODAEMUN_GU",
  마포구: "SEOUL_MAPO_GU",
  양천구: "SEOUL_YANGCHEON_GU",
  강서구: "SEOUL_GANGSEO_GU",
  구로구: "SEOUL_GURO_GU",
  금천구: "SEOUL_GEUMCHEON_GU",
  영등포구: "SEOUL_YEONGDEUNGPO_GU",
  동작구: "SEOUL_DONGJAK_GU",
  관악구: "SEOUL_GWANAK_GU",
  서초구: "SEOUL_SEOCHO_GU",
  강남구: "SEOUL_GANGNAM_GU",
  송파구: "SEOUL_SONGPA_GU",
  강동구: "SEOUL_GANGDONG_GU",

  // 부산 (중복되는 라벨은 광역시 컨텍스트로 구분하므로 실제 변환은 key 조합으로 처리)
  부산중구: "BUSAN_JUNG_GU",
  부산서구: "BUSAN_SEO_GU",
  부산동구: "BUSAN_DONG_GU",
  영도구: "BUSAN_YEONGDO_GU",
  부산진구: "BUSAN_BUSANJIN_GU",
  동래구: "BUSAN_DONGNAE_GU",
  부산남구: "BUSAN_NAM_GU",
  부산북구: "BUSAN_BUK_GU",
  해운대구: "BUSAN_HAEUNDAE_GU",
  사하구: "BUSAN_SAHA_GU",
  금정구: "BUSAN_GEUMJEONG_GU",
  부산강서구: "BUSAN_GANGSEO_GU",
  연제구: "BUSAN_YEONJE_GU",
  수영구: "BUSAN_SUYEONG_GU",
  사상구: "BUSAN_SASANG_GU",
  기장군: "BUSAN_GIJANG_GUN",

  // 인천
  인천중구: "INCHEON_JUNG_GU",
  인천동구: "INCHEON_DONG_GU",
  미추홀구: "INCHEON_MICHIHOL_GU",
  연수구: "INCHEON_YEONSU_GU",
  남동구: "INCHEON_NAMDONG_GU",
  부평구: "INCHEON_BUPYEONG_GU",
  계양구: "INCHEON_GYEYANG_GU",
  인천서구: "INCHEON_SEO_GU",
  강화군: "INCHEON_GANGHWA_GUN",
  옹진군: "INCHEON_ONGJIN_GUN",

  // 광주
  광주동구: "GWANGJU_DONG_GU",
  광주서구: "GWANGJU_SEO_GU",
  광주남구: "GWANGJU_NAM_GU",
  광주북구: "GWANGJU_BUK_GU",
  광산구: "GWANGJU_GWANGSAN_GU",

  // 대전
  대전동구: "DAEJEON_DONG_GU",
  대전중구: "DAEJEON_JUNG_GU",
  대전서구: "DAEJEON_SEO_GU",
  유성구: "DAEJEON_YUSEONG_GU",
  대덕구: "DAEJEON_DAEDEOK_GU",

  // 울산
  울산중구: "ULSAN_JUNG_GU",
  울산남구: "ULSAN_NAM_GU",
  울산동구: "ULSAN_DONG_GU",
  울산북구: "ULSAN_BUK_GU",
  울주군: "ULSAN_ULJU_GUN",

  // 제주
  제주시: "JEJU_JEJU_SI",
  서귀포시: "JEJU_SEOGWIPO_SI",
};

export function mapRegionsToCodes(
  selected: Record<string, string[]>
): string[] {
  // key 예: "지역-서울", "지역-인천" ...
  const codes: string[] = [];
  Object.entries(selected)
    .filter(([key]) => key.startsWith("지역-"))
    .forEach(([key, values]) => {
      const metro = key.split("-")[1];
      const metroCode = REGION_TO_CODE[metro];
      if (!metroCode) return;

      const filtered = values
        .map(normalizeKoreanLabel)
        .filter((v) => v !== "전체");

      if (filtered.length === 0) return;

      filtered.forEach((district) => {
        // 광역시 구/군 중복 라벨 disambiguation: "부산중구" 형태 키 우선, 없으면 일반 키
        const disambiguatedKey = `${metro}${district}`;
        const districtCode =
          DISTRICT_TO_CODE[disambiguatedKey] || DISTRICT_TO_CODE[district];
        if (districtCode) {
          codes.push(districtCode);
        }
      });
    });
  return codes;
}
