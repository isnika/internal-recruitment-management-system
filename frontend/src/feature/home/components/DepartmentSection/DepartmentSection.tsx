import React from "react";
import { Code, Megaphone, Palette, TrendingUp, BadgeDollarSign, UserCheck } from "lucide-react";
import styles from "../../pages/Home/Home.module.css";

const CATEGORIES = [
  { name: "Engineering", query: "IT", icon: Code, count: "120+ Openings" },
  { name: "Marketing Team", query: "Marketing", icon: Megaphone, count: "80+ Openings" },
  { name: "Product Design", query: "Design", icon: Palette, count: "45+ Openings" },
  { name: "Sales Division", query: "Sales", icon: TrendingUp, count: "95+ Openings" },
  { name: "Finance & Accounting", query: "Finance", icon: BadgeDollarSign, count: "60+ Openings" },
  { name: "HR & People Ops", query: "HR", icon: UserCheck, count: "30+ Openings" },
];

const DepartmentSection = ({ onSelectCategory }) => {
  return (
    <section className={styles.categorySection}>
      <div className={styles.container}>
        <div className={styles.centerHeader}>
          <h2>Explore Departments</h2>
          <p>Find internal opportunities across different teams</p>
        </div>

        <div className={styles.categoryGrid}>
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                className={styles.categoryCard}
                onClick={() => onSelectCategory(cat.query)}
              >
                <div className={styles.catIconWrapper}>
                  <Icon size={22} className={styles.catIcon} />
                </div>
                <h3>{cat.name}</h3>
                <span>{cat.count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DepartmentSection;