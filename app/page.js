"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";

import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { testimonial } from "@/data/testimonial";
import { faqs } from "@/data/faqs";
import { howItWorks } from "@/data/howItWorks";

export default function LandingPage() {
  return (
    <>
      {/* 🌌 Background */}
      <div className="grid-background"></div>

      {/* 🔥 Hero */}
      <HeroSection />

      {/* 💎 Premium Features */}
      <FeaturesSection />

      {/* 📊 Stats Section */}
      <section className="w-full py-20 bg-muted/30">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "50+", label: "Industries" },
            { value: "1000+", label: "Questions" },
            { value: "95%", label: "Success Rate" },
            { value: "24/7", label: "AI Support" },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-premium hover:scale-105 transition"
            >
              <h3 className="text-3xl font-bold text-primary">
                {item.value}
              </h3>
              <p className="text-muted-foreground">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ⚙️ How It Works */}
      <section className="w-full py-20">
        <div className="container mx-auto px-4 text-center space-y-12">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
            How It Works 🚀
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-premium hover:scale-105 transition"
              >
                <div className="mb-4 flex justify-center">
                  <div className="p-4 bg-gradient-premium rounded-xl shadow-premium">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🧑‍💻 Testimonials */}
      <section className="w-full py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center space-y-12">
          <h2 className="text-4xl font-bold">What Users Say 💬</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonial.map((item, index) => (
              <Card
                key={index}
                className="bg-white/5 backdrop-blur-md border border-white/10 shadow-premium"
              >
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.image}
                      width={40}
                      height={40}
                      alt={item.author}
                      className="rounded-full border"
                    />
                    <div className="text-left">
                      <p className="font-semibold">{item.author}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.role}
                      </p>
                    </div>
                  </div>

                  {/* ✅ FIXED LINE */}
                  <p className="text-sm italic text-muted-foreground">
                    {`"${item.quote}"`}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ❓ FAQ */}
      <section className="w-full py-20">
        <div className="container mx-auto px-4 max-w-3xl text-center space-y-8">
          <h2 className="text-4xl font-bold">FAQs ❓</h2>

          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 🚀 CTA */}
      <section className="w-full py-24">
        <div className="mx-auto max-w-4xl text-center space-y-6 bg-gradient-premium p-12 rounded-2xl shadow-premium">
          <h2 className="text-4xl font-bold text-white">
            Ready to Grow Your Career? 🚀
          </h2>
          <p className="text-white/80">
            Start your AI-powered journey today and unlock your potential.
          </p>

          <Link href="/dashboard">
            <Button
              size="lg"
              className="mt-4 bg-white text-black hover:scale-105 transition"
            >
              Get Started <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}