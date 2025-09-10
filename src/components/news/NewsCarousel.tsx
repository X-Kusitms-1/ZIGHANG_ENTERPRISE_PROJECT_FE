"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
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
    <Carousel
      className="relative w-full max-w-[900px]"
      opts={{
        align: "start",
        dragFree: false,
        containScroll: "trimSnaps",
        slidesToScroll: 1,
      }}
    >
      <CarouselContent className="max-tablet:space-x-2 w-full space-x-5">
        {newsCards.map((newsCard, index) => (
          <CarouselItem
            key={`${newsCard.url}-${index}`}
            className="max-pc:max-w-[180px] md:basis-1/2 lg:basis-1/3"
          >
            <NewsCard newsCard={newsCard} />
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* Left gradient overlay (white -> transparent) */}
      <div
        className="pointer-events-none absolute top-0 left-0 z-20 h-full w-[100px]"
        style={{
          background:
            "linear-gradient(90deg, #FFF 0%, rgba(255, 255, 255, 0) 100%)",
        }}
      />
      {/* Right gradient overlay */}
      <div
        className="pointer-events-none absolute top-0 right-0 z-20 h-full w-[100px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #FFF 100%)",
        }}
      />
      {newsCards.length > 1 && <CarouselPrevious />}
      {newsCards.length > 1 && <CarouselNext />}
    </Carousel>
  );
}

export default NewsCarousel;
