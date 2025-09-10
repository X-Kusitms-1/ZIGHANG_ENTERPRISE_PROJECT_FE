"use client";
import React from "react";
import Image from "next/image";
import LoginModal from "../login/LoginModal";
import { Button } from "../ui/Button";
import NavMenu from "./NavMenu";
import MenuSidebar from "./MenuSidebar";

const Header = () => {


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
          <LoginModal>
            <Button size="sm">
              로그인
            </Button>
          </LoginModal>
        </div>
      </div>
      <div className="max-pc:flex hidden items-center gap-5">
        <MenuSidebar />
      </div>
    </header>
  );
};

export default Header;
