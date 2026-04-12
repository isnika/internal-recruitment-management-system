import styles from "./FooterUser.module.css";

import { AiTwotoneMail } from "react-icons/ai";
import { FaPhone } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";

const FooterUser = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* LEFT */}
        <div className={styles.left}>
          <div className={styles.logo}>
            <span>H</span>
            <span className={styles.logoBlue}>KK</span>
            <span>Q</span>
            <span className={styles.logoItalic}> Careers</span>
          </div>

          <p className={styles.desc}>
            The official recruitment platform of HKKQ Company, connecting candidates with sustainable career opportunities and a professional working environment.
          </p>

          <div className={styles.contact}>
            <h4>Contact</h4>
            <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <AiTwotoneMail color="white" />
              nhrkkq@gmail.com
            </p>
            <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FaPhone color="#1877F2"  />
              0 123 456 789
            </p>

            <p style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FaMapMarkerAlt color="red" />
              97 Man Thien Street, Hiep Phu Ward, Thu Duc City, Ho Chi Minh City, Vietnam
            </p>

          </div>
        </div>

        {/* RIGHT GRID */}
        <div className={styles.right}>

          <div className={styles.links}>
            <h4>Careers</h4>
            <a href="#">Job Openings</a>
            <a href="#">Internship</a>
            <a href="#">Recruitment Process</a>
            <a href="#">Submit CV</a>
            <a href="#">FAQ</a>
          </div>

          <div className={styles.links}>
            <h4>Company</h4>
            <a href="#">About HKKQ</a>
            <a href="#">Company Culture</a>
            <a href="#">News / Blog</a>
            <a href="#">Benefits</a>
            <a href="#">Our Team</a>
          </div>

          <div className={styles.links}>
            <h4>Support</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
            <a href="#">Help Center</a>
          </div>

          <div className={styles.links}>
            <h4>Our Partners</h4>
            <a href="#">PTIT - Ho Chi Minh</a>
            <a href="#">Top CV</a>
            <a href="#">Top HR</a>
            <a href="#">ViecLam24H</a>
          </div>

        </div>

      </div>

      {/* SOCIAL */}
      <div className={styles.social}>
        <span><FaFacebook color= "#1877F2" size={25} /></span>
        <span><FaYoutube color= "red" size={25} /></span>
        <span><FaTwitter color= "#1DA1F2" size={25} /> </span>
      </div>

      {/* BOTTOM */}
      <div className={styles.bottom}>
        © 2026 HKKQ Company | Privacy Policy | Terms of Service | Cookie Policy
      </div>

    </footer>
  );
};

export default FooterUser;