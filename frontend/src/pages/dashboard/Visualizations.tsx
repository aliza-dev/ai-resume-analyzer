import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import {
  Eye, Upload, Sparkles, FileText, Code2,
  CheckCircle2, Zap, Heart, BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { resumeApi } from "@/api/resume";
import type { Resume, ResumePreview } from "@/types";

const SKILL_COLORS = [
  "#6366f1", "#8b5cf6", "#ec4899", "#f43f5e", "#f97316",
  "#eab308", "#22c55e", "#14b8a6", "#06b6d4", "#3b82f6",
  "#a855f7", "#d946ef", "#f59e0b", "#10b981", "#0ea5e9",
];

function HighlightedText({ text, keywords, color }: { text: string; keywords: string[]; color: string }) {
  if (!keywords.length) return <span>{text}</span>;

  // Build a regex that matches WHOLE WORDS only (word boundaries prevent
  // matching "R" inside "university" or "C" inside "inci")
  const escaped = keywords.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  // Sort longest-first so "React Native" matches before "React"
  escaped.sort((a, b) => b.length - a.length);
  const pattern = new RegExp(`\\b(${escaped.join("|")})\\b`, "gi");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, i) => {
        const isMatch = keywords.some((k) => k.toLowerCase() === part.toLowerCase());
        return isMatch ? (
          <mark key={i} className="rounded px-0.5" style={{ backgroundColor: color + "30", color, fontWeight: 600 }}>
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        );
      })}
    </>
  );
}

