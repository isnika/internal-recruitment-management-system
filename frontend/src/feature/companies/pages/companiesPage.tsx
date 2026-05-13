import styles from "./companiesPage.module.css";
import { useEffect, useState } from "react";

import HeroSection from "../components/HeroSection/HeroSection";
import AboutSection from "../components/AboutSection/AboutSection";
import HighlightSection from "../components/HighlightSection/HighlightSection";
import TimelineSection from "../components/TimelineSection/TimelineSection";
import ScrollRevealCard from "../components/ScrollRevealCard/ScrollRevealCard";
import FooterCTA from "../components/FooterCTA/FooterCTA";

const CompaniesPage = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className={styles.page}>
      <HeroSection visible={visible} />

      <AboutSection />

      <ScrollRevealCard
        title="Technology Vision"
        description="HKKQ is evolving into a comprehensive technology ecosystem where every solution is designed for performance, scalability, and exceptional user experience."
        image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
      />

      <HighlightSection />

      <ScrollRevealCard
        title="Engineering Excellence"
        description="Our engineering team focuses on modern system architecture, clean architecture principles, microservices, and delivering seamless user experiences."
        image="https://images.unsplash.com/photo-1556761175-4b46a572b786"
      />

      <TimelineSection />

      <ScrollRevealCard
        title="Future Expansion"
        description="We are expanding into global markets, building scalable SaaS platforms to serve businesses worldwide."
        image="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
      />

      <FooterCTA />
    </div>
  );
};

export default CompaniesPage;