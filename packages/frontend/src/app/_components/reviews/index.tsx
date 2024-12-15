import { Star } from "lucide-react";
import React from "react";
import useEmblaCarousel, { EmblaCarouselType } from "embla-carousel-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const ReviewsSection = () => {
  const options: EmblaCarouselType = {
    align: "start",
    containScroll: "trimSnaps",
    loop: true,
    slidesToScroll: 1,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const reviews = [
    {
      id: 1,
      name: "Rahim Ahmed",
      avatar: "/drinks.avif",
      review:
        "The catering service was exceptional! The food was delicious and the presentation was beautiful. Highly recommended!",
      rating: 5,
    },
    {
      id: 2,
      name: "Fatima Khan",
      avatar: "/drinks.avif",
      review:
        "I was impressed by the variety of options and the quality of the food. The staff was also very professional and courteous.",
      rating: 4,
    },
    {
      id: 3,
      name: "Kamal Hossain",
      avatar: "/drinks.avif",
      review:
        "Our corporate event was a success thanks to the amazing catering. The attention to detail was outstanding.",
      rating: 5,
    },
    {
      id: 4,
      name: "Rahim Ahmed",
      avatar: "/drinks.avif",
      review:
        "The catering service was exceptional! The food was delicious and the presentation was beautiful. Highly recommended!",
      rating: 5,
    },
    {
      id: 5,
      name: "Fatima Khan",
      avatar: "/drinks.avif",
      review:
        "I was impressed by the variety of options and the quality of the food. The staff was also very professional and courteous.",
      rating: 4,
    },
    {
      id: 6,
      name: "Kamal Hossain",
      avatar: "/drinks.avif",
      review:
        "Our corporate event was a success thanks to the amazing catering. The attention to detail was outstanding.",
      rating: 5,
    },
    {
      id: 7,
      name: "Rahim Ahmed",
      avatar: "/drinks.avif",
      review:
        "The catering service was exceptional! The food was delicious and the presentation was beautiful. Highly recommended!",
      rating: 5,
    },
    {
      id: 8,
      name: "Fatima Khan",
      avatar: "/drinks.avif",
      review:
        "I was impressed by the variety of options and the quality of the food. The staff was also very professional and courteous.",
      rating: 4,
    },
    {
      id: 9,
      name: "Kamal Hossain",
      avatar: "/drinks.avif",
      review:
        "Our corporate event was a success thanks to the amazing catering. The attention to detail was outstanding.",
      rating: 5,
    },
    {
      id: 10,
      name: "Kamal Hossain",
      avatar: "/drinks.avif",
      review:
        "Our corporate event was a success thanks to the amazing catering. The attention to detail was outstanding.",
      rating: 5,
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Customers Say
          </h2>
          {/* <p className="text-muted-foreground max-w-3xl mx-auto text-base"></p> */}
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-lg" ref={emblaRef}>
            <div className="flex -mx-4">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="flex-[0_0_100%] min-w-0 px-4 sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%]"
                >
                  <Card
                    key={review.id}
                    className="transition-all duration-300 hover:shadow-lg cursor-pointer"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="relative w-12 h-12 mr-4">
                          <Image
                            src={review.avatar}
                            alt={review.name}
                            fill
                            className="rounded-full object-cover select-none"
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold select-none text-primary">
                            {review.name}
                          </h3>
                          <div className="flex">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 select-none">
                        {review.review}
                      </p>
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

export default ReviewsSection;
