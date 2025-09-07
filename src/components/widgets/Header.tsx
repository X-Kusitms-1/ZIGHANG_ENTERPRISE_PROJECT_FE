"use client";
import React from "react";
import Image from "next/image";
import LoginOnBoarding from "@/components/join/LoginOnBoarding";
import { useToggle } from "@/hooks/useToggle";
import { Button } from "../ui/Button";
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
      <div className="pc:flex hidden items-center gap-5">
        <div className="flex items-center gap-4">
          <Button variant="inversed" size="sm">
            기업 회원
          </Button>
          <Button size="sm" onClick={openModal}>
            로그인
          </Button>
        </div>
      </div>
      <div className="max-pc:flex hidden items-center gap-5">
        <MenuSidebar />
      </div>
      <LoginOnBoarding open={open} onOpenChange={setOpen} />
    </header>
  );
};

export default Header;
