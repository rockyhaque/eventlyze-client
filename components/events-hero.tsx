
"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useQueryState } from "nuqs";

const categories = [
  { name: "All", value: "ALL" },
  { name: "Music", value: "MUSIC" },
  { name: "Technology", value: "TECHNOLOGY" },
  { name: "Art", value: "ART" },
  { name: "Business", value: "BUSINESS" },
  { name: "Food & Drink", value: "FOOD-AND-DRINK" },
  { name: "Sports", value: "SPORTS" },
];

interface IEventsFilterParams {
  refetchEvents: () => Promise<void>;
}

export function EventsHero({ refetchEvents }: IEventsFilterParams) {
  const [categoryState, setCategory] = useQueryState("category", {
    defaultValue: "",
  });

  const handleCategory = (value: string) => {
    if (value === "ALL") {
      setCategory(null).then(() => {
        refetchEvents();
      });
    } else {
      setCategory(value).then(() => {
        refetchEvents();
      });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-4">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] h-[500px] w-[500px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute -bottom-[10%] -left-[10%] h-[300px] w-[300px] rounded-full bg-secondary/10 blur-[100px]" />

        {/* Decorative patterns */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 h-20 w-20 rounded-full border border-primary/20" />
          <div className="absolute top-40 right-40 h-32 w-32 rounded-full border border-secondary/20" />
          <div className="absolute bottom-20 left-1/3 h-16 w-16 rounded-full border border-accent/20" />
        </div>
      </div>

      <div className="container ">
        <div className="mx-auto max-w-4xl text-center justify-center">
          <motion.h1
            className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Discover <span className="gradient-text">Extraordinary</span> Events
          </motion.h1>

          <motion.p
            className="mt-4 text-lg text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Find and join events that match your interests, connect with
            like-minded people, and create unforgettable memories
          </motion.p>

          <motion.div
            className="mt-8 rounded-xl bg-card p-4 shadow-lg md:p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mt-4 flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  onClick={() => handleCategory(category.value)}
                  variant={
                    category.value === "ALL" && !categoryState
                      ? "default"
                      : category.value === categoryState
                        ? "default"
                        : "outline"
                  }
                  size="sm"
                  className={
                    (category.value === "ALL" && !categoryState) ||
                      category.value === categoryState
                      ? "bg-primary text-white"
                      : ""
                  }
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          ></motion.div>
        </div>
      </div>
    </section>
  );
}