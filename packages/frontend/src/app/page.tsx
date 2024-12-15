"use client";
import Footer from "./_components/footer";
import HeaderComponent from "./_components/header";
import HeroSection from "./_components/hero";
import SimplifiedMenu from "./_components/menus";
import ProductsSlider from "./_components/product-slides";
import ReviewsSection from "./_components/reviews";
import ServiceSection from "./_components/services";
import Slider from "./_components/slider";

export default function Home() {
  return (
    <div>
      <HeaderComponent />
      <HeroSection />
      {/* <Slider /> */}
      <SimplifiedMenu />
      <ServiceSection />
      <ProductsSlider />
      <ReviewsSection />
      <Footer />
    </div>
  );
}
