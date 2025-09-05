import React from "react";
import Link from "next/link";
import { Home, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center space-y-8 text-center">
        {/* 404 아이콘 */}
        <div className="max-tablet:h-28 max-tablet:w-28 tablet:h-36 tablet:w-36 flex h-32 w-32 items-center justify-center rounded-full bg-red-50">
          <AlertCircle className="max-tablet:h-14 max-tablet:w-14 tablet:h-18 tablet:w-18 h-16 w-16 text-red-500" />
        </div>

        {/* 404 메시지 */}
        <div className="max-tablet:space-y-3 tablet:space-y-4 space-y-4">
          <h1 className="max-tablet:text-5xl tablet:text-7xl text-6xl font-bold text-gray-900">
            404
          </h1>
          <h2 className="max-tablet:text-xl tablet:text-3xl text-2xl font-semibold text-gray-700">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="max-tablet:max-w-sm tablet:max-w-lg max-tablet:text-xs tablet:text-base max-w-md px-4 text-sm text-gray-500">
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
            <br className="max-tablet:hidden tablet:hidden" />
            <span className="max-tablet:block tablet:block hidden"> </span>
            URL을 다시 확인해주세요.
          </p>
        </div>

        {/* 홈으로 돌아가기 버튼 */}
        <Link href="/">
          <Button
            variant="inversed"
            size="lg"
            className="flex items-center space-x-3 px-8 py-3"
          >
            <Home className="h-5 w-5" />
            <span>홈으로 돌아가기</span>
          </Button>
        </Link>

        {/* 추가 도움말 */}
        <div className="max-tablet:mt-6 tablet:mt-10 mt-8">
          <p className="max-tablet:text-xs tablet:text-sm text-xs text-gray-400">
            문제가 지속되면 고객센터로 문의해주세요.
          </p>
        </div>
      </div>
    </div>
  );
}
