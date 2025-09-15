export interface StepData {
  title: string;
  options: string[];
}

export const stepData: StepData[] = [
  {
    title: "근무 형태 선호",
    options: [
      "전면 출근",
      "하이브리드 근무",
      "전면 재택",
      "교대/교외 근무(영업·현장 등)",
    ],
  },
  {
    title: "학력 조건",
    options: [
      "대학교 재학중",
      "전문대 졸업",
      "(4년제) 학사 졸업",
      "석박사 이상",
    ],
  },
  {
    title: "어학 역량",
    options: [
      "영어 성적 보유 (TOEIC/OPIc/TOEFL 등)",
      "중국어 성적 보유 (HSK 등)",
      "일본어 성적 보유 (JLPT 등)",
      "기타 외국어 성적 보유",
    ],
  },
  {
    title: "자격증 보유",
    options: [
      "데이터/IT 계열 (SQLD, ADSP, 정보처리기사 등)",
      "경영/회계 계열 (CPA, CFA, 세무사 등)",
      "마케팅/PM 계열 (PMP, 구글 애널리틱스 등)",
      "운전면허 및 기타 전문 자격증",
    ],
  },
  {
    title: "필수 제출물 여부",
    options: [
      "포트폴리오",
      "코딩테스트/과제 전형",
      "필기시험/논술 전형",
      "인적성검사",
    ],
  },
  {
    title: "기술/도구 활용 경험",
    options: [
      "디자인 툴 (Figma, Photoshop, Illustrator 등)",
      "개발 언어/프레임워크 (Python, Java, React 등)",
      "데이터/분석 (SQL, R, Excel 등)",
      "마케팅/광고 툴 (GA, Tableau, 광고 플랫폼 등)",
    ],
  },
  {
    title: "기업 규모 선호",
    options: ["스타트업", "중소/중견기업", "대기업", "공기업/공공기관"],
  },
  {
    title: "해외 근무/출장 가능 여부",
    options: [
      "해외 파견/주재 선호",
      "단기 출장 선호",
      "국내 근무만 선호",
      "원격 글로벌 협업 선호",
    ],
  },
  {
    title: "채용 시기·형태",
    options: ["상시 채용", "수시 채용", "인턴십 → 전환형", "정기 공채"],
  },
  {
    title: "급여/연봉 기준",
    options: [
      "2,400만 원 이상",
      "3,000만 원 이상",
      "4,000만 원 이상",
      "5,000만 원 이상",
    ],
  },
];
