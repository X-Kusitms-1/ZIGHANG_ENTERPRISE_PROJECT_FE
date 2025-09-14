export interface UserTodayApply {
  recruitmentId: string;
  viewCount: string;
  title: string;
  recruitmentRegion: string;
  minCareer: number;
  maxCareer: number;
  recruitmentEndDate: string;
  companyName: string;
  workSummary: string;
  recruitmentOriginUrl: string;
  depthTwo: string[];
  companyLogoUrl: string | null;
}

export interface UserReportResponse {
  weekNumber: number;
  year: number;
  month: number;
  weekOfMonth: number;
  formattedWeek: string;
  passedCount: number;
  rejectedCount: number;
  startDate: string;
  endDate: string;
  reportData: {
    recommendations: {
      category: string;
      requirement: string;
    }[];
    passed_features: string[];
    failed_features: string[];
  };
}
