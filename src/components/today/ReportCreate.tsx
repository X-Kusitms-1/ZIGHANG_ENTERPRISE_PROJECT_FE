import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { usePostUserReport } from "@/hooks/today/useUserReport";

interface ReportCreateProps {
  currentYear: string;
  month: string;
  weekOfMonth: string;
}

function ReportCreate({ currentYear, month, weekOfMonth }: ReportCreateProps) {
  const { mutate: postUserReport } = usePostUserReport({
    year: currentYear,
    month: month,
    weekOfMonth: weekOfMonth,
  });

  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-11">
      <Image
        src="/today/report.svg"
        alt="report-create"
        width={160}
        height={130}
      />
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-24-600 text-text-secondary">
          리포트를 생성할까요?
        </h2>
        <p className="text-14-500 text-text-tertiary text-center">
          리포트 생성은 3분정도 소요돼요.
          <br />
          그동안 창을 닫아도 생성은 계속 진행돼요.
        </p>
      </div>
      <Button className="w-full" size="lg" onClick={() => postUserReport()}>
        {month}월 {weekOfMonth}주차 리포트 생성
      </Button>
    </div>
  );
}

export default ReportCreate;
