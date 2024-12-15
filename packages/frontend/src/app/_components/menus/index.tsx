import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const featuredItems = [
  { 
    name: "Kacchi Biryani", 
    description: "Fragrant rice dish with tender meat", 
    price: "৳350",
    image: "/premium-cake.jpg"
  },
  { 
    name: "Beef Bhuna", 
    description: "Spicy beef curry with thick gravy", 
    price: "৳300",
    image: "/premium-cake.jpg"
  },
  { 
    name: "Roshogolla", 
    description: "Sweet cheese balls in syrup", 
    price: "৳40",
    image: "/premium-cake.jpg"
  },
  { 
    name: "Borhani", 
    description: "Spicy yogurt drink", 
    price: "৳50",
    image: "/premium-cake.jpg"
  },
]

export default function SimplifiedMenu() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Menu Items</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredItems.map((item, index) => (
            <Card key={index} className="overflow-hidden">
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
              <CardFooter className="flex justify-between items-center">
                <span className="text-lg font-bold text-primary">{item.price}</span>
                <Button variant="primary">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Button variant="primary" asChild size="lg">
            <Link href="/menu">View Full Menu</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

