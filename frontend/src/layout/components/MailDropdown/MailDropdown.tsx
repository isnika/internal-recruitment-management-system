import { useState, useRef, useEffect } from "react";
import { FaEnvelope } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./MailDropdown.module.css";

import { notificationApi } from "../../../service/notificationApi";

interface Props {
  user: any;
}

const MailDropdown = ({ user }: Props) => {
  const [open, setOpen] = useState(false);
  const [mails, setMails] = useState<any[]>([]);
  const ref = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  // FETCH NOTIFICATIONS
  useEffect(() => {
    if (!user?.id) {
      setMails([]);
      return;
    }

    const fetchMails = async () => {
      try {
        const data = await notificationApi.getMyNotifications();
        setMails(data || []);
      } catch (err) {
        console.error("Load notifications error:", err);
      }
    };

    fetchMails();
  }, [user]);

  // click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = mails.filter((m) => !m.isRead).length;

  // MARK AS READ
  const handleClickMail = async (mail: any) => {
    if (!mail.isRead) {
      try {
        await notificationApi.markAsRead(mail.id);

        setMails((prev) =>
          prev.map((m) =>
            m.id === mail.id ? { ...m, isRead: true } : m
          )
        );
      } catch (err) {
        console.error("Mark as read error:", err);
      }
    }

    // redirect nếu có
    if (mail.redirectUrl) {
      navigate(mail.redirectUrl);
    }

    setOpen(false);
  };

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        className={`${styles.iconBtn} ${open ? styles.activeIcon : ""}`}
        onClick={() => setOpen((p) => !p)}
      >
        <FaEnvelope size={18} />

        {user && unreadCount > 0 && (
          <span className={styles.badge}>
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className={styles.dropdown}>
          <div className={styles.dropHeader}>
            <h3>Thông báo hệ thống</h3>
            {unreadCount > 0 && <span>{unreadCount} chưa đọc</span>}
          </div>

          <div className={styles.dropBody}>
            {!user ? (
              <div className={styles.emptyState}>
                <p>Vui lòng đăng nhập để xem thông báo</p>
                <button
                  className={styles.loginBtn}
                  onClick={() => {
                    setOpen(false);
                    navigate("/login");
                  }}
                >
                  Đăng nhập ngay
                </button>
              </div>
            ) : mails.length === 0 ? (
              <div className={styles.emptyState}>
                <p>Hộp thư của bạn đang trống</p>
              </div>
            ) : (
              mails.map((mail) => (
                <div
                  key={mail.id}
                  className={`${styles.item} ${
                    !mail.isRead ? styles.unread : ""
                  }`}
                  onClick={() => handleClickMail(mail)}
                >
                  <div className={styles.avatar}>HR</div>

                  <div className={styles.content}>
                    <div className={styles.topRow}>
                      <span className={styles.title}>
                        {mail.content}
                      </span>
                      <span className={styles.time}>
                        {new Date(mail.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <p className={styles.desc}>
                      {mail.type}
                    </p>
                  </div>

                  {!mail.isRead && (
                    <span className={styles.unreadDot} />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MailDropdown;