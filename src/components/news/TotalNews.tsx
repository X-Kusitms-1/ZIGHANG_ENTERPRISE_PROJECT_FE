"use client";

import React, { use } from "react";
import { NewsResponse } from "@/api/type/news";

interface TotalNewsProps {
  newsData: Promise<NewsResponse>;
}

function TotalNews({ newsData }: TotalNewsProps) {
  const news = use(newsData);

  return (
    <h3 className="text-18-600 text-text-secondary">
      전체 소식 <span className="text-text-info">{news.totalElements}</span>
    </h3>
  );
}

export default TotalNews;
