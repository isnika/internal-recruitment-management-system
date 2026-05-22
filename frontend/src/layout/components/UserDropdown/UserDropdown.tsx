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

  // SAFE ROLE NORMALIZE
  const role = user?.role?.toString().trim().toLowerCase() || "";

  const isCandidate = role === "candidate";
  const isAdmin = role === "admin";
  const isRecruiter = role === "recruiter";


  // BASE ROUTE
  let baseRoute = "/management";
  if (isCandidate) baseRoute = "/profile";

  // LOGOUT (FIXED: Xóa sạch & Reload)

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

  //      
  // OUTSIDE CLICK
  //      
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Guard Clause
  if (!user) return null;

  return (
    <div className={styles.userBox} ref={boxRef}>
      {/* USER INFO */}
      <div className={styles.userInfo} onClick={() => setOpen(!open)}>
        👤 {user.firstName} {user.lastName}
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className={styles.dropdown}>
          <div
            onClick={() => {
              navigate(baseRoute);
              setOpen(false);
            }}
          >
            Personal information
          </div>

          <div
            onClick={() => {
              navigate(`${baseRoute}/settings`);
              setOpen(false);
            }}
          >
            Settings
          </div>

          <div
            onClick={() => {
              navigate(`${baseRoute}/help`);
              setOpen(false);
            }}
          >
            Help
          </div>

          <div className={styles.logout} onClick={handleLogout}>
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;