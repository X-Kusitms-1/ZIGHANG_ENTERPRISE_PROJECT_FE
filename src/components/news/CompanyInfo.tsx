"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronRight, Send, Plus } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/Button";

interface CompanyInfo {
  id: string;
  companyNameKr: string;
  companyThumbnailUrl: string;
  companyTypeLabel: string;
  isSubscribed?: boolean;
}

const companyInfoVariants = cva("company-info", {
  variants: {
    variant: {
      main: "flex flex-col space-y-5 max-tablet:flex-row max-tablet:space-x-4 max-tablet:justify-between pc:min-w-[280px] tablet:min-w-[280px]",
      sub: "flex flex-col space-y-5 pc:min-w-[280px] tablet:min-w-[280px]",
      company: "flex",
    },
  },
  defaultVariants: {
    variant: "main",
  },
});

interface CompanyInfoProps extends VariantProps<typeof companyInfoVariants> {
  companyInfo: CompanyInfo;
}

function CompanyInfo({ companyInfo, variant }: CompanyInfoProps) {
  return (
    <div className={companyInfoVariants({ variant })}>
      <div className="max-tablet:space-x-2 flex space-x-4">
        {/* <div>{companyInfo.logo}</div> */}
        <Image
          src={companyInfo.companyThumbnailUrl}
          alt={companyInfo.companyNameKr}
          width={64}
          height={64}
          className={`bg-bg-neutral aspect-square h-16 w-16 flex-shrink-0 rounded-[7.5px] ${
            variant === "sub"
              ? "max-tablet:w-[60px] max-tablet:h-[60px]"
              : "max-tablet:w-11 max-tablet:h-11"
          } `}
        />
        <div className="flex w-full flex-col justify-center space-y-2">
          <div className="flex justify-between gap-3">
            <div className="flex space-x-2">
              <h2 className="companyNameKr-tablet:text-16-600 text-18-600 truncate">
                {companyInfo.companyNameKr}
              </h2>
            </div>
            {(variant === "main" || variant === "company") && (
              <ChevronRight
                className={`size-4 ${variant === "main" ? "max-tablet:hidden" : ""}`}
              />
            )}
          </div>
          <div className="text-12-500 text-text-tertiary flex items-center gap-1.5">
            <p>{companyInfo.companyTypeLabel}</p>
          </div>
        </div>
      </div>
      {(variant === "main" || variant === "sub") && (
        <div className="max-tablet:w-auto max-tablet:flex max-tablet:justify-start w-full">
          <Button
            variant="neutral"
            size="md"
            className={`max-tablet:text-14-500 flex w-full items-center gap-2 ${
              variant === "main"
                ? "max-tablet:max-w-[92px] max-tablet:h-[36px]"
                : ""
            } ${variant === "sub" ? "max-tablet:min-w-[360px] max-tablet:min-h-[56px] !text-16-500" : ""} `}
          >
            {companyInfo.isSubscribed ? "소식받기" : "소식 받는 중"}
            {companyInfo.isSubscribed ? (
              <Send
                className={`mb-0.5 size-4 ${variant === "main" ? "max-tablet:hidden" : ""}`}
              />
            ) : (
              <Plus
                className={`mb-0.5 size-4 ${variant === "main" ? "max-tablet:hidden" : ""}`}
              />
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

export default CompanyInfo;
