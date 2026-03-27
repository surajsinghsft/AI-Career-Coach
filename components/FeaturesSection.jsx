"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Brain, Briefcase, LineChart, Rocket } from "lucide-react";

const features = [
  {
    icon: <Brain className="w-8 h-8 text-cyan-400" />,
    title: "AI Mock Interviews",
    desc: "Practice real interview questions with AI and improve instantly.",
  },
  {
    icon: <Briefcase className="w-8 h-8 text-indigo-400" />,
    title: "Job Recommendations",
    desc: "Get personalized job suggestions based on your skills.",
  },
  {
    icon: <LineChart className="w-8 h-8 text-purple-400" />,
    title: "Career Analytics",
    desc: "Track your growth and improve your career performance.",
  },
  {
    icon: <Rocket className="w-8 h-8 text-pink-400" />,
    title: "Skill Roadmaps",
    desc: "Follow structured learning paths to reach your dream job.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden">

      {/* 🌌 Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,#06b6d4,transparent_60%)] opacity-10"></div>

      <div className="max-w-6xl mx-auto text-center space-y-12">

        {/* 🔥 Heading */}
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Powerful Features for Your Career 🚀
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything you need to grow, prepare, and succeed in your career journey.
          </p>
        </div>

        {/* 💎 Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => (
            <Card
              key={index}
              className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 hover:scale-105 transition-all duration-300 shadow-premium"
            >
              <CardContent className="space-y-4 text-center">

                {/* Icon */}
                <div className="flex justify-center">
                  <div className="p-4 rounded-xl bg-gradient-premium shadow-premium group-hover:rotate-6 transition">
                    {feature.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground">
                  {feature.desc}
                </p>

              </CardContent>
            </Card>
          ))}

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;