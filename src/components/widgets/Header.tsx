"use client";
import React from "react";
import Image from "next/image";
import LoginOnBoarding from "@/components/join/LoginOnBoarding";
import { useToggle } from "@/hooks/useToggle";
import NavMenu from "./NavMenu";
import MenuSidebar from "./MenuSidebar";

const Header = () => {
  const {
    isToggle: open,
    onOpenToggle: openModal,
    setIsToggle: setOpen,
  } = useToggle();
  return (
    <header className="tablet:px-8 pc:px-8 mx-auto flex w-full items-center justify-between py-3">
      <div className="flex items-center gap-8">
        <Image
          src="/icons/dev/logo.svg"
          alt="logo"
          width={0}
          height={0}
          className="tablet:h-[40px] tablet:w-[76px] h-[24px] w-[60.5px]"
        />
        <NavMenu className="tablet:block hidden" />
      </div>
      <div className="tablet:flex hidden items-center gap-5">
        <div className="flex items-center gap-4">
          <button className="h-[40px] w-[84px]">기업 회원</button>
          <button
            className="flex h-[40px] cursor-pointer items-center justify-center gap-3 rounded-[8px] border border-[#DDDDE1] px-4 py-[10px] text-base text-[#6F00B6]"
            onClick={openModal}
          >
            로그인 / 회원가입
          </button>
        </div>
      </div>
      <div className="tablet:hidden flex items-center gap-5">
        <button className="h-[40px] w-[84px]">기업 회원</button>
        <button
          className="flex h-[40px] cursor-pointer items-center justify-center px-4 py-[10px] text-base text-[#6F00B6]"
          onClick={openModal}
        >
          로그인
        </button>
        <MenuSidebar />
      </div>
      <LoginOnBoarding open={open} onOpenChange={setOpen} />
    </header>
  );
};

export default Header;
