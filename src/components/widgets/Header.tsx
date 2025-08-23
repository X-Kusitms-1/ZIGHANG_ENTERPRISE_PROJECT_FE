import React from "react";
import Link from "next/link";
import Image from "next/image";
import { headerMenu } from "@/constants/HeaderMenu";

const Header = () => {
  return (
    <header className="flex justify-between items-center max-w-[1440px] mx-auto px-[120px] py-6">
      <div className="flex items-center gap-6">
        <Image
          src="/icons/dev/logo.svg"
          alt="logo"
          width={80}
          height={40}
          className="w-[80px] h-[40px]"
        />
        <nav>
          <ul className="flex items-center gap-9">
            {headerMenu.map((menu) => (
              <li key={menu.title} className="text-base">
                <Link href={menu.href}>{menu.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-7">
          <button className="w-[84px] h-[40px]">기업 회원</button>
          <button className="flex justify-center items-center gap-3 h-[40px] rounded-[8px] border border-[#DDDDE1] text-[#6F00B6] px-4 py-[10px] text-base cursor-pointer">
            로그인 / 회원가입
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
