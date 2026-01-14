"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { data } from "@/data";
import { ArrowRight } from "lucide-react";

const easeOut = [0.25, 0.46, 0.45, 0.94] as const;

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

const imageItem = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easeOut,
    },
  },
};

export function Hero() {
  const { hero } = data;

  return (
    <section id="hero" className="relative min-h-screen py-6 md:py-10 lg:py-12 overflow-hidden bg-background">
      <div className="container px-4 md:px-6 lg:px-8 mx-auto max-w-[1400px]">
        {/* Main Grid: Left Content + Right Bento */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">

          {/* Left Column - Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:w-[38%] flex flex-col min-h-[500px] lg:min-h-[680px]"
          >
            {/* Rotating Badge */}
            <motion.div variants={item} className="relative w-24 h-24 md:w-28 md:h-28 mb-8">
              <motion.svg
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                viewBox="0 0 100 100"
                className="w-full h-full"
              >
                <defs>
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  />
                </defs>
                <text className="fill-foreground text-[8px] tracking-[0.25em] uppercase font-medium">
                  <textPath href="#circlePath">
                    {hero.badge.text}
                  </textPath>
                </text>
              </motion.svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-foreground flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6 -rotate-45" />
                </div>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={item}
              className="text-[clamp(2.2rem,4.5vw,3.5rem)] font-bold tracking-tight leading-[1.1] flex-grow flex items-center"
            >
              {hero.headline}
            </motion.h1>

            {/* CTA Button */}
            <motion.div variants={item} className="mt-6 mb-10">
              <Link
                href={hero.cta.href}
                className="group inline-flex items-center gap-3 px-7 py-4 bg-foreground text-background rounded-full font-medium text-sm hover:bg-foreground/90 transition-colors"
              >
                {hero.cta.label}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Testimonial */}
            <motion.div variants={item} className="pt-8 border-t border-border/40">
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-[320px]">
                "{hero.testimonial.quote}"
              </p>
              <p className="font-medium text-lg italic font-serif">
                {hero.testimonial.author}
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column - Bento Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="lg:w-[62%] h-[500px] sm:h-[550px] lg:h-[680px]"
          >
            {/* Bento Grid - CSS Grid with specific areas */}
            <div className="grid grid-cols-3 grid-rows-[repeat(4,1fr)] gap-3 md:gap-4 h-full">

              {/* Image 1 - Tall Left (Orange) - spans 3 rows */}
              <motion.div
                variants={imageItem}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="col-span-1 row-span-3 rounded-[24px] md:rounded-[32px] overflow-hidden relative"
                style={{ backgroundColor: hero.images[0]?.bgColor || "#f97316" }}
              >
                <Image
                  src={hero.images[0]?.src || ""}
                  alt={hero.images[0]?.alt || ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 25vw"
                />
              </motion.div>

              {/* Image 2 - Middle Tall (Teal) - spans 3 rows */}
              <motion.div
                variants={imageItem}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="col-span-1 row-span-3 rounded-[24px] md:rounded-[32px] overflow-hidden relative"
                style={{ backgroundColor: hero.images[1]?.bgColor || "#14b8a6" }}
              >
                <Image
                  src={hero.images[1]?.src || ""}
                  alt={hero.images[1]?.alt || ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 25vw"
                />
              </motion.div>

              {/* Top Right Column - Image 3 + Image 4 stacked */}
              <div className="col-span-1 row-span-3 flex flex-col gap-3 md:gap-4">
                {/* Image 3 - Yellow with decorative element */}
                <motion.div
                  variants={imageItem}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="flex-1 rounded-[24px] md:rounded-[32px] overflow-hidden relative"
                  style={{ backgroundColor: hero.images[2]?.bgColor || "#fbbf24" }}
                >
                  <Image
                    src={hero.images[2]?.src || ""}
                    alt={hero.images[2]?.alt || ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 33vw, 20vw"
                  />
                  {/* Decorative circles */}
                  <div className="absolute -top-1 -right-1 w-8 h-8 md:w-10 md:h-10">
                    <svg viewBox="0 0 32 32" className="w-full h-full">
                      <circle cx="10" cy="12" r="8" fill="#f97316" />
                      <circle cx="22" cy="12" r="8" fill="#dc2626" />
                    </svg>
                  </div>
                </motion.div>

                {/* Image 4 - Light Blue */}
                <motion.div
                  variants={imageItem}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="flex-1 rounded-[24px] md:rounded-[32px] overflow-hidden relative"
                  style={{ backgroundColor: hero.images[3]?.bgColor || "#e0f2fe" }}
                >
                  <Image
                    src={hero.images[3]?.src || ""}
                    alt={hero.images[3]?.alt || ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 33vw, 20vw"
                  />
                </motion.div>
              </div>

              {/* Bottom Row - Image 5, Image 6, and Feature Indicator */}
              {/* Image 5 - Mint/Green (bottom left) */}
              <motion.div
                variants={imageItem}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="col-span-1 row-span-1 rounded-[24px] md:rounded-[32px] overflow-hidden relative"
                style={{ backgroundColor: hero.images[5]?.bgColor || "#dcfce7" }}
              >
                <Image
                  src={hero.images[5]?.src || ""}
                  alt={hero.images[5]?.alt || ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 20vw"
                />
              </motion.div>

              {/* Image 6 - Pale Yellow (bottom middle) */}
              <motion.div
                variants={imageItem}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="col-span-1 row-span-1 rounded-[24px] md:rounded-[32px] overflow-hidden relative"
                style={{ backgroundColor: hero.images[4]?.bgColor || "#fef3c7" }}
              >
                <Image
                  src={hero.images[4]?.src || ""}
                  alt={hero.images[4]?.alt || ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 33vw, 20vw"
                />
              </motion.div>

              {/* Feature Indicator - Bottom Right */}
              <motion.div
                variants={item}
                className="col-span-1 row-span-1 flex flex-col justify-end pb-2"
              >
                <div className="flex items-baseline gap-2 md:gap-3">
                  <span className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                    {hero.featureIndicator.number}
                  </span>
                  <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">
                    {hero.featureIndicator.label}
                  </span>
                </div>
                <p className="text-sm md:text-base font-medium mt-1 leading-tight">
                  {hero.featureIndicator.description}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
