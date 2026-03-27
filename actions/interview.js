"use server";

import { checkUser } from "@/lib/checkUser"; // ✅ GLOBAL USE
import { db } from "@/lib/prisma";
import OpenAI from "openai";

// ✅ OpenRouter setup
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// ================= GENERATE QUIZ =================

export async function generateQuiz() {
  // const user = await checkUser();

  const prompt = `
Generate exactly 10 technical MCQ questions for web development.

Return ONLY valid JSON. No explanation, no markdown.

Format:
{
  "questions": [
    {
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctAnswer": "string",
      "explanation": "string"
    }
  ]
}
`;

  try {
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
      throw new Error("No JSON found");
    }

    const quiz = JSON.parse(text.substring(start, end + 1));

    return quiz.questions;

  } catch (error) {
    console.error("❌ Quiz Error:", error);
    throw new Error("Failed to generate quiz questions");
  }
}

// ================= SAVE RESULT =================

export async function saveQuizResult(questions, answers, score) {
  const user = await checkUser();

  const questionResults = questions.map((q, index) => ({
    question: q.question,
    answer: q.correctAnswer,
    userAnswer: answers[index],
    isCorrect: q.correctAnswer === answers[index],
    explanation: q.explanation,
  }));

  const wrongAnswers = questionResults.filter((q) => !q.isCorrect);

  let improvementTip = null;

  if (wrongAnswers.length > 0) {
    const wrongQuestionsText = wrongAnswers
      .map(
        (q) =>
          `Question: "${q.question}"
Correct Answer: "${q.answer}"
User Answer: "${q.userAnswer}"`
      )
      .join("\n\n");

    const improvementPrompt = `
The user got these ${user.industry || "general"} questions wrong:

${wrongQuestionsText}

Give a short improvement tip (max 2 sentences).
Focus on what to learn.
`;

    try {
      const response = await openai.chat.completions.create({
        model: "meta-llama/llama-3-8b-instruct",
        messages: [{ role: "user", content: improvementPrompt }],
      });

      improvementTip = response.choices[0].message.content?.trim();
    } catch (error) {
      console.error("Tip Error:", error);
    }
  }

  try {
    return await db.assessment.create({
      data: {
        userId: user.id,
        quizScore: score,
        questions: questionResults,
        category: "Technical",
        improvementTip,
      },
    });
  } catch (error) {
    console.error("DB Error:", error);
    throw new Error("Failed to save quiz result");
  }
}

// ================= GET RESULTS =================

export async function getAssessments() {
  const user = await checkUser();

  return await db.assessment.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
  });
}