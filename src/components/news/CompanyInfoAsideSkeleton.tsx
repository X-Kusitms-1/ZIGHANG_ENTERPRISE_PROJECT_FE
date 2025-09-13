"use client";

import React from "react";

function CompanyInfoAsideSkeleton() {
  return (
    <aside className="max-pc:hidden relative mt-20 mb-15 w-full max-w-[280px]">
      <div className="flex animate-pulse flex-col gap-2">
        <div className="bg-bg-neutral h-[60px] w-[60px] rounded-[7.5px]" />
        <div className="mt-4 space-y-2">
          <div className="bg-border-line h-12 w-full rounded" />
        </div>
        <div className="mt-10 flex flex-col gap-2">
          <div className="bg-border-line h-12 w-full rounded" />
          <div className="bg-border-line h-12 w-full rounded" />
        </div>
      </div>
    </aside>
  );
}

export default CompanyInfoAsideSkeleton;
