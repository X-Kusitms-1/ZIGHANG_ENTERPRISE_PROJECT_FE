import React from "react";
import Image from "next/image";
import NavMenu from "./NavMenu";
import MenuSidebar from "./MenuSidebar";

const Header = () => {
  return (
    <header className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-4 py-6">
      <div className="flex items-center gap-6">
        <Image
          src="/icons/dev/logo.svg"
          alt="logo"
          width={80}
          height={40}
          className="h-[40px] w-[80px]"
        />
        <NavMenu className="tablet:block hidden" />
      </div>
      <div className="tablet:flex hidden items-center gap-5">
        <div className="flex items-center gap-7">
          <button className="h-[40px] w-[84px]">기업 회원</button>
          <button className="flex h-[40px] cursor-pointer items-center justify-center gap-3 rounded-[8px] border border-[#DDDDE1] px-4 py-[10px] text-base text-[#6F00B6]">
            로그인 / 회원가입
          </button>
        </div>
      </div>
      <div className="tablet:hidden flex items-center gap-5">
        <button className="h-[40px] w-[84px]">기업 회원</button>
        <button className="flex h-[40px] cursor-pointer items-center justify-center px-4 py-[10px] text-base text-[#6F00B6]">
          로그인
        </button>
        <MenuSidebar />
      </div>
    </header>
  );
};

export default Header;
