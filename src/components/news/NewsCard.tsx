import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import Image from "next/image";

interface NewsCard {
  id: string; // 뉴스ID
  title: string; // 뉴스제목
  image: string; // 뉴스이미지
  createdAt: string; // 뉴스작성일
  onClick: () => void; // 클릭 이벤트
}

const newsCardVariants = cva("news-card", {
  variants: {
    variant: {
      main: "flex flex-col space-y-4 min-w-[300px] max-w-[300px] max-tablet:min-w-[180px] max-tablet:max-w-[180px]",
      sub: "flex flex-col max-tablet:items-center space-x-2 space-y-4 min-w-[300px] max-w-[300px] max-tablet:min-w-[365px]  max-tablet:flex-row",
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
    <div className={newsCardVariants({ variant })}>
      <Image
        src={newsCard.image}
        alt={newsCard.title}
        width={300}
        height={200}
        className={`h-full w-full rounded-[8px] object-cover ${
          variant === "sub" ? "max-tablet:h-[64px] max-tablet:w-[100px]" : ""
        }`}
      />
      <div className="flex flex-col gap-2">
        <h2 className="text-16-600 text-text-primary max-tablet:text-14-600">
          {newsCard.title}
        </h2>
        <div className="text-12-500 text-text-tertiary flex items-center">
          <p>{newsCard.createdAt}</p>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;
