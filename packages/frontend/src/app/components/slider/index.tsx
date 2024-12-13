"use client";

import { useRef } from "react";
import Image from "next/image";

import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const slides = [
  {
    id: 1,
    url: "https://bd-1.edkncdn.net/img/1600x575/stores/656f804436b12954f25da7f7/banner/1733726565505-0IFxc9ZUVRfEkQ5rHixej.webp",
    alt: "Catering Slide 1",
  },
  {
    id: 2,
    url: "https://bd-1.edkncdn.net/img/1600x575/stores/656f804436b12954f25da7f7/banner/1723024550202-yGtWSjhPmfHMshMbKvWHO.webp",
    alt: "Catering Slide 2",
  },
  {
    id: 3,
    url: "https://bd-1.edkncdn.net/img/1600x575/stores/656f804436b12954f25da7f7/banner/1723092776593-zuvHz1l3h_KwWwtuwZuev.webp",
    alt: "Catering Slide 3",
  },
];

const Slider = () => {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnMouseEnter: true }));

  const arrowClasses =
    "w-6 md:w-8 h-6 md:h-8 bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100 border-none bg-primary text-primary-foreground shadow-sm hover:bg-green-600 text-secondary hover:text-secondary";

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full group"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent className="w-full m-0 ">
        {slides.map((image) => (
          <CarouselItem key={image.id} className="p-0 group">
            <Image
              src={image.url}
              width={2000}
              height={0}
              alt={image.alt}
              className="object-cover w-full m-auto cursor-pointer"
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className={`left-2 md:left-6 ${arrowClasses}`} />
      <CarouselNext className={`right-2 md:right-6 ${arrowClasses}`} />
    </Carousel>
  );
};

export default Slider;
