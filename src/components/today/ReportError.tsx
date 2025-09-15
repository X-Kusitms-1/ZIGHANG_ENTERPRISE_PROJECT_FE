"use client";

import React from "react";
import { Button } from "@/components/ui/Button";

interface ReportErrorProps {
  error?: Error | null;
  onRetry: () => void;
  onClose: () => void;
}

function ReportError({ error, onRetry, onClose }: ReportErrorProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
          <svg
            className="h-8 w-8 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <div className="text-center">
          <h3 className="text-20-600 text-text-secondary mb-2">
            리포트를 불러올 수 없어요
          </h3>
          <p className="text-14-500 text-text-tertiary mb-4">
            네트워크 연결을 확인하고 다시 시도해주세요.
          </p>
          <p className="text-12-400 text-text-quaternary">
            오류: {error?.message || "알 수 없는 오류가 발생했습니다"}
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <Button variant="outlined" size="lg" onClick={onClose}>
          닫기
        </Button>
        <Button variant="filled" size="lg" onClick={onRetry}>
          다시 시도
        </Button>
      </div>
    </div>
  );
}

export default ReportError;
