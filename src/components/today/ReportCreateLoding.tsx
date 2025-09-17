import Lottie from "lottie-react";
import React from "react";
import reportAnimation from "../../../public/animation/report.json";

function ReportCreateLoding() {
  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-11">
      <div className="flex flex-1 items-center justify-center">
        <Lottie
          animationData={reportAnimation}
          loop={true}
          autoplay={true}
          style={{ width: 280, height: 280 }}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <h2 className="text-24-600 text-text-secondary">
          레포트를 생성 중이에요!
        </h2>
        <p className="text-14-500 text-text-tertiary text-center">
          레포트 생성은 3분정도 소요돼요.
          <br />
          그동안 창을 닫아도 생성은 계속 진행돼요.
        </p>
      </div>
    </div>
  );
}

export default ReportCreateLoding;
