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
  isApplied: boolean;
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

export interface UserAccuracy {
  question1: string[];
  question2: string[];
  question3: string[];
  question4: string[];
  question5: string[];
  question6: string[];
  question7: string[];
  question8: string[];
  question9: string[];
  question10: string[];
}
