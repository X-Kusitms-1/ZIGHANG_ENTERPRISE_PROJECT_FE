"use client";

import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BubbleChart from "./BubbleChart";
import ReportChart from "./ReportChart";
import FailedJobTags from "./FailedJobTags";

function ReportModal() {
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
          <DialogTitle className="flex items-center justify-between">
            <div>버튼1</div>
            <h2>8월 3주차 리포트</h2>
            <div>버튼2</div>
          </DialogTitle>
        </DialogHeader>
        <div className="scrollbar-hide my-6 flex-1 space-y-8 overflow-y-auto rounded-[12px] bg-white p-6">
          <ReportChart />
          <BubbleChart />
          <FailedJobTags />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ReportModal;
