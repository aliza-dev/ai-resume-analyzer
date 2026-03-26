export const APP_NAME = import.meta.env.VITE_APP_NAME || "AI Resume Analyzer";
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export const TOKEN_KEY = "ara_token";
export const THEME_KEY = "ara_theme";

export const SCORE_COLORS = {
  excellent: "#22c55e",
  good: "#84cc16",
  average: "#eab308",
  poor: "#ef4444",
} as const;

export function getScoreColor(score: number): string {
  if (score >= 80) return SCORE_COLORS.excellent;
  if (score >= 60) return SCORE_COLORS.good;
  if (score >= 40) return SCORE_COLORS.average;
  return SCORE_COLORS.poor;
}

export function getScoreLabel(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Average";
  return "Needs Improvement";
}
