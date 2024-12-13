import React from "react";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const ProductSlider = () => {
  const options: EmblaCarouselType = {
    align: "start",
    containScroll: "trimSnaps",
    loop: true,
    slidesToScroll: 3,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const products = [
    {
      id: 1,
      name: "Special Platter",
      image:
        "https://bd-1.edkncdn.net/img/400x601/stores/656f804436b12954f25da7f7/banner/1727606270965-HRLu30CQkBNQJfdfGKqK-.webp",
    },
    {
      id: 2,
      name: "Family Feast",
      image:
        "https://bd-1.edkncdn.net/img/400x601/stores/656f804436b12954f25da7f7/banner/1727606270965-HRLu30CQkBNQJfdfGKqK-.webp",
    },
    {
      id: 3,
      name: "Lunch Special",
      image:
        "https://bd-1.edkncdn.net/img/400x601/stores/656f804436b12954f25da7f7/banner/1727606270965-HRLu30CQkBNQJfdfGKqK-.webp",
    },
    {
      id: 4,
      name: "Breakfast Box",
      image:
        "https://bd-1.edkncdn.net/img/400x601/stores/656f804436b12954f25da7f7/banner/1727606270965-HRLu30CQkBNQJfdfGKqK-.webp",
    },
    {
      id: 5,
      name: "Dinner Package",
      image:
        "https://bd-1.edkncdn.net/img/400x601/stores/656f804436b12954f25da7f7/banner/1727606270965-HRLu30CQkBNQJfdfGKqK-.webp",
    },
    {
      id: 6,
      name: "Weekend Special",
      image:
        "https://bd-1.edkncdn.net/img/400x601/stores/656f804436b12954f25da7f7/banner/1727606270965-HRLu30CQkBNQJfdfGKqK-.webp",
    },
    {
      id: 7,
      name: "Weekend Special",
      image:
        "https://bd-1.edkncdn.net/img/400x601/stores/656f804436b12954f25da7f7/banner/1727606270965-HRLu30CQkBNQJfdfGKqK-.webp",
    },
    {
      id: 7,
      name: "Weekend Special",
      image:
        "https://bd-1.edkncdn.net/img/400x601/stores/656f804436b12954f25da7f7/banner/1727606270965-HRLu30CQkBNQJfdfGKqK-.webp",
    },
    {
      id: 7,
      name: "Weekend Special",
      image:
        "https://bd-1.edkncdn.net/img/400x601/stores/656f804436b12954f25da7f7/banner/1727606270965-HRLu30CQkBNQJfdfGKqK-.webp",
    },
    {
      id: 8,
      name: "Weekend Special",
      image:
        "https://bd-1.edkncdn.net/img/400x601/stores/656f804436b12954f25da7f7/banner/1727606270965-HRLu30CQkBNQJfdfGKqK-.webp",
    },
    {
      id: 9,
      name: "Weekend Special",
      image:
        "https://bd-1.edkncdn.net/img/400x601/stores/656f804436b12954f25da7f7/banner/1727606270965-HRLu30CQkBNQJfdfGKqK-.webp",
    },
    {
      id: 10,
      name: "Weekend Special",
      image:
        "https://bd-1.edkncdn.net/img/400x601/stores/656f804436b12954f25da7f7/banner/1727606270965-HRLu30CQkBNQJfdfGKqK-.webp",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Discover Our Exclusive Products
          </h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-base">
            Explore our diverse range of products showcased in this slider. From
            elegant designs to practical solutions, every item is crafted with
            care and attention to detail. Scroll through to find the perfect
            product that suits your needs. Enjoy seamless navigation and a
            delightful viewing experience!
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-lg" ref={emblaRef}>
            <div className="flex -mx-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex-[0_0_100%] min-w-0 px-4 sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] xl:flex-[0_0_16.666%]"
                >
                  <Card className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    <CardContent className="p-0 relative aspect-[4/5] overflow-hidden rounded-lg bg-teal-900">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={400}
                        height={500}
                        className="w-full h-full object-cover opacity-90 transition-transform duration-300 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-teal-9A table. A family is having lunch. A big room.00/90 to-transparent">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-white font-bold text-lg mb-2">
                            {product.name}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <span className="text-teal-100 text-sm">
                              View Details
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="primary"
            size="icon"
            className="absolute w-6 h-6 md:w-8 md:h-8 -bottom-12 right-12 md:right-16 rounded-full"
            onClick={scrollPrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="primary"
            size="icon"
            className="absolute w-6 h-6 md:w-8 md:h-8 -bottom-12 right-4 rounded-full"
            onClick={scrollNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;
