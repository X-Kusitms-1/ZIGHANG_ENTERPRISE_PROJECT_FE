"use client";

import React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { bannerItems } from "@/constants/bannerItems";

function Banner() {
  return (
    <Carousel
      className="mx-auto my-8 w-full max-w-[900px]"
      opts={{ loop: true }}
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent className="mx-auto w-full">
        {bannerItems.map((item) => (
          <CarouselItem key={item.id} className="w-full">
            <Image
              src={item.image}
              alt={`Banner ${item.id}`}
              width={1070}
              height={140}
              className="object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}

export default Banner;
