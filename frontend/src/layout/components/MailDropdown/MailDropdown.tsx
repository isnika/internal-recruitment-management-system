import { useState, useRef, useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import styles from "./MailDropdown.module.css";

interface Props {
  user: any; // bạn có thể thay bằng type User nếu có
}

const MailDropdown = ({ user }: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  // click ngoài để đóng
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.wrapper} ref={ref}>
      {/* icon */}
      <div
        className={styles.icon}
        onClick={() => setOpen(!open)}
      >
        <FaEnvelope />
        {user && <span className={styles.badge}>3</span>}
      </div>

      {/* dropdown */}
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
            <>
                <div className={styles.item}>
                  <div className={styles.left}>
                    HR
                  </div>

                  <div className={styles.content}>
                    <div className={styles.top}>
                      <span className={styles.title}>
                        Kết quả duyệt CV
                      </span>

                      <span className={styles.time}>
                        10:30 PM 16/4/2026
                      </span>
                    </div>

                    <div className={styles.desc}>
                      Mã phỏng vấn: #1272336
                    </div>
                  </div>
                </div>



                <div className={styles.item}>
                  <div className={styles.left}>
                    HR
                  </div>

                  <div className={styles.content}>
                    <div className={styles.top}>
                      <span className={styles.title}>
                        Thư mời phỏng vấn
                      </span>

                      <span className={styles.time}>
                        8:30 PM 16/4/2016
                      </span>
                    </div>

                    <div className={styles.desc}>
                      Mã phỏng vấn: #1272999
                    </div>
                  </div>
                </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MailDropdown;