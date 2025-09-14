import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

function ReportCreate() {
  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-11">
      <Image
        src="/icons/dev/todayReport.svg"
        alt="report-create"
        width={160}
        height={130}
      />
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-24-600 text-text-secondary">
          레포트를 생성할까요?
        </h2>
        <p className="text-14-500 text-text-tertiary text-center">
          레포트 생성은 3분정도 소요돼요.
          <br />
          그동안 창을 닫아도 생성은 계속 진행돼요.
        </p>
      </div>
      <Button className="w-full" size="lg">
        8월 3주차 레포트 생성
      </Button>
    </div>
  );
}

export default ReportCreate;
