import { useState, useEffect } from "react";

interface OnBoardingTitleProps {
  title: string;
  subtitle: string;
  currentStep: number;
  totalSteps: number;
}

export default function OnBoardingTitle({
  title,
  subtitle,
  currentStep,
  totalSteps,
}: OnBoardingTitleProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const targetProgress = ((currentStep + 1) / totalSteps) * 100;

  useEffect(() => {
    // 컴포넌트 마운트 후 약간의 딜레이를 주고 애니메이션 시작
    const timer = setTimeout(() => {
      setAnimatedProgress(targetProgress);
    }, 100);

    return () => clearTimeout(timer);
  }, [currentStep, totalSteps, targetProgress]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2">
      <div className="text-28-600 text-text-secondary">
        <span className="text-28-600 text-text-info mr-2 leading-9">Q.</span>
        {title}
      </div>
      <div className="text-14-500 text-text-tertiary mb-4 leading-5">{subtitle}</div>
      <div className="w-full">
        <div className="h-1 w-full overflow-hidden bg-border-tertiary">
          <div
            className="h-1 rounded-r-lg bg-purple-600 transition-all duration-300 ease-in-out"
            style={{ width: `${animatedProgress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
