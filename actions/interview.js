"use server";

import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/prisma";
import OpenAI from "openai";

// ✅ OpenRouter setup
const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

// ✅ SAFE CONVERTER (better version)
function toPlainObject(data) {
  return JSON.parse(JSON.stringify(data ?? null));
}

// ================= GENERATE QUIZ =================

export async function generateQuiz() {
  try {
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

    const response = await openai.chat.completions.create({
      model: "meta-llama/llama-3-8b-instruct",
      messages: [{ role: "user", content: prompt }],
    });

    // ❗ ONLY extract string
    let text = response?.choices?.[0]?.message?.content || "";

    if (!text) throw new Error("Empty response");

    // remove markdown
    text = text.replace(/```json|```/g, "").trim();

    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");

    if (start === -1 || end === -1) {
      throw new Error("Invalid JSON format");
    }

    const parsed = JSON.parse(text.substring(start, end + 1));

    // ✅ RETURN ONLY SAFE ARRAY
    return toPlainObject(parsed?.questions || []);

  } catch (error) {
    console.error("❌ Quiz Error:", error);
    throw new Error("Failed to generate quiz questions");
  }
}

// ================= SAVE RESULT =================

export async function saveQuizResult(questions, answers, score) {
  try {
    const user = await checkUser();

    // ✅ FORCE SAFE INPUT
    const safeQuestions = toPlainObject(questions || []);
    const safeAnswers = toPlainObject(answers || []);

    const questionResults = safeQuestions.map((q, index) => ({
      question: q?.question || "",
      answer: q?.correctAnswer || "",
      userAnswer: safeAnswers[index] || "",
      isCorrect: q?.correctAnswer === safeAnswers[index],
      explanation: q?.explanation || "",
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
The user got these ${user?.industry || "general"} questions wrong:

${wrongQuestionsText}

Give a short improvement tip (max 2 sentences).
Focus on what to learn.
`;

      try {
        const response = await openai.chat.completions.create({
          model: "meta-llama/llama-3-8b-instruct",
          messages: [{ role: "user", content: improvementPrompt }],
        });

        improvementTip =
          response?.choices?.[0]?.message?.content?.trim() || null;
      } catch (error) {
        console.error("Tip Error:", error);
      }
    }

    const result = await db.assessment.create({
      data: {
        userId: user.id,
        quizScore: score,
        questions: questionResults,
        category: "Technical",
        improvementTip,
      },
    });

    // ✅ FINAL FIX (IMPORTANT)
    return toPlainObject(result);

  } catch (error) {
    console.error("DB Error:", error);
    throw new Error("Failed to save quiz result");
  }
}

// ================= GET RESULTS =================

export async function getAssessments() {
  try {
    const user = await checkUser();

    const data = await db.assessment.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "asc" },
    });

    // ✅ SAFE RETURN
    return toPlainObject(data);

  } catch (error) {
    console.error("Fetch Error:", error);
    throw new Error("Failed to fetch assessments");
  }
}