"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/Button";
import NavMenu from "./NavMenu";

interface MenuSidebarProps {
  apiSuccess?: boolean | null;
}

function MenuSidebar({ apiSuccess }: MenuSidebarProps) {
  const router = useRouter();

  // 모바일 로그인 버튼 핸들러
  const handleMobileLogin = () => {
    router.push("/login");
  };
  return (
    <Sheet>
      <SheetTrigger>
        <Image
          src="/icons/dev/hamburger.svg"
          alt="menu"
          width={24}
          height={24}
        />
      </SheetTrigger>
      <SheetContent className="flex flex-col rounded-l-2xl bg-white px-5 pt-6">
        <SheetHeader className="flex flex-row items-center justify-end">
          <SheetTitle className="sr-only">메뉴</SheetTitle>
        </SheetHeader>

        {apiSuccess === true ? (
          <>
            <div className="mt-2 mb-2 flex flex-col items-start gap-3">
              <Image
                src="/header/userProfile.svg"
                alt="user profile"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
            </div>
            <div className="w-[70px]">
              <NavMenu className="mt-5" orientation="vertical" />
            </div>
            <Button
              variant="filled"
              size="md"
              className="mt-6 mr-auto h-11 w-[110px]"
              onClick={() => {
                /* 로그아웃 로직 구현 필요 */
              }}
            >
              로그아웃
            </Button>
          </>
        ) : (
          <div>
            <div className="w-[70px]">
              <NavMenu className="mt-5" orientation="vertical" />
            </div>
            <Button
              variant="filled"
              size="md"
              className="mt-6 mr-auto h-11 w-[110px]"
              onClick={handleMobileLogin}
            >
              로그인
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

export default MenuSidebar;
