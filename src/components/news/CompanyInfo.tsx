"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronRight, MailCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Company } from "@/api/type/company";
import { Button } from "../ui/Button";

const companyInfoVariants = cva("company-info", {
  variants: {
    variant: {
      main: "flex flex-col space-y-5 max-pc:flex-row max-pc:space-x-4 max-pc:justify-between pc:min-w-[280px] tablet:min-w-[280px]",
      sub: "flex flex-col space-y-5 pc:min-w-[280px] tablet:min-w-[280px]",
      company: "flex",
      content: "flex",
    },
  },
  defaultVariants: {
    variant: "main",
  },
});

interface CompanyInfoProps extends VariantProps<typeof companyInfoVariants> {
  companyInfo: Company;
  className?: string;
  onSubscribe?: () => void;
}

function CompanyInfo({
  companyInfo,
  variant,
  className,
  onSubscribe,
}: CompanyInfoProps) {
  return (
    <div className={companyInfoVariants({ variant, className })}>
      <Link
        href={`/news/${companyInfo.id}`}
        className={"max-tablet:space-x-2 flex space-x-4"}
      >
        {/* <div>{companyInfo.logo}</div> */}
        <Image
          src={companyInfo.companyThumbnailUrl}
          alt={companyInfo.companyNameKr}
          width={20}
          height={20}
          className={`bg-bg-neutral pc:h-16 pc:w-16 aspect-square flex-shrink-0 rounded-[7.5px] ${
            variant === "company"
              ? "max-pc:!w-5 max-pc:!h-5"
              : variant === "sub"
                ? "max-pc:w-[60px] max-pc:h-[60px]"
                : variant === "main"
                  ? "max-pc:w-11 max-pc:h-11"
                  : ""
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

          <div
            className={`text-12-500 text-text-tertiary flex items-center gap-1.5 ${
              variant === "company" ? "max-pc:hidden" : ""
            }`}
          >
            <p>{companyInfo.companyTypeLabel}</p>
          </div>
        </div>
      </Link>

      {(variant === "main" || variant === "sub") && (
        <div className="max-pc:w-auto max-pc:flex max-pc:justify-start w-full">
          <Button
            onClick={onSubscribe}
            variant={companyInfo.isSubscribed ? "neutral" : "subtle"}
            size="md"
            className={`max-pc:text-14-500 flex w-full items-center gap-2 ${
              variant === "main" ? "max-pc:max-w-[92px] max-pc:h-[36px]" : ""
            } ${variant === "sub" ? "max-pc:min-w-[360px] max-pc:min-h-[56px] !text-16-500" : ""} `}
          >
            {companyInfo.isSubscribed ? "소식 받는 중" : "소식받기"}
            {!companyInfo.isSubscribed && (
              <MailCheck
                className={`mb-0.5 size-4 ${variant === "main" ? "max-pc:hidden" : ""}`}
              />
            )}
          </Button>
        </div>
      )}
    </div>
  );
}

export default CompanyInfo;