export function VisualizationsPage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState("");
  const [preview, setPreview] = useState<ResumePreview | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [activeHighlight, setActiveHighlight] = useState<"tech" | "soft" | "verbs" | "dynamic">("tech");

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    resumeApi.getHistory().then((data) => {
      if (cancelled) return;
      setResumes(data);
      if (data.length > 0) setSelectedResumeId(data[0].id);
    }).catch(() => {}).finally(() => { if (!cancelled) setIsLoading(false); });
    return () => { cancelled = true; };
  }, []);

  // Auto-fetch visualization when resume selection changes
  useEffect(() => {
    if (!selectedResumeId) return;
    let cancelled = false;
    setPreview(null);
    setIsPreviewLoading(true);
    resumeApi.getResumePreview(selectedResumeId)
      .then((r) => { if (!cancelled) setPreview(r); })
      .catch(() => { if (!cancelled) toast.error("Failed to load visualization data", { id: "viz" }); })
      .finally(() => { if (!cancelled) setIsPreviewLoading(false); });
    return () => { cancelled = true; };
  }, [selectedResumeId]);

  const handleLoad = async () => {
    if (!selectedResumeId) return;
    setIsPreviewLoading(true);
    toast.loading("Refreshing…", { id: "viz" });
    try {
      const r = await resumeApi.getResumePreview(selectedResumeId);
      setPreview(r);
      toast.success(`${r.wordCount} words parsed, ${r.sections.length} sections found!`, { id: "viz" });
    } catch { toast.error("Failed to load", { id: "viz" }); }
    finally { setIsPreviewLoading(false); }
  };

  // Skills for highlighting (safe access)
  const highlightKeywords = useMemo(() => {
    if (!preview?.highlights) return [];
    switch (activeHighlight) {
      case "tech": return preview.highlights.techKeywords ?? [];
      case "soft": return preview.highlights.softSkills ?? [];
      case "verbs": return preview.highlights.actionVerbs ?? [];
      case "dynamic": return preview.highlights.dynamicSkills ?? [];
    }
  }, [preview, activeHighlight]);

  const highlightColor = activeHighlight === "tech" ? "#6366f1" : activeHighlight === "soft" ? "#22c55e" : activeHighlight === "verbs" ? "#f59e0b" : "#ec4899";

  if (isLoading) return <div className="flex h-64 items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-600 border-t-transparent" /></div>;

  if (resumes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Eye className="mb-4 h-16 w-16 text-gray-300 dark:text-gray-600" />
        <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">No Resumes Found</h2>
        <Link to="/upload"><Button className="gap-2"><Upload className="h-4 w-4" /> Upload Resume</Button></Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Resume Visualizations</h1>
        <p className="text-gray-500 dark:text-gray-400">Skills cloud, top technologies, and highlighted resume preview</p>
      </motion.div>

      {/* Controls */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card>
          <CardContent className="flex flex-wrap items-end gap-4 p-4">
            <div className="flex-1 space-y-1">
              <label className="text-xs font-medium text-gray-500">Select Resume</label>
              <select value={selectedResumeId} onChange={(e) => setSelectedResumeId(e.target.value)}
                className="flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100">
                {resumes.map((r) => <option key={r.id} value={r.id}>{r.fileName} — {new Date(r.createdAt).toLocaleDateString()}</option>)}
              </select>
            </div>
            <Button onClick={handleLoad} isLoading={isPreviewLoading} className="gap-2 shadow-lg shadow-brand-500/25">
              <Eye className="h-4 w-4" /> {preview ? "Refresh" : "Visualize"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Loading skeleton */}
      {isPreviewLoading && !preview && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {[1, 2].map((i) => (
            <Card key={i}>
              <CardContent className="space-y-4 p-6">
                <div className="h-5 w-1/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100 dark:bg-gray-800" />
                <div className="grid grid-cols-4 gap-3">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="h-20 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-800" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      )}

      {preview && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

          {/* ═══ SKILLS CLOUD ═══ */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-brand-500" /> Detected Skills Cloud</CardTitle>
              <CardDescription>{preview.topSkills.length} skills detected — size = frequency in resume</CardDescription>
            </CardHeader>
            <CardContent>
              {preview.topSkills.length > 0 ? (
                <div className="flex flex-wrap items-center justify-center gap-2 py-4">
                  {preview.topSkills.map((s, i) => {
                    const maxCount = preview.topSkills[0]?.count || 1;
                    const size = 0.75 + (s.count / maxCount) * 1.2; // 0.75rem to 1.95rem
                    return (
                      <motion.span key={s.skill}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.04, type: "spring" }}
                        className="cursor-default rounded-full px-3 py-1 font-semibold transition-transform hover:scale-110"
                        style={{
                          fontSize: `${size}rem`,
                          color: SKILL_COLORS[i % SKILL_COLORS.length],
                          backgroundColor: SKILL_COLORS[i % SKILL_COLORS.length] + "15",
                        }}
                        title={`${s.skill}: ${s.count} mentions`}
                      >
                        {s.skill}
                      </motion.span>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Sparkles className="mb-2 h-8 w-8 text-gray-300 dark:text-gray-600" />
                  <p className="text-sm text-gray-500">No skills detected. Try analyzing your resume first, then revisit this page.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* ═══ TOP TECHNOLOGIES BAR CHART ═══ */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Code2 className="h-5 w-5 text-purple-500" /> Top Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                {(preview.topSkills?.length ?? 0) > 0 ? (
                  <div className="h-[300px] min-h-[300px] w-full min-w-0">
                    <ResponsiveContainer width="100%" height="100%" minWidth={200} minHeight={200}>
                      <BarChart data={preview.topSkills.slice(0, 10)} layout="vertical" barCategoryGap="15%">
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis type="number" tick={{ fill: "#9ca3af", fontSize: 11 }} />
                        <YAxis type="category" dataKey="skill" width={100} tick={{ fill: "#6b7280", fontSize: 11 }} />
                        <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none", borderRadius: "8px", color: "#fff", fontSize: 12 }} />
                        <Bar dataKey="count" radius={[0, 6, 6, 0]} name="Mentions">
                          {preview.topSkills.slice(0, 10).map((_, i) => (
                            <Cell key={i} fill={SKILL_COLORS[i % SKILL_COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Code2 className="mb-2 h-8 w-8 text-gray-300 dark:text-gray-600" />
                    <p className="text-sm text-gray-500">No technology data to chart yet.</p>
                    <p className="mt-1 text-xs text-gray-400">Analyze your resume first to populate this chart.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Industry + Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-brand-50 p-3 text-center dark:bg-brand-900/20">
                    <FileText className="mx-auto mb-1 h-5 w-5 text-brand-500" />
                    <p className="text-2xl font-bold text-brand-600">{preview.wordCount || 0}</p>
                    <p className="text-[10px] text-gray-500">Words</p>
                  </div>
                  <div className="rounded-xl bg-green-50 p-3 text-center dark:bg-green-900/20">
                    <CheckCircle2 className="mx-auto mb-1 h-5 w-5 text-green-500" />
                    <p className="text-2xl font-bold text-green-600">{preview.sections?.length || 0}</p>
                    <p className="text-[10px] text-gray-500">Sections</p>
                  </div>
                  <div className="rounded-xl bg-purple-50 p-3 text-center dark:bg-purple-900/20">
                    <Zap className="mx-auto mb-1 h-5 w-5 text-purple-500" />
                    <p className="text-2xl font-bold text-purple-600">{preview.highlights?.techKeywords?.length || 0}</p>
                    <p className="text-[10px] text-gray-500">Tech Skills</p>
                  </div>
                  <div className="rounded-xl bg-pink-50 p-3 text-center dark:bg-pink-900/20">
                    <Heart className="mx-auto mb-1 h-5 w-5 text-pink-500" />
                    <p className="text-2xl font-bold text-pink-600">{preview.highlights?.softSkills?.length || 0}</p>
                    <p className="text-[10px] text-gray-500">Soft Skills</p>
                  </div>
                </div>

                {/* Detected Industry */}
                <div className="rounded-xl bg-gradient-to-r from-brand-50 to-purple-50 p-4 dark:from-brand-900/20 dark:to-purple-900/20">
                  <p className="text-xs text-gray-500">Detected Field</p>
                  <p className="text-lg font-bold text-brand-600">{preview.industryClassification?.primary || "General"}</p>
                  {(preview.industryClassification?.industries ?? []).slice(0, 2).map((ind) => (
                    <div key={ind.name} className="mt-2 flex items-center justify-between text-xs">
                      <span className="text-gray-600 dark:text-gray-400">{ind.name}</span>
                      <Badge variant={ind.confidence >= 30 ? "success" : "secondary"}>{ind.confidence}%</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ═══ RESUME PREVIEW WITH HIGHLIGHTS ═══ */}
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2"><Eye className="h-5 w-5 text-brand-500" /> Resume Preview — AI Highlighted</CardTitle>
                  <CardDescription>See what AI detects in your resume. Click a category to highlight.</CardDescription>
                </div>
                {/* Highlight toggles */}
                <div className="flex flex-wrap gap-1.5">
                  {([
                    { key: "tech" as const, label: "Tech Skills", color: "#6366f1", count: preview.highlights?.techKeywords?.length ?? 0, icon: Code2 },
                    { key: "soft" as const, label: "Soft Skills", color: "#22c55e", count: preview.highlights?.softSkills?.length ?? 0, icon: Heart },
                    { key: "verbs" as const, label: "Action Verbs", color: "#f59e0b", count: preview.highlights?.actionVerbs?.length ?? 0, icon: Zap },
                    { key: "dynamic" as const, label: "NLP Detected", color: "#ec4899", count: preview.highlights?.dynamicSkills?.length ?? 0, icon: Sparkles },
                  ]).map((h) => (
                    <button key={h.key}
                      onClick={() => setActiveHighlight(h.key)}
                      className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-all ${
                        activeHighlight === h.key
                          ? "shadow-md"
                          : "opacity-60 hover:opacity-100"}`}
                      style={{
                        borderColor: activeHighlight === h.key ? h.color : "#d1d5db",
                        backgroundColor: activeHighlight === h.key ? h.color + "15" : "transparent",
                        color: h.color,
                      }}>
                      <h.icon className="h-3 w-3" />
                      {h.label} ({h.count})
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Section tabs */}
              {(preview.sections?.length ?? 0) > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {preview.sections.map((s) => (
                    <span key={s.name} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-white" style={{ backgroundColor: s.color }}>
                      <BookOpen className="h-3 w-3" />
                      {s.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Resume text with highlighted sections */}
              <div className="max-h-[600px] space-y-4 overflow-y-auto rounded-xl border border-gray-200 bg-gray-50 p-5 font-mono text-xs leading-relaxed dark:border-gray-700 dark:bg-gray-900 scrollbar-thin">
                {(preview.sections?.length ?? 0) > 0 ? (
                  preview.sections.map((section) => (
                    <div key={section.name}>
                      {/* Section header */}
                      <div className="mb-2 flex items-center gap-2">
                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: section.color }} />
                        <span className="text-sm font-bold" style={{ color: section.color }}>{section.name}</span>
                      </div>
                      {/* Section content with keyword highlights */}
                      <div className="ml-5 whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                        <HighlightedText text={section.content} keywords={highlightKeywords} color={highlightColor} />
                      </div>
                    </div>
                  ))
                ) : (
                  /* Fallback: show full text */
                  <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
                    {preview.fullText ? (
                      <HighlightedText text={preview.fullText} keywords={highlightKeywords} color={highlightColor} />
                    ) : (
                      <p className="py-4 text-center text-sm text-gray-400">No resume text available. The file may not be accessible — try re-uploading.</p>
                    )}
                  </div>
                )}
              </div>

              {/* Legend */}
              <div className="mt-3 flex items-center gap-2 text-[10px] text-gray-500">
                <mark className="rounded px-1" style={{ backgroundColor: highlightColor + "30", color: highlightColor }}>highlighted</mark>
                = AI detected {activeHighlight === "tech" ? "technical skills" : activeHighlight === "soft" ? "soft skills" : activeHighlight === "verbs" ? "action verbs" : "NLP-extracted skills"}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
