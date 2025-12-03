import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Card, CardContent } from "@/components/ui/card";

interface ChartDataItem {
  name: string;
  value: number;
  color: string;
}

interface DepartmentChartProps {
  data: ChartDataItem[];
  title?: string;
  subtitle?: string;
}

const DepartmentChart: React.FC<DepartmentChartProps> = ({
  data,
  title = "Task Status Distribution",
  subtitle = "Overview of Approved, Pending, and In Progress tasks",
}) => {
  return (
    <div className="shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-md">
      <div className="p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400">{subtitle}</p>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={45}
                dataKey="value"
                paddingAngle={4}
                label={({ name, value }) => `${name}: ${value}`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name) => [`${value}`, `${name}`]}
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "0.5rem",
                  color: "#fff",
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DepartmentChart;
