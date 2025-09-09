import Image from "next/image";
import React from "react";
import CloseButton from "./CloseButton";

interface MobileHeaderProps {
  showCloseButton?: boolean;
  currentStep?: number;
  totalSteps?: number;
}

export default function MobileHeader(props: MobileHeaderProps) {
  const { showCloseButton = true, currentStep, totalSteps } = props;
  let progress: number | undefined = undefined;
  const showProgressBar =
    currentStep !== undefined && totalSteps !== undefined && totalSteps > 0;
  if (showProgressBar) {
    progress = ((currentStep + 1) / totalSteps) * 100;
  }
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex h-[62px] w-full items-center justify-between px-4 py-4">
  <Image src="/header-logo.svg" alt="Logo" width={61} height={30} />
  {showCloseButton && <CloseButton />}
      </div>
      {showProgressBar && (
        <div className="bg-border-tertiary h-1 w-full">
          <div
            className="h-1 rounded-r-lg bg-purple-600 transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
           />
        </div>
      )}
    </div>
  );
}
