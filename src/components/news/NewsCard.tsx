"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";

interface NewsCard {
  id: string; // 뉴스ID
  title: string; // 뉴스제목
  image: string; // 뉴스이미지
  createdAt: string; // 뉴스작성일
}

const newsCardVariants = cva("news-card", {
  variants: {
    variant: {
      main: "flex flex-col space-y-4 w-full max-w-[300px] max-tablet:max-w-[180px] group",
      sub: "flex flex-col max-tablet:items-center space-x-2 space-y-4 w-full max-w-[300px] max-tablet:max-w-[365px]  max-tablet:flex-row",
      text: "border-b-border-line border-b py-3",
    },
  },
  defaultVariants: {
    variant: "main",
  },
});

type NewsCardProps = VariantProps<typeof newsCardVariants> & {
  newsCard: NewsCard;
};

function NewsCard({ newsCard, variant }: NewsCardProps) {
  return (
    <Link
      href={`/news/${newsCard.id}`}
      className={newsCardVariants({ variant })}
    >
      <Image
        src={newsCard.image}
        alt={newsCard.title}
        width={300}
        height={200}
        className={`min-h-[130px] w-full rounded-[8px] object-cover ${
          variant === "sub" ? "max-tablet:h-[64px] max-tablet:w-[100px]" : ""
        } ${variant === "text" ? "hidden" : ""}`}
      />
      <div className="flex flex-col gap-2">
        <h2
          className={`text-16-600 text-text-primary max-tablet:text-14-600 group-hover:underline ${
            variant === "text" ? "hover:underline" : ""
          }`}
        >
          {newsCard.title}
        </h2>
        <div className="text-12-500 text-text-tertiary flex items-center">
          <p>{newsCard.createdAt}</p>
        </div>
      </div>
    </Link>
  );
}

export default NewsCard;
