import { useEffect, useRef, useState } from "react";
import styles from "./scrollRevealCard.module.css";

type Props = {
  title: string;
  description: string;
  image: string;
};

const ScrollRevealCard = ({ title, description, image }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      {
        threshold: 0.3,
      }
    );

    const current = ref.current;

    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.card} ${visible ? styles.show : ""}`}
    >
      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <img src={image} alt={title} />
          </div>

          <div className={styles.text}>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollRevealCard;