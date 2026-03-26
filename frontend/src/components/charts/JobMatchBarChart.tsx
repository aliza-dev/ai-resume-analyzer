import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { getScoreColor } from "@/utils/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface JobMatchBarChartProps {
  skillMatch: number;
  experienceMatch: number;
  educationMatch: number;
  overallScore: number;
}

export function JobMatchBarChart({
  skillMatch,
  experienceMatch,
  educationMatch,
  overallScore,
}: JobMatchBarChartProps) {
  const data = [
    { name: "Skills", score: skillMatch },
    { name: "Experience", score: experienceMatch },
    { name: "Education", score: educationMatch },
    { name: "Overall", score: overallScore },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Match Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] min-h-[300px] w-full min-w-0">
          <ResponsiveContainer width="100%" height="100%" minWidth={200} minHeight={200}>
            <BarChart data={data} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#6b7280", fontSize: 12 }}
                axisLine={{ stroke: "#e5e7eb" }}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fill: "#9ca3af", fontSize: 12 }}
                axisLine={{ stroke: "#e5e7eb" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                {data.map((entry, index) => (
                  <Cell key={index} fill={getScoreColor(entry.score)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
