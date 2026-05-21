import styles from "./FooterUser.module.css";

import { AiTwotoneMail } from "react-icons/ai";
import { FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";

const FooterUser = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* LEFT SECTION */}
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
            <p className={styles.contactItem}>
              <AiTwotoneMail className={styles.iconMail} />
              <a href="mailto:nhrkkq@gmail.com"> nhrkkq@gmail.com</a>
            </p>
            <p className={styles.contactItem}>
              <FaPhone className={styles.iconPhone} />
              <a href="tel:0123456789"> 0 123 456 789</a>
            </p>
            <p className={styles.contactItem}>
              <FaMapMarkerAlt className={styles.iconMap} />
              <span> 97 Man Thien Street, Hiep Phu Ward, Thu Duc City, Ho Chi Minh City, Vietnam</span>
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

      {/* SOCIAL SECTION */}
      <div className={styles.social}>
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className={styles.socialLink}>
          <FaFacebook size={24} className={styles.fbIcon} />
        </a>
        <a href="https://youtube.com" target="_blank" rel="noreferrer" className={styles.socialLink}>
          <FaYoutube size={24} className={styles.ytIcon} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" className={styles.socialLink}>
          <FaTwitter size={24} className={styles.twIcon} />
        </a>
      </div>

      {/* BOTTOM */}
      <div className={styles.bottom}>
        © 2026 HKKQ Company | Privacy Policy | Terms of Service | Cookie Policy
      </div>

    </footer>
  );
};

export default FooterUser;