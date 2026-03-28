import { getAssessments } from "@/actions/interview";
import StatsCards from "./_components/stats-cards";
import PerformanceChart from "./_components/performace-chart";
import QuizList from "./_components/quiz-list";

export default async function InterviewPrepPage() {
  let assessments = [];

  try {
    const data = await getAssessments();

    // ✅ ensure always array
    assessments = Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("❌ Fetch assessments error:", error);
    assessments = [];
  }

  return (
    <div className="space-y-6">
      
      {/* 🔥 Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-4xl md:text-6xl font-bold gradient-title">
          Interview Preparation
        </h1>
      </div>

      {/* 📊 Content */}
      <StatsCards assessments={assessments} />
      <PerformanceChart assessments={assessments} />
      <QuizList assessments={assessments} />
    </div>
  );
}