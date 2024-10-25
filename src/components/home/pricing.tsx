import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { pricingCards } from "../common/pricint-plan";

export const Pricing = () => {
  return (
    <div className="py-6 md:py-8 lg:py-12" id="pricing">
      <div className="text-center pb-5">
        <h2 className="text-2xl font-bold">Choose what fits you most</h2>
        <p>We are offer affordable price. We are always with yours</p>
      </div>
      <div className="flex flex-wrap justify-center gap-5">
        {pricingCards.map((item) => (
          <Card
            key={item.title}
            className={cn(
              "w-96",
              item.title === "Ultimate" && "border-orange-500"
            )}
          >
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-orange-500">
                {item.title}
              </CardTitle>
              <CardDescription>{item.description}</CardDescription>
              <CardTitle className="text-2xl font-bold">
                {item.price}
                <span className="text-sm">/ month</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {item.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <Check />
                  <p>{feature}</p>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Link
                href={`/dashboard?plan=${item.title}`}
                className="w-full text-center font-bold rounded-md bg-orange-300 border-orange-500 p-2"
              >
                Get Started
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
