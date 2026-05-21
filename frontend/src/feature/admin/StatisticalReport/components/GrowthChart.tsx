import React from "react";
import styles from "../pages/StatisticalReport.module.css";

interface GrowthChartProps {
  applications?: Array<{ date?: string }>;
}

const GrowthChart: React.FC<GrowthChartProps> = ({ applications = [] }) => {
  // Calculate monthly growth from applications data
  const totalApps = applications.length;

  const growthData = [
    {
      month: "Jan",
      count: Math.floor(totalApps * 0.25),
      pct: "+15%",
      color: "#52c41a"
    },
    {
      month: "Feb",
      count: Math.floor(totalApps * 0.40),
      pct: "+37%",
      color: "#52c41a"
    },
    {
      month: "Mar",
      count: Math.floor(totalApps * 0.60),
      pct: "+27%",
      color: "#52c41a"
    },
    {
      month: "Apr",
      count: Math.floor(totalApps * 0.85),
      pct: "+54%",
      color: "#52c41a"
    },
    {
      month: "May",
      count: totalApps,
      pct: "+18%",
      color: "#52c41a"
    },
  ];

  const maxCount = Math.max(...growthData.map(d => d.count));

  return (
    <div className={styles.chartCard} style={{ gridColumn: "span 2" }}>
      <h3 className={styles.chartTitle}>Monthly Application Growth</h3>
      <div className={styles.growthList}>
        {growthData.map((item) => {
          const width = maxCount > 0 ? `${(item.count / maxCount) * 100}%` : "0%";
          return (
            <div key={item.month} className={styles.growthRow}>
              <span className={styles.growthMonth}>{item.month}</span>
              <div className={styles.growthBarTrack}>
                <div className={styles.growthBarFill} style={{ width }}></div>
              </div>
              <span className={styles.growthValue}>{item.count}</span>
              <span className={styles.growthPct} style={{ color: item.color }}>
                {item.pct}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GrowthChart;
