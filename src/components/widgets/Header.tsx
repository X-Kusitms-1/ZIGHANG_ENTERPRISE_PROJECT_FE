"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getOnboardingStatus } from "@/api/header/getIsOnboarding";
import LoginModal from "../login/LoginModal";
import { Button } from "../ui/Button";
import NavMenu from "./NavMenu";
import MenuSidebar from "./MenuSidebar";

const Header = () => {
  const [apiSuccess, setApiSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    getOnboardingStatus()
      .then((status) => setApiSuccess(status === 200))
      .catch(() => setApiSuccess(false));
  }, []);

  return (
    <header className="tablet:px-8 pc:px-30 mx-auto flex w-full items-center justify-between py-4">
      <div className="flex items-center gap-6">
        <Link href="/">
          <Image
            src="/icons/dev/logo.svg"
            alt="logo"
            width={0}
            height={0}
            className="tablet:h-[40px] tablet:w-[76px] h-[24px] w-[60.5px] cursor-pointer"
          />
        </Link>
        <NavMenu className="tablet:block hidden" />
      </div>
      <div className="pc:flex hidden items-center gap-5">
        <Image src="/header/search.svg" alt="search" width={308} height={36} />
        <div className="flex items-center gap-3">
          {apiSuccess === true ? (
            <Image
              src="/header/userProfile.svg"
              alt="user profile"
              width={36}
              height={36}
              className="h-9 w-9 rounded-full object-cover"
            />
          ) : (
            <>
              <Button variant="inversed" size="sm">
                기업 회원
              </Button>
              <LoginModal>
                <Button size="sm">로그인</Button>
              </LoginModal>
            </>
          )}
        </div>
      </div>
      <div className="max-pc:flex hidden items-center gap-5">
        <MenuSidebar apiSuccess={apiSuccess} />
      </div>
    </header>
  );
};

export default Header;
