"use server";

import { db } from "@/lib/prisma";
import { checkUser } from "@/lib/checkUser"; // ✅ GLOBAL FIX
import OpenAI from "openai";
import { revalidatePath } from "next/cache";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// ================= SAVE RESUME =================

export async function saveResume(content) {
  const user = await checkUser(); // ✅ FIX

  try {
    const resume = await db.resume.upsert({
      where: {
        userId: user.id,
      },
      update: {
        content,
      },
      create: {
        userId: user.id,
        content,
      },
    });

    revalidatePath("/resume");
    return resume;
  } catch (error) {
    console.error("Error saving resume:", error);
    throw new Error("Failed to save resume");
  }
}

// ================= GET RESUME =================

export async function getResume() {
  const user = await checkUser(); // ✅ FIX

  return await db.resume.findUnique({
    where: {
      userId: user.id,
    },
  });
}

// ================= IMPROVE WITH AI =================

export async function improveWithAI({ current, type }) {
  const user = await checkUser(); // ✅ FIX

  const prompt = `
As an expert resume writer, improve the following ${type} description for a ${user.industry || "general"} professional.
Make it more impactful, quantifiable, and aligned with industry standards.

Current content: "${current}"

Requirements:
1. Use action verbs
2. Include metrics and results where possible
3. Highlight relevant technical skills
4. Keep it concise but detailed
5. Focus on achievements over responsibilities
6. Use industry-specific keywords

Format the response as a single paragraph without any additional text.
`;

  try {
    const response = await openai.chat.completions.create({
      model: "meta-llama/llama-3-8b-instruct",
      messages: [{ role: "user", content: prompt }],
    });

    return response.choices[0].message.content?.trim();
  } catch (error) {
    console.error("Error improving content:", error);
    throw new Error("Failed to improve content");
  }
}