import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/ui/Button";

export default function CompanyRowError() {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div className="max-tablet:py-12 tablet:py-20 flex flex-col items-center justify-center px-4 py-16">
      <div className="max-tablet:space-y-5 tablet:space-y-6 flex flex-col items-center space-y-6 text-center">
        {/* 에러 아이콘 */}
        <div className="max-tablet:h-20 max-tablet:w-20 tablet:h-24 tablet:w-24 flex h-18 w-18 items-center justify-center rounded-full bg-red-50">
          <AlertCircle className="max-tablet:h-10 max-tablet:w-10 tablet:h-12 tablet:w-12 h-9 w-9 text-red-500" />
        </div>

        {/* 에러 메시지 */}
        <div className="max-tablet:space-y-3 tablet:space-y-4 space-y-3">
          <h3 className="max-tablet:text-xl tablet:text-2xl text-lg font-semibold text-gray-900">
            기업 정보를 불러올 수 없습니다
          </h3>
          <p className="max-tablet:max-w-md tablet:max-w-lg max-tablet:text-xs tablet:text-base max-w-sm px-4 text-sm text-gray-500">
            기업 뉴스 데이터를 가져오는 중 오류가 발생했습니다.
            <br className="max-tablet:hidden tablet:hidden" />
            <span className="max-tablet:block tablet:block hidden"> </span>
            잠시 후 다시 시도해주세요.
          </p>
        </div>

        {/* 재시도 버튼 */}
        <Button
          variant="inversed"
          size="md"
          className="max-tablet:size-sm tablet:size-lg flex items-center space-x-2"
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
