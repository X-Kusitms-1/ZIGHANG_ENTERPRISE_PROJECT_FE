import React from "react";
import Link from "next/link";
import Image from "next/image";
import { jobCategories } from "@/constants/JobCategory";

function JobCategoryGrid() {
  return (
    <div className="tablet:gap-9 tablet:py-8 pc:py-0 relative flex w-full flex-col items-center gap-4 px-0 py-0">
      <div className="tablet:grid-cols-4 pc:grid-cols-5 mx-auto grid w-full max-w-[900px] grid-cols-3 gap-[1px] overflow-hidden rounded-[20px]">
        {jobCategories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="tablet:h-[68px] tablet:px-4 relative flex h-[44px] w-full items-center gap-2 bg-[#f7f7f7] px-2 py-0"
          >
            <Image
              src={category.icon}
              alt={category.name}
              width={20}
              height={20}
              className="tablet:h-5 tablet:w-5 h-3.5 w-3.5 flex-shrink-0"
            />
            <p className="tablet:text-base tablet:font-medium w-fit text-xs leading-normal font-normal whitespace-nowrap text-black">
              <span className="tracking-[0.05px]">{category.name}</span>
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default JobCategoryGrid;
