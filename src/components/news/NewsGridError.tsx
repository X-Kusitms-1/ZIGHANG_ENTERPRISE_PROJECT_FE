import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/ui/Button";

export default function NewsGridError() {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div className="max-tablet:py-12 tablet:py-16 flex w-full flex-col items-center justify-center px-4 py-8">
      <div className="max-tablet:space-y-6 tablet:space-y-6 flex w-full flex-col items-center space-y-4 text-center">
        {/* 에러 아이콘 */}
        <div className="max-tablet:h-18 max-tablet:w-18 tablet:h-20 tablet:w-20 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <AlertCircle className="max-tablet:h-9 max-tablet:w-9 tablet:h-10 tablet:w-10 h-8 w-8 text-red-500" />
        </div>

        {/* 에러 메시지 */}
        <div className="max-tablet:space-y-3 tablet:space-y-3 space-y-2">
          <h3 className="max-tablet:text-xl tablet:text-xl text-lg font-semibold text-gray-900">
            뉴스를 불러올 수 없습니다
          </h3>
          <p className="max-tablet:max-w-md tablet:max-w-md max-tablet:text-sm tablet:text-sm max-w-sm px-2 text-xs text-gray-500">
            뉴스 데이터를 가져오는 중 오류가 발생했습니다.
            <br className="max-tablet:hidden tablet:hidden" />
            <span className="max-tablet:block tablet:block hidden"> </span>
            잠시 후 다시 시도해주세요.
          </p>
        </div>

        {/* 재시도 버튼 */}
        <Button
          variant="inversed"
          size="sm"
          className="max-tablet:size-md tablet:size-md flex items-center space-x-2"
          onClick={() => {
            resetBoundary();
          }}
        >
          <RefreshCw className="h-4 w-4" />
          <span>다시 시도</span>
        </Button>
      </div>
    </div>
  );
}
