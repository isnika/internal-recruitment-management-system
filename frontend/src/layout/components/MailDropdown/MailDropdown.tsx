import { useState, useRef, useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./MailDropdown.module.css";

interface Props {
  user: any;
}

const MailDropdown = ({ user }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  // MOCK MAILS (sau này thay API)
  const mails = [
    {
      id: 1,
      title: "Kết quả duyệt CV",
      time: "10:30 PM 16/4/2026",
      desc: "Mã phỏng vấn: #1272336",
    },
    {
      id: 2,
      title: "Thư mời phỏng vấn",
      time: "8:30 PM 16/4/2026",
      desc: "Mã phỏng vấn: #1272999",
    },
  ];

  // click outside close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.wrapper} ref={ref}>
      {/* ICON */}
      <div className={styles.icon} onClick={() => setOpen(!open)}>
        <FaEnvelope />

        {user && mails.length > 0 && (
          <span className={styles.badge}>{mails.length}</span>
        )}
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className={styles.dropdown}>
          {!user ? (
            <div
              className={styles.empty}
              onClick={() => navigate("/login")}
            >
              Vui lòng <span className={styles.loginText}>đăng nhập</span>
            </div>
          ) : (
            mails.map((mail) => (
              <div key={mail.id} className={styles.item}>
                <div className={styles.left}>HR</div>

                <div className={styles.content}>
                  <div className={styles.top}>
                    <span className={styles.title}>
                      {mail.title}
                    </span>

                    <span className={styles.time}>
                      {mail.time}
                    </span>
                  </div>

                  <div className={styles.desc}>
                    {mail.desc}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MailDropdown;