import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

function SearchInput() {
  return (
    <div className="pc:max-w-[640px] my-5 flex h-[56px] w-full items-center justify-between rounded-2xl border border-[#EDEDED] bg-[#F7F7F7] p-5">
      <Input
        className="border-none bg-transparent shadow-none outline-none placeholder:text-base placeholder:text-[18px] hover:border-none focus:border-none focus:ring-0 focus-visible:border-none focus-visible:ring-0 active:border-none"
        placeholder="검색어를 입력해 주세요"
      />
      <Image
        src="/icons/dev/search.svg"
        alt="search"
        width={28}
        height={28}
        className="h-[28px] w-[28px]"
      />
    </div>
  );
}

export default SearchInput;
