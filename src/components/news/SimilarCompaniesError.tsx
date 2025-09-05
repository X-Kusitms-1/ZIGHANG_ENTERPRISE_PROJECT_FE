import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/ui/Button";

export default function SimilarCompaniesError() {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div className="max-tablet:py-10 tablet:py-12 flex flex-col items-center justify-center px-4 py-8">
      <div className="max-tablet:space-y-4 tablet:space-y-4 flex flex-col items-center space-y-3 text-center">
        {/* 에러 아이콘 */}
        <div className="max-tablet:h-16 max-tablet:w-16 tablet:h-16 tablet:w-16 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
          <AlertCircle className="max-tablet:h-8 max-tablet:w-8 tablet:h-8 tablet:w-8 h-7 w-7 text-red-500" />
        </div>

        {/* 에러 메시지 */}
        <div className="max-tablet:space-y-2 tablet:space-y-2 space-y-1">
          <h3 className="max-tablet:text-lg tablet:text-lg text-base font-semibold text-gray-900">
            유사 기업 정보를 불러올 수 없습니다
          </h3>
          <p className="max-tablet:max-w-md tablet:max-w-md max-tablet:text-sm tablet:text-sm max-w-xs px-2 text-xs text-gray-500">
            일시적인 오류가 발생했습니다.
            <br className="max-tablet:hidden tablet:hidden" />
            <span className="max-tablet:block tablet:block hidden"> </span>
            잠시 후 다시 시도해주세요.
          </p>
        </div>

        {/* 재시도 버튼 */}
        <Button
          variant="inversed"
          size="sm"
          onClick={() => {
            resetBoundary();
          }}
          className="max-tablet:mt-3 tablet:mt-4 mt-2 flex items-center space-x-2"
        >
          <RefreshCw className="h-4 w-4" />
          <span>다시 시도</span>
        </Button>
      </div>
    </div>
  );
}
