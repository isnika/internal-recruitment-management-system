import React, { useMemo, useState } from "react";
import {
  Search,
  Briefcase,
  MapPin,
  BarChart3,
} from "lucide-react";
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
import styles from "./SalaryGuidePage.module.css";

type SalaryItem = {
  id: number;
  title: string;
  level: "Junior" | "Mid" | "Senior";
  location: string;
  minSalary: number;
  maxSalary: number;
  currency: string;
};

const mockData: SalaryItem[] = [
  { id: 1, title: "Frontend Developer", level: "Junior", location: "Vietnam", minSalary: 800, maxSalary: 1500, currency: "USD" },
  { id: 2, title: "Frontend Developer", level: "Mid", location: "Vietnam", minSalary: 1500, maxSalary: 3000, currency: "USD" },
  { id: 3, title: "Frontend Developer", level: "Senior", location: "Vietnam", minSalary: 3000, maxSalary: 6000, currency: "USD" },
  { id: 4, title: "Backend Developer", level: "Mid", location: "Vietnam", minSalary: 2000, maxSalary: 4000, currency: "USD" },
  { id: 5, title: "Fullstack Developer", level: "Senior", location: "Vietnam", minSalary: 3500, maxSalary: 7000, currency: "USD" },
  { id: 6, title: "DevOps Engineer", level: "Mid", location: "Vietnam", minSalary: 1800, maxSalary: 3500, currency: "USD" },
  { id: 7, title: "Data Scientist", level: "Senior", location: "Vietnam", minSalary: 4000, maxSalary: 8000, currency: "USD" },
];

export default function SalaryGuidePage() {
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [maxSalaryLimit, setMaxSalaryLimit] = useState(8000);

  // Filter logic
  const filteredData = useMemo(() => {
    return mockData.filter((item) => {
      const matchTitle = title
        ? item.title.toLowerCase().includes(title.toLowerCase())
        : true;

      const matchLevel = level ? item.level === level : true;
      const matchSalary = item.maxSalary <= maxSalaryLimit;

      return matchTitle && matchLevel && matchSalary;
    });
  }, [title, level, maxSalaryLimit]);

  // Chart data transformation
  const chartData = useMemo(() => {
    return filteredData.map((item) => ({
      name: `${item.title} (${item.level})`,
      "Max Salary": item.maxSalary,
      "Min Salary": item.minSalary,
    }));
  }, [filteredData]);

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.headerSection}>
        <h1 className={styles.title}>Salary Insights Guide</h1>
        <p className={styles.subtitle}>
          Explore and compare real-world salary trends and compensation insights
          across leading tech roles in the current market.
        </p>
      </div>

      {/* FILTER PANEL */}
      <div className={styles.filtersCard}>
        <div className={styles.filtersGrid}>
          {/* JOB TITLE */}
          <div className={styles.inputGroup}>
            <label>Job Title</label>
            <div className={styles.inputWrapper}>
              <Search size={18} className={styles.inputIcon} />
              <input
                placeholder="e.g. Frontend, Backend..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          {/* LEVEL */}
          <div className={styles.inputGroup}>
            <label>Level</label>
            <div className={styles.inputWrapper}>
              <Briefcase size={18} className={styles.inputIcon} />
              <select value={level} onChange={(e) => setLevel(e.target.value)}>
                <option value="">All Levels</option>
                <option value="Junior">Junior</option>
                <option value="Mid">Mid</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
          </div>

          {/* SALARY RANGE */}
          <div className={styles.inputGroup}>
            <label>
              Max Salary Limit: ${maxSalaryLimit.toLocaleString()}
            </label>

            <input
              type="range"
              min="1500"
              max="8000"
              step="500"
              className={styles.rangeSlider}
              value={maxSalaryLimit}
              onChange={(e) => setMaxSalaryLimit(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      {/* MAIN DASHBOARD */}
      <div className={styles.dashboardGrid}>
        {/* LEFT: CARDS */}
        <div className={styles.cardsList}>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div key={item.id} className={styles.card}>
                <div className={styles.cardInfo}>
                  <h3>{item.title}</h3>

                  <div className={styles.metaRow}>
                    <span className={`${styles.levelBadge} ${styles[item.level]}`}>
                      {item.level}
                    </span>

                    <span className={styles.locationText}>
                      <MapPin size={14} /> {item.location}
                    </span>
                  </div>
                </div>

                <div className={styles.salaryContainer}>
                  <div className={styles.salaryValue}>
                    ${item.minSalary.toLocaleString()} - $
                    {item.maxSalary.toLocaleString()}
                  </div>
                  <div className={styles.salaryLabel}>
                    Monthly Compensation ({item.currency})
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyState}>
              <p>
                No matching job roles or salary ranges found for your filters.
              </p>
            </div>
          )}
        </div>

        {/* RIGHT: CHART */}
        <div className={styles.chartContainer}>
          <h3 className={styles.chartTitle}>
            <BarChart3 size={20} color="#2563eb" />
            Salary Comparison Chart (USD)
          </h3>

          {chartData.length > 0 ? (
            <div style={{ width: "100%", height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ left: -10, right: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis type="number" stroke="#94a3b8" fontSize={12} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={140}
                    stroke="#94a3b8"
                    fontSize={10}
                    tickLine={false}
                  />

                  <Tooltip
                    contentStyle={{
                      background: "#0f172a",
                      borderRadius: "12px",
                      color: "#fff",
                      border: "none",
                    }}
                  />

                  <Bar
                    dataKey="Max Salary"
                    radius={[0, 6, 6, 0]}
                    barSize={16}
                  >
                    {chartData.map((_, index) => (
                      <Cell
                        key={index}
                        fill={index % 2 === 0 ? "#2563eb" : "#10b981"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p
              style={{
                color: "#64748b",
                fontSize: "14px",
                textAlign: "center",
                paddingTop: "40px",
              }}
            >
              Adjust filters to see salary analytics.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}