import { ReactNode } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Package {
  name: string;
  description: string;
  price: string;
  image: string;
}

interface PackageCategoryProps {
  title: string;
  description: string;
  icon: ReactNode;
  image: string;
  packages: Package[];
}

export default function PackageCategory({
  title,
  description,
  icon,
  image,
  packages,
}: PackageCategoryProps) {
  return (
    <section className="bg-gray-50 rounded-lg overflow-hidden">
      <div className="relative h-64 md:h-96">
        <Image src={image} alt={title} fill className="object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6">
          <div className="text-center">
            <div className="bg-white rounded-full p-3 inline-block mb-4">
              {icon}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {title}
            </h2>
            <p className="text-secondary md:text-lg max-w-2xl mx-auto">
              {description}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-2 md:px-6 py-6">
        {packages.map((pkg, index) => (
          <Card key={index} className="flex flex-col">
            <div className="relative h-48">
              <Image
                src={pkg.image}
                alt={pkg.name}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-primary">{pkg.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm md:text-base mb-4 line-clamp-2">
                {pkg.description}
              </p>
              <p className="font-semibold text-gray-900">{pkg.price}</p>
            </CardContent>
            <CardFooter className="flex items-end flex-1">
              <Button variant={"primary"} className="w-full">Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
