"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { headerMenu } from "@/constants/HeaderMenu";

interface NavMenuProps {
  className?: string;
  itemClassName?: string;
  orientation?: "horizontal" | "vertical";
}

function NavMenu({
  className = "",
  itemClassName = "",
  orientation = "horizontal",
}: NavMenuProps) {
  const pathname = usePathname();

  return (
    <nav className={className}>
      <ul
        className={`flex items-center ${orientation === "vertical" ? "flex-col gap-4" : "gap-9"}`}
      >
        {headerMenu.map((menu) => {
          const isActive =
            pathname === menu.href || pathname.startsWith(menu.href + "/");
          return (
            <li key={menu.title} className="text-base">
              <Link
                href={menu.href}
                className={`text-14-400 text-text-primary block border-b-2 py-2 transition-colors ${
                  isActive
                    ? "text-14-600 border-[#6F00B6]"
                    : "border-transparent hover:text-[#6F00B6]"
                } ${itemClassName}`}
              >
                {menu.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavMenu;
