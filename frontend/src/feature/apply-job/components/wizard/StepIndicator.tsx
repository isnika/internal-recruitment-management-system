// components/wizard/StepIndicator.tsx
import styles from "./step.module.css";

const STEPS = ["Personal", "Document", "Professional"];

export default function StepIndicator({ step }: { step: number }) {
  return (
    <div className={styles.bar}>
      {STEPS.map((s, i) => (
        <div
          key={s}
          className={`${styles.step} ${
            i === step ? styles.active : ""
          } ${i < step ? styles.done : ""}`}
        >
          {s}
        </div>
      ))}
    </div>
  );
}