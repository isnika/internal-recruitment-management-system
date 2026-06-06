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
        const res = await notificationApi.getAll(0, 10);
        setMails(res.data.content || []);
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
          {/* HEADER */}
          <div className={styles.dropHeader}>
            <h3>Notifications</h3>
            {unreadCount > 0 && (
              <span>{unreadCount} unread</span>
            )}
          </div>

          {/* BODY */}
          <div className={styles.dropBody}>
            {!user ? (
              <div className={styles.emptyState}>
                <p>Please log in to view notifications</p>
                <button
                  className={styles.loginBtn}
                  onClick={() => {
                    setOpen(false);
                    navigate("/login");
                  }}
                >
                  Log in
                </button>
              </div>
            ) : mails.length === 0 ? (
              <div className={styles.emptyState}>
                <p>Your inbox is empty</p>
              </div>
            ) : (
              <>
                {mails.map((mail) => (
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

                      <p className={styles.desc}>{mail.type}</p>
                    </div>

                    {!mail.isRead && (
                      <span className={styles.unreadDot} />
                    )}
                  </div>
                ))}

                {/* FUTURE FEATURE */}
                <div className={styles.futureFeature}>
                  Coming soon
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MailDropdown;