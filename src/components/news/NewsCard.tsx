"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";

interface NewsCard {
  title: string;
  url: string;
  publishedAt: string;
  thumbnailUrl: string;
}

const newsCardVariants = cva("news-card", {
  variants: {
    variant: {
      main: "flex flex-col space-y-4 w-full max-w-[300px] max-tablet:max-w-[180px] group",
      sub: "flex flex-col max-pc:items-center space-x-2 space-y-4 w-full max-w-[300px] max-pc:max-w-full  max-pc:flex-row",
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
      href={newsCard.url}
      className={newsCardVariants({ variant })}
      target="_blank"
    >
      <Image
        src={newsCard.thumbnailUrl}
        alt={newsCard.title}
        width={300}
        height={200}
        className={`pc:min-h-[200px] tablet:min-h-[200px] max-h-[200px] min-h-[130px] w-full rounded-[8px] object-cover ${
          variant === "sub"
            ? "max-pc:h-[64px] max-pc:w-[100px] !min-h-[64px]"
            : ""
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
          <p>{newsCard.publishedAt}</p>
        </div>
      </div>
    </Link>
  );
}

export default NewsCard;
