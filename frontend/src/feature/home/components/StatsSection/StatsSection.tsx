import React from "react";
import { Briefcase, Building2, Users } from "lucide-react";
import styles from "../../pages/Home/Home.module.css";

const StatsSection = () => {
  const stats = [
    { id: "positions", value: "500+", label: "Open Positions", icon: Briefcase, colorClass: styles.blue },
    { id: "branches", value: "12", label: "Active Branch Offices", icon: Building2, colorClass: styles.green },
    { id: "employees", value: "10K+", label: "Employees in Network", icon: Users, colorClass: styles.purple },
  ];

  return (
    <section className={styles.statsSection}>
      <div className={styles.container}>
        <div className={styles.statsGrid}>
          {stats.map(({ id, value, label, icon: Icon, colorClass }) => (
            <div key={id} className={styles.statCard}>
              <div className={`${styles.iconBox} ${colorClass}`}>
                <Icon size={24} />
              </div>
              <div className={styles.statInfo}>
                <h3>{value}</h3>
                <p>{label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;