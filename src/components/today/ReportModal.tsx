"use client";

import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ReportChart from "./ReportChart";

function ReportModal() {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent className="bg-bg-tertiary px-6">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div>버튼1</div>
            <h2>8월 3주차 리포트</h2>
            <div>버튼2</div>
          </DialogTitle>
        </DialogHeader>
        <div className="my-6 rounded-[12px] bg-white p-6">
          <ReportChart />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ReportModal;
