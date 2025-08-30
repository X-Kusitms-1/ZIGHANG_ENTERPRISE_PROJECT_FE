"use client";

export default function LoginTitle() {
  return (
    <div className="tablet:text-[36px] text-center text-[28px] font-semibold">
      {/* 모바일 전용 */}
      <div className="mobile:block tablet:hidden pc:hidden">
        <div>
          <span className="text-[#7A52FF]">내 직군의 채용 공고</span>를
        </div>
        <div>매일 받아보세요</div>
      </div>
      {/* 태블릿/PC 전용 */}
      <div className="tablet:block hidden">
        <span className="text-[#7A52FF]">내 직군의 채용 공고</span>를 매일
        받아보세요
      </div>
    </div>
  );
}
