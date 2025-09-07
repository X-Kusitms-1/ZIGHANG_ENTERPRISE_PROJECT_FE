"use client";

interface MobileLoginTitleProps {
  text?: string;
  className?: string;
}

export default function MobileLoginTitle({ text, className }: MobileLoginTitleProps) {
  return (
    <div className={`text-24-600 text-left leading-[32px]${className ? ` ${className}` : ""}`}>
      {text ?? (
        <p>
          내 직군의 채용 공고를 <br />
          메일로 매일 받아 보세요!
        </p>
      )}
    </div>
  );
}
