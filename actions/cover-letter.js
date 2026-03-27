"use server";

import { db } from "@/lib/prisma";
import { checkUser } from "@/lib/checkUser"; // ✅ GLOBAL FIX
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// ================= GENERATE COVER LETTER =================

export async function generateCoverLetter(data) {
  const user = await checkUser(); // ✅ FIX

  const prompt = `
Write a professional cover letter for a ${data.jobTitle} position at ${
    data.companyName
  }.

About the candidate:
- Industry: ${user.industry || "general"}
- Years of Experience: ${user.experience || 0}
- Skills: ${user.skills?.join(", ") || "N/A"}
- Professional Background: ${user.bio || "N/A"}

Job Description:
${data.jobDescription}

Requirements:
1. Use a professional, enthusiastic tone
2. Highlight relevant skills and experience
3. Show understanding of the company's needs
4. Keep it concise (max 400 words)
5. Use proper business letter formatting in markdown
6. Include specific examples of achievements
7. Relate candidate's background to job requirements

Format the letter in markdown.
`;

  try {
    const response = await openai.chat.completions.create({
      model: "meta-llama/llama-3-8b-instruct",
      messages: [{ role: "user", content: prompt }],
    });

    const content = response.choices[0].message.content?.trim();

    return await db.coverLetter.create({
      data: {
        content,
        jobDescription: data.jobDescription,
        companyName: data.companyName,
        jobTitle: data.jobTitle,
        status: "completed",
        userId: user.id,
      },
    });

  } catch (error) {
    console.error("Error generating cover letter:", error.message);
    throw new Error("Failed to generate cover letter");
  }
}

// ================= GET ALL =================

export async function getCoverLetters() {
  const user = await checkUser(); // ✅ FIX

  return await db.coverLetter.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// ================= GET ONE =================

export async function getCoverLetter(id) {
  const user = await checkUser(); // ✅ FIX

  return await db.coverLetter.findFirst({
    where: {
      id,
      userId: user.id,
    },
  });
}

// ================= DELETE =================

export async function deleteCoverLetter(id) {
  const user = await checkUser(); // ✅ FIX

  return await db.coverLetter.deleteMany({
    where: {
      id,
      userId: user.id,
    },
  });
}