"use client";
export default function LoginSubTitle() {
  return (
    <div className="tablet:text-[20px] text-[16px] text-[#474747]">
      {/* 모바일 전용 */}
      <div className="mobile:flex tablet:hidden pc:hidden flex flex-col items-center">
        <div>오늘 올라온 채용공고 10개를</div>
        <div>매일 아침 이메일로 보내드립니다</div>
      </div>
      {/* 태블릿/PC 전용 */}
      <div className="tablet:block hidden">
        오늘 올라온 채용공고 10개를 매일 아침 이메일로 보내드립니다
      </div>
    </div>
  );
}
