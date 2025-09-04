"use client";

interface MobileLoginTitleProps {
  text?: string;
}

export default function MobileLoginTitle({ text }: MobileLoginTitleProps) {
  return (
    <div className="text-24-600 text-left leading-[32px]">
      {text ?? (
        <>
          내 직군의 채용 공고를 <br />
          메일로 매일 받아 보세요!
        </>
      )}
    </div>
  );
}
