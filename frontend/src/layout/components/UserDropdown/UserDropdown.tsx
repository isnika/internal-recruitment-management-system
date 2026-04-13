import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserDropdown.module.css";

import type { User } from "../../../dataMock/User";
import { logout } from "../../../service/authApi";

type Props = {
  user: User;
};

const UserDropdown = ({ user }: Props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const boxRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

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

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.userBox} ref={boxRef}>

      <div
        className={styles.userInfo}
        onClick={() => setOpen(!open)}
      >
        👤 {user.fullName}
      </div>

      {open && (
        <div className={styles.dropdown}>

          <div onClick={() => navigate("/profile")}>
            Personal information
          </div>

          <div onClick={() => navigate("profile/settings")}>
            Settings
          </div>

          <div onClick={() => navigate("/help")}>
            Help
          </div>

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