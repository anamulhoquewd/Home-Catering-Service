"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const menuCategories = [
  {
    name: "Kacchi Biryani",
    description:
      "Fragrice dish with tender mearagrant rice dish with tender meat",
    price: "৳350",
    image: "/premium-cake.jpg",
  },
  {
    name: "Beef Bhuna",
    description: "Spicy beef curry with thick gravy",
    price: "৳300",
    image: "/premium-cake.jpg",
  },
  {
    name: "Roshogolla",
    description: "Sweet cheese balls in syrup",
    price: "৳40",
    image: "/premium-cake.jpg",
  },
  {
    name: "Borhani",
    description: "Spicy yogurt drink",
    price: "৳50",
    image: "/premium-cake.jpg",
  },
  {
    name: "Kacchi Biryani",
    description: "Fragrant rice dish with tender meat",
    price: "৳350",
    image: "/premium-cake.jpg",
  },
  {
    name: "Beef Bhuna",
    description: "Spicy beef curry with thick gravy",
    price: "৳300",
    image: "/premium-cake.jpg",
  },
  {
    name: "Roshogolla",
    description: "Sweet cheese balls in syrup",
    price: "৳40",
    image: "/premium-cake.jpg",
  },
  {
    name: "Borhani",
    description: "Spicy yogurt drink",
    price: "৳50",
    image: "/premium-cake.jpg",
  },
  {
    name: "Kacchi Biryani",
    description: "Fragrant rice dish with tender meat",
    price: "৳350",
    image: "/premium-cake.jpg",
  },
  {
    name: "Beef Bhuna",
    description: "Spicy beef curry with thick gravy",
    price: "৳300",
    image: "/premium-cake.jpg",
  },
  {
    name: "Roshogolla",
    description: "Sweet cheese balls in syrup",
    price: "৳40",
    image: "/premium-cake.jpg",
  },
  {
    name: "Borhani",
    description: "Spicy yogurt drink",
    price: "৳50",
    image: "/premium-cake.jpg",
  },
  {
    name: "Kacchi Biryani",
    description: "Fragrant rice dish with tender meat",
    price: "৳350",
    image: "/premium-cake.jpg",
  },
  {
    name: "Beef Bhuna",
    description: "Spicy beef curry with thick gravy",
    price: "৳300",
    image: "/premium-cake.jpg",
  },
  {
    name: "Roshogolla",
    description: "Sweet cheese balls in syrup",
    price: "৳40",
    image: "/premium-cake.jpg",
  },
  {
    name: "Borhani",
    description: "Spicy yogurt drink",
    price: "৳50",
    image: "/premium-cake.jpg",
  },
];

export default function MenuPage() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="bg-gray-50 rounded-lg overflow-hidden py-6 flex flex-col gap-20">
        <div className="relative h-64 md:h-96">
          <Image src={"/party.avif"} alt={"title"} fill className="object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6">
            <div className="text-center">
              <div className="bg-white rounded-full p-3 inline-block mb-4">
                {"icon"}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {"title"}
              </h2>
              <p className="text-secondary md:text-lg max-w-2xl mx-auto">
                {"description"}
              </p>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Menu Items
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {menuCategories.map((item, index) => (
              <Card key={index} className="overflow-hidden flex flex-col">
                <div className="relative h-48">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardFooter className="flex flex-1 justify-between items-end">
                  <span className="text-lg font-bold text-primary">
                    {item.price}
                  </span>
                  <Button variant="primary">Add to Cart</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
