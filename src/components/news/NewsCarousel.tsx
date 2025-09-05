"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import NewsCard from "@/components/news/NewsCard";

export interface NewsCardType {
  title: string;
  url: string;
  publishedAt: string;
  thumbnailUrl: string;
}

interface NewsCarouselProps {
  newsCards: NewsCardType[];
}

function NewsCarousel({ newsCards }: NewsCarouselProps) {
  return (
    <Carousel className="w-full max-w-[900px]">
      <CarouselContent className="max-tablet:space-x-2 w-full space-x-5">
        {newsCards.map((newsCard) => (
          <CarouselItem
            key={newsCard.url}
            className="max-tablet:max-w-[180px] md:basis-1/2 lg:basis-1/3"
          >
            <NewsCard newsCard={newsCard} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}

export default NewsCarousel;
