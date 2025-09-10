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

function MenuSidebar() {
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
      <SheetContent className="rounded-l-2xl bg-white px-5">
        <SheetHeader>
          <SheetTitle className="sr-only">메뉴</SheetTitle>
        </SheetHeader>
        <NavMenu className="mt-5" orientation="vertical" />
        <Button
          variant="filled"
          size="sm"
          className="mx-auto"
          onClick={handleMobileLogin}
        >
          로그인
        </Button>
      </SheetContent>
    </Sheet>
  );
}

export default MenuSidebar;
