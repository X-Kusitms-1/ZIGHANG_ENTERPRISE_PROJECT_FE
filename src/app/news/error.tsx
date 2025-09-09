"use client";

import React from "react";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function NewsError({ error, reset }: ErrorProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center space-y-8 text-center">
        {/* 에러 아이콘 */}
        <div className="max-tablet:h-20 max-tablet:w-20 tablet:h-28 tablet:w-28 flex h-24 w-24 items-center justify-center rounded-full bg-red-50">
          <AlertCircle className="max-tablet:h-10 max-tablet:w-10 tablet:h-14 tablet:w-14 h-12 w-12 text-red-500" />
        </div>

        {/* 에러 메시지 */}
        <div className="max-tablet:space-y-3 tablet:space-y-4 space-y-4">
          <h1 className="max-tablet:text-2xl tablet:text-4xl text-3xl font-bold text-gray-900">
            뉴스 페이지 오류
          </h1>
          <h2 className="max-tablet:text-lg tablet:text-2xl text-xl font-semibold text-gray-700">
            뉴스를 불러오는 중 문제가 발생했습니다
          </h2>
          <p className="max-tablet:max-w-md tablet:max-w-xl max-tablet:text-xs tablet:text-base max-w-lg px-4 text-sm text-gray-500">
            일시적인 오류가 발생했습니다. 페이지를 새로고침하거나 잠시 후 다시
            시도해주세요.
          </p>
        </div>

        {/* 액션 버튼들 */}
        <div className="max-tablet:flex-col tablet:flex-row max-tablet:gap-3 tablet:gap-4 flex flex-col gap-4">
          <Button
            variant="inversed"
            size="lg"
            onClick={reset}
            className="flex items-center space-x-2 px-8"
          >
            <RefreshCw className="h-5 w-5" />
            <span>다시 시도</span>
          </Button>

          <Link href="/">
            <Button
              variant="outlined"
              size="lg"
              className="flex items-center space-x-2 px-8"
            >
              <Home className="h-5 w-5" />
              <span>홈으로 돌아가기</span>
            </Button>
          </Link>
        </div>

        {/* 에러 정보 (개발 모드에서만 표시) */}
        {process.env.NODE_ENV === "development" && (
          <details className="mt-8 max-w-2xl">
            <summary className="cursor-pointer text-sm text-gray-400 hover:text-gray-600">
              에러 상세 정보 (개발 모드)
            </summary>
            <pre className="mt-2 rounded bg-gray-100 p-4 text-xs whitespace-pre-wrap text-gray-700">
              {error.message}
              {error.digest && `\n\nDigest: ${error.digest}`}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
