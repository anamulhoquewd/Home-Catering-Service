import {
  CakeIcon,
  BriefcaseIcon,
  CalendarIcon,
  ChefHatIcon,
} from "lucide-react";
import PackageCategory from "./components/category";

export default function PackagesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid gap-16">
        <PackageCategory
          title="Party Packages"
          description="Designed for celebrations like birthdays, weddings, anniversaries, or corporate events."
          icon={<CakeIcon className="w-8 h-8 text-primary" />}
          image="/party.avif"
          packages={[
            {
              name: "Birthday Party Special",
              description: "Cake, fried chicken, biryani, soft drinks.",
              price: "Starting at $5000",
              image: "/birthday-party.avif",
            },
            {
              name: "Corporate Event Meal",
              description:
                "Buffet-style menu with starters, main course, and beverages.",
              price: "Starting at $15000",
              image: "/people-meeting.avif",
            },
            {
              name: "Wedding Feast",
              description:
                "Traditional dishes like Kacchi Biryani, chicken roast, fish curry, and sweets.",
              price: "Custom pricing",
              image: "/wedding-feast.avif",
            },
          ]}
        />

        <PackageCategory
          title="Daily Meals"
          description="Affordable and convenient meal packages for lunch and dinner."
          icon={<BriefcaseIcon className="w-8 h-8 text-primary" />}
          image="/daily-meals.avif"
          packages={[
            {
              name: "Lunch Box",
              description:
                "Rice, chicken curry, vegetable curry, dal, and salad.",
              price: "$250 per meal",
              image: "/lunch-box.avif",
            },
            {
              name: "Dinner Package",
              description: "Paratha, beef curry, and sweet yogurt.",
              price: "$200 per meal",
              image: "/dinner-box.avif",
            },
            {
              name: "Veg-only Option",
              description: "Assorted vegetable curries, rice, and fruit salad.",
              price: "$180 per meal",
              image: "/veg-only.avif",
            },
          ]}
        />

        <PackageCategory
          title="Seasonal Specials"
          description="Highlight specific dishes or offers that align with the season or festivals."
          icon={<CalendarIcon className="w-8 h-8 text-primary" />}
          image="/premium-cake.jpg"
          packages={[
            {
              name: "Winter Specials",
              description: "Pitha (cakes), khichuri with beef curry, and soup.",
              price: "Starting at $300",
              image: "/cake.avif",
            },
            {
              name: "Summer Specials",
              description: "Cooling drinks, mango dishes, or cold salads.",
              price: "Starting at $250",
              image: "/drinks.avif",
            },
            {
              name: "Ramadan Iftar Combo",
              description: "Dates, jilapi, piyaju, chola, and drinks.",
              price: "$500 per person",
              image: "/ifter.webp",
            },
          ]}
        />

        <PackageCategory
          title="Premium Catering Services"
          description="Focus on high-end, premium experiences for clients who want luxurious meals and presentation."
          icon={<ChefHatIcon className="w-8 h-8 text-primary" />}
          image="/premium-catering.avif"
          packages={[
            {
              name: "Fine Dining Menu",
              description:
                "Grilled salmon, lobster thermidor, creamy pasta, and gourmet desserts.",
              price: "Starting at $3000 per person",
              image: "/grilled-salmon.avif",
            },
            {
              name: "Buffet Setup",
              description:
                "Professional presentation, live cooking stations, and premium cutlery.",
              price: "Custom pricing",
              image: "/buffet-setup.avif",
            },
            {
              name: "Customizable Menu",
              description:
                "Allow clients to select dishes based on their preferences and themes.",
              price: "Custom pricing",
              image: "/customizable.avif",
            },
          ]}
        />
      </div>
    </div>
  );
}
