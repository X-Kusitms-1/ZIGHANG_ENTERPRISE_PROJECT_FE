"use client";

import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { generateWeekOptions } from "@/utils/weekCalculator";
import {
  useGetUserReport,
  usePostUserReport,
} from "@/hooks/today/useUserReport";
import BubbleChart from "./BubbleChart";
import ReportChart from "./ReportChart";
import FailedJobTags from "./FailedJobTags";
import ImprovementSuggestions from "./ImprovementSuggestions";
import ReportCreate from "./ReportCreate";
import ReportError from "./ReportError";
import ReportLoading from "./ReportLoading";

function ReportModal() {
  // 현재 주차를 기본값으로 설정 (인덱스 1)
  const [isOpen, setIsOpen] = useState(false);
  const [currentWeekIndex, setCurrentWeekIndex] = useState(1);

  // 주차 배열 생성 (이전 주, 현재 주, 다음 주)
  const weeks = generateWeekOptions();

  // 현재 선택된 주차 정보 파싱
  const currentWeekText = weeks[currentWeekIndex];
  const [monthPart, weekPart] = currentWeekText.split("월 ");
  const month = monthPart;
  const weekOfMonth = weekPart.replace("주차", "");

  // 현재 연도 가져오기
  const currentYear = new Date().getFullYear().toString();

  const { mutate: postUserReport, data: userReport } = usePostUserReport({
    year: currentYear,
    month: month,
    weekOfMonth: weekOfMonth,
  });

  const {
    data: userReportCheck,
    isError,
    error,
  } = useGetUserReport(currentYear, month, weekOfMonth, isOpen);

  useEffect(() => {
    if (isOpen && userReportCheck) {
      postUserReport();
    }
  }, [postUserReport, isOpen, userReportCheck]);

  const handlePreviousWeek = () => {
    if (currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1);
      // 주차 변경 시 리포트 데이터 새로 가져오기
      if (userReportCheck) {
        postUserReport();
      }
    }
  };

  const handleNextWeek = () => {
    if (currentWeekIndex < weeks.length - 1) {
      setCurrentWeekIndex(currentWeekIndex + 1);
      // 주차 변경 시 리포트 데이터 새로 가져오기
      if (userReportCheck) {
        postUserReport();
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent
        className="bg-bg-tertiary max-w-4xl !grid-cols-none !grid-rows-none !gap-0 !p-6"
        style={{
          maxHeight: "670px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center justify-center gap-4">
            <Button
              variant="outlined"
              size="sm"
              className="bg-bg-neutral size-8 cursor-pointer rounded-full p-0"
              disabled={currentWeekIndex === 0}
              onClick={handlePreviousWeek}
            >
              <ChevronLeft color="#000" size={20} />
            </Button>
            <h2>{weeks[currentWeekIndex]} 리포트</h2>
            <Button
              variant="outlined"
              size="sm"
              className="bg-bg-neutral size-8 cursor-pointer rounded-full p-0"
              disabled={currentWeekIndex === weeks.length - 1}
              onClick={handleNextWeek}
            >
              <ChevronRight color="#000" size={20} />
            </Button>
          </DialogTitle>
        </DialogHeader>
        <div className="scrollbar-hide my-6 flex-1 space-y-8 overflow-y-auto rounded-[12px] bg-white p-6">
          {isError ? (
            <ReportError
              error={error}
              onRetry={() => postUserReport()}
              onClose={() => setIsOpen(false)}
            />
          ) : !userReportCheck ? (
            <ReportCreate
              currentYear={currentYear}
              month={month}
              weekOfMonth={weekOfMonth}
            />
          ) : userReport ? (
            <>
              <ReportChart userReport={userReport} />
              <BubbleChart userReport={userReport} />
              <FailedJobTags userReport={userReport} />
              <ImprovementSuggestions userReport={userReport} />
            </>
          ) : (
            <ReportLoading />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ReportModal;
