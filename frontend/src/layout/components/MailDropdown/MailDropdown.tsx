import { useState, useRef, useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./MailDropdown.module.css";

import {
  getMyNotifications,
  markAsRead,
} from "../../../service/notificationApi";

interface Props {
  user: any;
}

const MailDropdown = ({ user }: Props) => {
  const [open, setOpen] = useState(false);
  const [mails, setMails] = useState<any[]>([]);
  const ref = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  // 👉 fetch notifications theo user
  useEffect(() => {
    if (!user?.id) {
      setMails([]);
      return;
    }

    const fetchMails = async () => {
      try {
        const data = await getMyNotifications(user.id);
        setMails(data || []);
      } catch (err) {
        console.error("Load notifications error:", err);
      }
    };

    fetchMails();
  }, [user]);

  // 👉 click ngoài để đóng dropdown
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

  // 👉 unread count
  const unreadCount = mails.filter((m) => !m.isRead).length;

  // 👉 click mail = mark as read
  const handleClickMail = async (id: number) => {
    try {
      await markAsRead(id);

      setMails((prev) =>
        prev.map((m) =>
          m.id === id ? { ...m, isRead: true } : m
        )
      );
    } catch (err) {
      console.error("Mark as read error:", err);
    }
  };

  return (
    <div className={styles.wrapper} ref={ref}>
      {/* ICON */}
      <div
        className={styles.icon}
        onClick={() => setOpen((prev) => !prev)}
      >
        <FaEnvelope />

        {user && unreadCount > 0 && (
          <span className={styles.badge}>
            {unreadCount}
          </span>
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
              Vui lòng{" "}
              <span className={styles.loginText}>
                đăng nhập
              </span>
            </div>
          ) : mails.length === 0 ? (
            <div className={styles.empty}>
              Không có thông báo
            </div>
          ) : (
            mails.map((mail) => (
              <div
                key={mail.id}
                className={`${styles.item} ${
                  !mail.isRead ? styles.unread : ""
                }`}
                onClick={() => handleClickMail(mail.id)}
              >
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