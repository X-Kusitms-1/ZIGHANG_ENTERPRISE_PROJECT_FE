"use client";

import React from "react";
import { useNewsFilterContext } from "@/context/NewsFilterContext";

function TotalNews() {
  const { totalCount } = useNewsFilterContext();
  return (
    <h3 className="text-18-600 text-text-secondary max-pc:hidden">
      전체 소식 <span className="text-text-info">{totalCount}</span>
    </h3>
  );
}

export default TotalNews;
