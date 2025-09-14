"use client";

import React, { useState } from "react";
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
import BubbleChart from "./BubbleChart";
import ReportChart from "./ReportChart";
import FailedJobTags from "./FailedJobTags";
import ImprovementSuggestions from "./ImprovementSuggestions";

function ReportModal() {
  // 현재 주차를 기본값으로 설정 (인덱스 1)
  const [currentWeekIndex, setCurrentWeekIndex] = useState(1);

  // 주차 배열 생성 (이전 주, 현재 주, 다음 주)
  const weeks = generateWeekOptions();

  const handlePreviousWeek = () => {
    if (currentWeekIndex > 0) {
      setCurrentWeekIndex(currentWeekIndex - 1);
    }
  };

  const handleNextWeek = () => {
    if (currentWeekIndex < weeks.length - 1) {
      setCurrentWeekIndex(currentWeekIndex + 1);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent
        className="bg-bg-tertiary max-w-4xl !grid-cols-none !grid-rows-none !gap-0 !p-6"
        style={{
          maxHeight: "670px",
          height: "670px",
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
          <ReportChart />
          <BubbleChart />
          <FailedJobTags />
          <ImprovementSuggestions />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ReportModal;
