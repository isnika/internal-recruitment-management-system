import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserDropdown.module.css";

import type { User } from "../../../types/user";
import * as authApi from "../../../service/authApi";

type Props = {
  user: User | null;
};

const UserDropdown = ({ user }: Props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  if (!user) return null;

  // SAFE ROLE NORMALIZE
  const role = (user.role || "")
    .toString()
    .toLowerCase()
    .replace("role_", "")
    .trim();

  // ROUTES FIXED (KHÔNG LỆ THUỘC baseRoute)
  const profileRoute = "/profile";
  const settingsRoute = "/profile/settings";
  const helpRoute = "/profile/help";

  const handleLogout = async () => {
    try {
      await authApi.logout();
    } catch (err) {
      console.error("Logout API error:", err);
    } finally {
      localStorage.removeItem("access_token");
      localStorage.removeItem("user");

      setOpen(false);
      window.location.href = "/login";
    }
  };

  // OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        boxRef.current &&
        !boxRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.userBox} ref={boxRef}>
      {/* USER INFO */}
      <div
        className={styles.userInfo}
        onClick={() => setOpen(!open)}
      >
        👤 {user.firstName} {user.lastName}
        <span style={{ fontSize: "11px", marginLeft: "6px", color: "#64748b" }}>
          ({role})
        </span>
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className={styles.dropdown}>
          {/* NẾU LÀ CANDIDATE THÌ HIỂN THỊ THÊM 3 MENU NÀY */}
          {role === "candidate" && (
            <>
              <div
                onClick={() => {
                  navigate(profileRoute);
                  setOpen(false);
                }}
              >
                Personal information
              </div>

              <div
                onClick={() => {
                  navigate(settingsRoute);
                  setOpen(false);
                }}
              >
                Settings
              </div>

              <div
                onClick={() => {
                  navigate(helpRoute);
                  setOpen(false);
                }}
              >
                Help
              </div>
            </>
          )}

          {/* CÁC ROLE CÒN LẠI (ADMIN, RECRUITMENT) HOẶC CANDIDATE ĐỀU CÓ LOGOUT */}
          <div
            className={styles.logout}
            onClick={handleLogout}
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;