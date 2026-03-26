import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SkillsRadarChartProps {
  skills: number;
  experience: number;
  education: number;
  projects: number;
}

export function SkillsRadarChart({
  skills,
  experience,
  education,
  projects,
}: SkillsRadarChartProps) {
  const data = [
    { subject: "Skills", score: skills, fullMark: 100 },
    { subject: "Experience", score: experience, fullMark: 100 },
    { subject: "Education", score: education, fullMark: 100 },
    { subject: "Projects", score: projects, fullMark: 100 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume Section Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] min-h-[300px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%" minWidth={200} minHeight={200}>
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "#6b7280", fontSize: 12 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fill: "#9ca3af", fontSize: 10 }}
              />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#6366f1"
                fill="#6366f1"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
