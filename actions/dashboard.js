"use server";

import { db } from "@/lib/prisma";
import { checkUser } from "@/lib/checkUser"; // ✅ GLOBAL FIX
import OpenAI from "openai";

// ✅ OpenRouter setup
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// ================= GENERATE INSIGHTS =================

export const generateAIInsights = async (industry) => {
  try {
    const prompt = `
Analyze the current state of the ${industry} industry and provide insights in JSON format:

{
  "salaryRanges": [
    { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
  ],
  "growthRate": number,
  "demandLevel": "High" | "Medium" | "Low",
  "topSkills": ["skill1", "skill2"],
  "marketOutlook": "Positive" | "Neutral" | "Negative",
  "keyTrends": ["trend1", "trend2"],
  "recommendedSkills": ["skill1", "skill2"]
}
`;

    const response = await openai.chat.completions.create({
      model: "meta-llama/llama-3-8b-instruct",
      messages: [{ role: "user", content: prompt }],
    });

    let text = response.choices[0].message.content;

    if (!text) throw new Error("Empty response");

    text = text.replace(/```json|```/g, "").trim();

    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");

    if (start === -1 || end === -1) {
      throw new Error("Invalid JSON");
    }

    return JSON.parse(text.substring(start, end + 1));

  } catch (error) {
    console.error("AI Error:", error);

    return {
      salaryRanges: [],
      growthRate: 0,
      demandLevel: "Medium",
      topSkills: [],
      marketOutlook: "Neutral",
      keyTrends: [],
      recommendedSkills: [],
    };
  }
};

// ================= GET INSIGHTS =================

export async function getIndustryInsights() {
  const user = await checkUser(); // ✅ FIX

  // ✅ agar user ne industry select nahi ki
  if (!user.industry) return null;

  // ✅ pehle DB me check karo
  let industryInsight = await db.industryInsight.findUnique({
    where: { industry: user.industry },
  });

  // ✅ agar nahi mila → AI se generate karo
  if (!industryInsight) {
    const insights = await generateAIInsights(user.industry);

    industryInsight = await db.industryInsight.create({
      data: {
        industry: user.industry,
        ...insights,
        nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });
  }

  return industryInsight;
}