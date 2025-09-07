"use client";
import { ReactNode } from "react";

interface MobileSubTitleProps {
  text?: ReactNode;
  className?: string;
}

export default function MobileSubTitle({ text, className }: MobileSubTitleProps) {
  return (
    <div className={`text-16-500 text-text-tertiary leading-6${className ? ` ${className}` : ""}`}>
      {text ?? (
        <p>
          당일 올라온 채용 공고 10개를 매일 아침
          <br className="tablet:hidden" />
          이메일로 보내드려요!
        </p>
      )}
    </div>
  );
}