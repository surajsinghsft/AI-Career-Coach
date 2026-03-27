"use client";
import FeaturesSection from "@/components/FeaturesSection";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative w-full pt-36 md:pt-48 pb-20 overflow-hidden">

      {/* 🌌 Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,#6366f1,transparent_60%)] opacity-20"></div>

      <div className="space-y-10 text-center px-4">

        {/* 🔥 Heading */}
        <div className="space-y-6 mx-auto max-w-4xl">
          <h1 className="text-5xl font-extrabold md:text-6xl lg:text-7xl xl:text-8xl leading-tight bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Build Your Future with
            <br />
            AI Career Coach 🚀
          </h1>

          <p className="mx-auto max-w-[650px] text-muted-foreground md:text-xl">
            Crack interviews, build skills, and grow faster with powerful AI tools designed for your success.
          </p>
        </div>

        {/* 🚀 Buttons */}
        <div className="flex justify-center gap-6 flex-wrap">

          <Link href="/dashboard">
            <Button
              size="lg"
              className="px-8 py-6 text-lg rounded-xl bg-gradient-premium shadow-premium hover:scale-105 transition-all duration-300"
            >
              Get Started 🚀
            </Button>
          </Link>

          <Link href="#">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 text-lg rounded-xl border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all"
            >
              Watch Demo ▶
            </Button>
          </Link>

        </div>

        {/* 💎 Image Section */}
        <div className="mt-16 flex justify-center">
          <div className="relative group">

            {/* Glow */}
            <div className="absolute -inset-2 bg-gradient-premium blur-2xl opacity-30 group-hover:opacity-60 transition"></div>

            {/* Image */}
            <Image
              src="/banner1.png"
              width={1200}
              height={700}
              alt="Dashboard Preview"
              className="relative rounded-2xl border border-white/10 shadow-premium backdrop-blur-md group-hover:scale-105 transition duration-500"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;