"use client";
import { useMediaQuery } from "react-responsive";

export default function LoginTitle() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <div className="tablet:text-[36px] text-center text-[28px] font-semibold">
      {isMobile ? (
        <>
          <div>
            <span className="text-[#7A52FF]">내 직군의 채용 공고</span>를
          </div>
          <div>매일 받아보세요</div>
        </>
      ) : (
        <>
          <span className="text-[#7A52FF]">내 직군의 채용 공고</span>를 매일
          받아보세요
        </>
      )}
      <div className="tablet:text-[20px] text-[16px] text-[#474747]">
        {isMobile ? (
          <>
            <div>오늘 올라온 채용공고 10개를</div> 
            <div>매일 아침 이메일로 보내드립니다</div>
          </>
        ) : (
          <>오늘 올라온 채용공고 10개를 매일 아침 이메일로 보내드립니다</>
        )}
      </div>
    </div>
  );
}
