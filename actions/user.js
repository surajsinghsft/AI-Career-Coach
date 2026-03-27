"use server";

import { db } from "@/lib/prisma";
import { checkUser } from "@/lib/checkUser";
import { revalidatePath } from "next/cache";
import { generateAIInsights } from "./dashboard";

// ================= UPDATE USER =================

export async function updateUser(data) {
  const user = await checkUser();

  try {
    // ✅ Industry normalize
    const formattedIndustry = data.industry
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .trim();

    if (!formattedIndustry) {
      throw new Error("Industry is required");
    }

    // ✅ Skills normalize (safe)
    const formattedSkills = Array.isArray(data.skills)
      ? data.skills
      : data.skills
      ? data.skills.split(",").map((s) => s.trim())
      : [];

    // ================= IMPORTANT FIX 🔥 =================
    // ❌ NO AI CALL INSIDE TRANSACTION

    // ✅ STEP 1: check industry outside transaction
    let industryInsight = await db.industryInsight.findUnique({
      where: { industry: formattedIndustry },
    });

    // ✅ STEP 2: AI generate outside transaction
    if (!industryInsight) {
      const insights = await generateAIInsights(formattedIndustry);

      // ✅ Use UPSERT (avoid duplicate crash)
      industryInsight = await db.industryInsight.upsert({
        where: { industry: formattedIndustry },
        update: {},
        create: {
          industry: formattedIndustry,
          ...insights,
          nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        },
      });
    }

    // ✅ STEP 3: ONLY DB update
    const updatedUser = await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        industry: formattedIndustry,
        experience: data.experience || 0,
        bio: data.bio || "",
        skills: formattedSkills,
      },
    });

    revalidatePath("/");
    return updatedUser;

  } catch (error) {
    console.error("🔥 REAL ERROR:", error);

    // ❌ DO NOT HIDE ERROR
    throw error;
  }
}

// ================= ONBOARDING STATUS =================

export async function getUserOnboardingStatus() {
  const user = await checkUser();

  return {
    isOnboarded: !!user?.industry,
  };
}