import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock, Star, Truck } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative bg-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-image.webp"
          alt="Family enjoying a catered meal"
          layout="fill"
          objectFit="cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-4xl font-bold leading-tight mb-6">
          Delicious Meals, Delivered to Your Doorstep
        </h1>
        <p className="text-xl md:text-2xl lg:text-2xl mb-8 max-w-3xl">
          Perfectly Crafted Catering Services for Every Occasion
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Button
            asChild
            variant="primary"
            size="lg"
          >
            <Link href="/menu">Explore Our Menu</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="bg-transparent text-secondary border-secondary hover:bg-secondary hover:text-gray-900"
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-lg">
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <Star className="h-6 w-6 text-yellow-400 flex-shrink-0" />
            <span className="text-white font-medium">Freshly Prepared</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <Truck className="h-6 w-6 text-yellow-400 flex-shrink-0" />
            <span className="text-white font-medium">Free Delivery</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <Clock className="h-6 w-6 text-yellow-400 flex-shrink-0" />
            <span className="text-white font-medium">Timely Service</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
