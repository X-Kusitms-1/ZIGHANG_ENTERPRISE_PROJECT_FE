import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { usePostUserReport } from "@/hooks/today/useUserReport";
import { useGetUserReport } from "@/hooks/today/useUserReport";
import ReportCreateLoding from "./ReportCreateLoding";
import BubbleChart from "./BubbleChart";
import ReportChart from "./ReportChart";
import FailedJobTags from "./FailedJobTags";
import ImprovementSuggestions from "./ImprovementSuggestions";

interface ReportCreateProps {
  currentYear: string;
  month: string;
  weekOfMonth: string;
  isOpen: boolean;
}

function ReportCreate({
  currentYear,
  month,
  weekOfMonth,
  isOpen,
}: ReportCreateProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const {
    mutate: postUserReport,
    data: userReport,
    isPending,
  } = usePostUserReport({
    year: currentYear,
    month: month,
    weekOfMonth: weekOfMonth,
  });

  const { data: userReportCheck } = useGetUserReport(
    currentYear,
    month,
    weekOfMonth,
    isOpen
  );

  const handleGenerateReport = () => {
    setIsGenerating(true);
    postUserReport();
  };

  // 리포트 생성이 완료되면 로딩 상태 해제
  React.useEffect(() => {
    if (userReport && isGenerating) {
      setIsGenerating(false);
    }

    if (userReportCheck && !userReport) {
      postUserReport();
    }
  }, [userReport, isGenerating, userReportCheck, postUserReport]);

  // 로딩 중일 때
  if (isGenerating || isPending) {
    return <ReportCreateLoding />;
  }

  // 리포트 생성 완료 후 결과 표시
  if (userReportCheck && userReport) {
    return (
      <>
        <ReportChart userReport={userReport} />
        <BubbleChart userReport={userReport} />
        <FailedJobTags userReport={userReport} />
        <ImprovementSuggestions userReport={userReport} />
      </>
    );
  }

  // 초기 상태 (리포트 생성 버튼)
  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-11">
      <Image
        src="/today/report.svg"
        alt="report-create"
        width={160}
        height={130}
      />
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-24-600 text-text-secondary">
          리포트를 생성할까요?
        </h2>
        <p className="text-14-500 text-text-tertiary text-center">
          리포트 생성은 3분정도 소요돼요.
          <br />
          그동안 창을 닫아도 생성은 계속 진행돼요.
        </p>
      </div>
      <Button className="w-full" size="lg" onClick={handleGenerateReport}>
        {month}월 {weekOfMonth}주차 리포트 생성
      </Button>
    </div>
  );
}

export default ReportCreate;
