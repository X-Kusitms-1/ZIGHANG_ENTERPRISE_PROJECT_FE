"use client";

import React from "react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavMenu from "./NavMenu";

function MenuSidebar() {
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
      <SheetContent className="rounded-l-2xl px-5">
        <SheetHeader>
          <SheetTitle className="sr-only">메뉴</SheetTitle>
        </SheetHeader>
        <NavMenu className="mt-5" orientation="vertical" />
      </SheetContent>
    </Sheet>
  );
}

export default MenuSidebar;
