import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, UtensilsCrossed, Salad, Coffee } from "lucide-react";

const services = [
  {
    title: "Package System",
    description: "Customizable catering packages for all your events.",
    icon: <Package className="h-8 w-8 text-primary" />,
    link: "/packages",
    buttonText: "Explore Package",
  },
  {
    title: "Lunch and Dinner Meals",
    description: "Delicious, ready-to-eat meals for your daily needs.",
    icon: <UtensilsCrossed className="h-8 w-8 text-primary" />,
    link: "/meals",
    buttonText: "View Menu",
  },
  {
    title: "Diet Meals",
    description:
      "Healthy and balanced meals tailored to your dietary requirements.",
    icon: <Salad className="h-8 w-8 text-primary" />,
    link: "/diet-meals",
    buttonText: "Explore Diet Options",
  },
  {
    title: "Snacks & Beverages",
    description: "Perfect complements to your meals or standalone treats.",
    icon: <Coffee className="h-8 w-8 text-primary" />,
    link: "/snacks-and-beverages",
    buttonText: "Browse Selection",
  },
];

const ServiceSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-base">
            Explore our tailored services, including customizable catering
            packages, daily meals, healthy diet options, and delightful snacks &
            beverages—crafted to meet your every need with quality and care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <CardTitle className="text-center text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <p className="text-center text-gray-600 mb-4 line-clamp-2">
                  {service.description}
                </p>
                <Button asChild variant="primary" className="w-full">
                  <Link href={service.link}>{service.buttonText}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
