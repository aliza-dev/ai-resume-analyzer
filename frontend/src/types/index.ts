export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isPro?: boolean;
  aiCredits?: number;
  createdAt: string;
}

export type UserRole =
  | "fresher"
  | "developer"
  | "software_engineer"
  | "ai_engineer"
  | "ai_ml_engineer"
  | "other";

export const USER_ROLES: { value: UserRole; label: string }[] = [
  { value: "fresher", label: "Fresher" },
  { value: "developer", label: "Developer" },
  { value: "software_engineer", label: "Software Engineer" },
  { value: "ai_engineer", label: "AI Engineer" },
  { value: "ai_ml_engineer", label: "AI/ML Engineer" },
  { value: "other", label: "Other" },
];

export interface Resume {
  id: string;
  userId: string;
  fileUrl: string;
  fileName: string;
  atsScore: number | null;
  createdAt: string;
  analysis?: Analysis;
}

export interface Analysis {
  id: string;
  resumeId: string;
  skillsScore: number;
  experienceScore: number;
  educationScore: number;
  projectsScore: number;
  jobMatchScore: number;
  suggestions: string[];
  keywords: string[];
  missingKeywords: string[];
  metrics?: {
    grammarScore: number;
    impactScore: number;
    formattingScore: number;
    keywordScore: number;
  };
}

export interface JobMatch {
  overallScore: number;
  skillMatch: number;
  experienceMatch: number;
  educationMatch: number;
  keywordsFound: string[];
  missingKeywords: string[];
  suggestions: string[];
}

export interface DashboardStats {
  totalResumes: number;
  averageAtsScore: number;
  bestAtsScore: number;
  recentAnalyses: Analysis[];
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface InterviewQuestion {
  category: string;
  question: string;
  tip: string;
}

export interface InterviewQuestionsResponse {
  totalQuestions: number;
  questions: InterviewQuestion[];
}

export interface SectionAnalysis {
  name: string;
  found: boolean;
  score: number;
  grade: string;
  issues: string[];
  tips: string[];
}

export interface SectionAnalysisResponse {
  overall: number;
  sections: SectionAnalysis[];
}

export interface RewriteResponse {
  original: string;
  rewritten: string;
  changes: string[];
}

export interface SmartFeedbackItem {
  original: string;
  improved: string;
  issue: string;
  category: string;
  severity: "high" | "medium" | "low";
}

export interface SmartFeedbackResponse {
  score: number;
  totalLinesScanned: number;
  issuesFound: number;
  summary: { high: number; medium: number; low: number };
  feedback: SmartFeedbackItem[];
}

export interface IndustryDetection {
  detectedIndustries: {
    name: string;
    confidence: number;
    matchedKeywords: string[];
    recommendedSkills: string[];
  }[];
  primaryField: string;
}

export interface ReadabilityResult {
  score: number;
  grade: string;
  metrics: {
    avgSentenceLength: number;
    avgWordLength: number;
    totalSentences: number;
    totalWords: number;
    longSentences: number;
    longBullets: number;
    shortBullets: number;
    passiveVoice: number;
    complexWords: number;
  };
  tips: string[];
}

export interface GeneratedContent {
  type: string;
  content: string;
}

export interface ResumeComparison {
  oldScore: number;
  newScore: number;
  improvement: number;
  verdict: string;
  comparisons: { label: string; old: number; new: number; unit: string }[];
}

export interface ResumePreview {
  fullText: string;
  wordCount: number;
  sections: { name: string; content: string; color: string }[];
  highlights: {
    techKeywords: string[];
    softSkills: string[];
    actionVerbs: string[];
    dynamicSkills: string[];
  };
  topSkills: { skill: string; count: number }[];
  industryClassification: {
    industries: { name: string; confidence: number; topMatches: string[] }[];
    primary: string;
  };
}

export interface HiringProbability {
  probability: number;
  factors: { name: string; value: number; weight: string; impact: "positive" | "negative" }[];
  verdict: string;
}

export interface GlobalBenchmark {
  percentile: number;
  rank: string;
  comparisons: { label: string; value: number; highlight: boolean }[];
  sectionBenchmarks: { section: string; yours: number; average: number }[];
  beatsPercent: number;
}

export interface BadgeData {
  id: string; name: string; icon: string; description: string; earned: boolean; progress: number;
}

export interface BadgesResponse {
  badges: BadgeData[];
  earned: number;
  total: number;
}

export interface CareerGrowth {
  currentLevel: string;
  nextRole: string;
  yearsExperience: number;
  timeframe: string;
  skillsToLearn: string[];
  allPaths: { from: string; to: string; timeframe: string; skillsNeeded: string[] }[];
}

export interface ProjectSuggestion {
  title: string;
  description: string;
  techStack: string[];
  difficulty: string;
  relevance: number;
}

export interface AnswerEvaluation {
  score: number;
  grade: string;
  strengths: string[];
  feedback: string[];
  techMentioned: string[];
}

export interface ChatResponse {
  answer: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}
