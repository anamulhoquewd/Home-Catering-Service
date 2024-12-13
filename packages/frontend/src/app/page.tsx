"use client";
import Footer from "./components/footer";
import HeaderComponent from "./components/header";
import HeroSection from "./components/hero";
import ProductsSlider from "./components/product-showcase";
import Slider from "./components/slider";

export default function Home() {
  return (
    <div>
      <HeaderComponent />
      <HeroSection />
      {/* <Slider /> */}
      <ProductsSlider />
      <Footer />
    </div>
  );
}
