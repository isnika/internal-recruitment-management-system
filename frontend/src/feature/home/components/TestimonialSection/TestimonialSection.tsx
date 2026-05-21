import React from "react";
import { Star } from "lucide-react";
import styles from "../../pages/Home/Home.module.css";

const TESTIMONIALS = [
  {
    name: "Nika Nguyen",
    role: "Frontend Engineer - HCM Branch",
    content: "Quy trình chuyển team nội bộ rất nhanh. Mình từ Hà Nội vào Sài Gòn chỉ trong vài ngày, hệ thống rất minh bạch.",
    avatar: "https://i.pinimg.com/474x/ee/ed/03/eeed037e1319eec1cbe972b8787b05a0.jpg"
  },
  {
    name: "Minh Thư",
    role: "UI/UX Designer - Da Nang Branch",
    content: "Mình apply sang Product team nội bộ rất dễ dàng. HR support nhanh và rõ ràng từng bước.",
    avatar: "https://i.pinimg.com/736x/43/44/39/4344397ead16b67b257ae781ed8f3f1a.jpg"
  }
];

const TestimonialSection = () => {
  return (
    <section className={styles.testimonialSection}>
      <div className={styles.container}>
        <div className={styles.centerHeader}>
          <h2>Internal Employee Stories</h2>
          <p>Real experiences from employees across Company A branches</p>
        </div>

        <div className={styles.testimonialGrid}>
          {TESTIMONIALS.map((item, idx) => (
            <div key={idx} className={styles.testimonialCard}>
              <div className={styles.starsRow}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <p className={styles.testiContent}>"{item.content}"</p>
              <div className={styles.testiUser}>
                <img src={item.avatar} alt={item.name} className={styles.testiAvatar} />
                <div>
                  <h4>{item.name}</h4>
                  <span>{item.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;