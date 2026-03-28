import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  const user = await currentUser();

  // ✅ FIX 1: never return null
  if (!user) {
    throw new Error("Unauthorized - Please login");
  }

  try {
    // ✅ check DB user
    let loggedInUser = await db.user.findUnique({
      where: {
        clerkUserId: user.id,
      },
    });

    // ✅ agar mil gaya → return
    if (loggedInUser) {
      return JSON.parse(JSON.stringify(loggedInUser)); // 🔥 plain object
    }

    // ✅ create new user
    const name = `${user.firstName || ""} ${user.lastName || ""}`.trim();

    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl || "",
        email: user.emailAddresses?.[0]?.emailAddress || "",
      },
    });

    // ✅ return safe object
    return JSON.parse(JSON.stringify(newUser));

  } catch (error) {
    console.error("❌ checkUser error:", error);
    throw error; // 🔥 important
  }
};