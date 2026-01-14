"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { data } from "@/data";
import { ArrowRight } from "lucide-react";

const easeOut = [0.25, 0.46, 0.45, 0.94] as const;

// Placeholder images for categories
const categoryImages: Record<string, string> = {
  "cat-1": "https://picsum.photos/seed/drillpower/240/180",
  "cat-2": "https://picsum.photos/seed/paintbrush/240/180",
  "cat-3": "https://picsum.photos/seed/nutsbolts/240/180",
  "cat-4": "https://picsum.photos/seed/steelbar/240/180",
  "cat-5": "https://picsum.photos/seed/wiring/240/180",
  "cat-6": "https://picsum.photos/seed/faucet/240/180",
  "cat-7": "https://picsum.photos/seed/handtool/240/180",
  "cat-8": "https://picsum.photos/seed/safety/240/180",
  "cat-9": "https://picsum.photos/seed/building/240/180",
  "cat-10": "https://picsum.photos/seed/garden/240/180",
};

export function Categories() {
  const { categories } = data;

  const totalProducts = categories.items.reduce(
    (acc, item) => acc + parseInt(item.productCount.replace(/\D/g, "")),
    0
  );

  // Split items into two rows
  const firstRowItems = categories.items.slice(0, 5);
  const secondRowItems = categories.items.slice(5);

  return (
    <section id="categories" className="py-12 lg:py-16 bg-background">
      <div className="container max-w-6xl mx-auto px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: easeOut }}
          className="flex items-baseline gap-4 mb-6"
        >
          <h2 className="text-xl md:text-2xl font-semibold text-foreground">
            {categories.headline}
          </h2>
          <span className="text-xl md:text-2xl font-light text-muted-foreground/50">
            {totalProducts.toLocaleString()}
          </span>
        </motion.div>

        {/* First Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-3">
          {firstRowItems.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.35,
                delay: index * 0.03,
                ease: easeOut,
              }}
            >
              <Link href={`#${category.id}`} className="group block">
                <div className="relative bg-[#f5f5f7] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] w-full p-4 pb-0 flex items-center justify-center">
                    <Image
                      src={categoryImages[category.id] || category.image}
                      alt={category.name}
                      width={160}
                      height={120}
                      className="object-contain transition-transform duration-400 group-hover:scale-105"
                    />
                  </div>

                  {/* Category Name - Bottom Left */}
                  <div className="px-4 pb-4 pt-2">
                    <span className="text-[11px] md:text-xs text-muted-foreground leading-tight block">
                      {category.name}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {secondRowItems.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.35,
                delay: (firstRowItems.length + index) * 0.03,
                ease: easeOut,
              }}
            >
              <Link href={`#${category.id}`} className="group block">
                <div className="relative bg-[#f5f5f7] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] w-full p-4 pb-0 flex items-center justify-center">
                    <Image
                      src={categoryImages[category.id] || category.image}
                      alt={category.name}
                      width={160}
                      height={120}
                      className="object-contain transition-transform duration-400 group-hover:scale-105"
                    />
                  </div>

                  {/* Category Name - Bottom Left */}
                  <div className="px-4 pb-4 pt-2">
                    <span className="text-[11px] md:text-xs text-muted-foreground leading-tight block">
                      {category.name}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* View All Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.35,
              delay: categories.items.length * 0.03,
              ease: easeOut,
            }}
          >
            <Link href="#" className="group block h-full">
              <div className="relative bg-[#f5f5f7] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 h-full flex flex-col">
                {/* Empty space to match other cards */}
                <div className="relative aspect-[4/3] w-full p-4 pb-0 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <ArrowRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                {/* Label - Bottom Left */}
                <div className="px-4 pb-4 pt-2">
                  <span className="text-[11px] md:text-xs text-muted-foreground leading-tight flex items-center gap-1">
                    All categories <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
