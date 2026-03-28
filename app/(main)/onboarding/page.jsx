import { redirect } from "next/navigation";
import { industries } from "@/data/industries";
import OnboardingForm from "./_components/onboarding-form";
import { getUserOnboardingStatus } from "@/actions/user";

export default async function OnboardingPage() {
  const { isOnboarded } = await getUserOnboardingStatus();

  // ✅ redirect ko direct use karo (NO try-catch)
  if (isOnboarded) {
    redirect("/dashboard");
  }

  return (
    <main className="flex flex-col items-center justify-center mt-10">
      <h1 className="text-2xl font-bold mb-6">
        Complete Your Profile 🚀
      </h1>

      <OnboardingForm industries={industries} />
    </main>
  );
}