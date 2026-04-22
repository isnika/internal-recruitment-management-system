import styles from "./Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

import { login as loginApi } from "../../../../service/authApi";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"candidate" | "company">("candidate");


const handleLogin = async () => {
  try {
    const res = await loginApi(account, password);

    const userRole = res.user.role; //  đổi tên

    // check role với tab
     const normalizedRole =
       userRole === "admin" ? "company" : userRole;

     // check role
     if (normalizedRole !== role) {
       alert("Sai loại tài khoản (Candidate / Company)");
       setPassword(""); // optional
       return;
     }

     login(res.user, res.accessToken);

     // điều hướng theo normalizedRole
     if (normalizedRole === "candidate") {
       navigate("/");
     } else if (normalizedRole === "company") {
       navigate("/layoutManagement");
     }

  } catch (err: any) {
    alert(err.message || "Login failed");
  }
};

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>

        {/* logo */}
        <h2 className={styles.logoTitle}>
          Sign in to
          <span className={styles.logoBlack}> H</span>
          <span className={styles.logoBlue}>KK</span>
          <span>Q </span>
          <span className={styles.logoItalic}>Careers</span>
        </h2>

        {/* role */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${role === "candidate" ? styles.active : ""}`}
            onClick={() => setRole("candidate")}
          >
            Candidate
          </button>

          <button
            className={`${styles.tab} ${role === "company" ? styles.active : ""}`}
            onClick={() => setRole("company")}
          >
            Company
          </button>
        </div>


        {/* account */}
        <label>Email or phone number</label>
        <div className={styles.inputGroup}>
          <input
            placeholder="Email or number phone"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
        </div>

        {/* password */}
        <label>Password</label>
        <div className={styles.inputGroup}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            className={styles.eye}
            onClick={() => setShowPassword(!showPassword)}
          >
            <FaRegEye />
          </span>
        </div>

        <div className={styles.forgot}>Forgot password</div>

        {/* login */}
        <button className={styles.signIn} onClick={handleLogin}>
          Sign in
        </button>

        {/* divider */}
        <div className={styles.divider}>
          <span></span>
          <p>or</p>
          <span></span>
        </div>

        {/* social */}
        <button className={styles.social}>
          <FcGoogle size={20} /> Sign in with Google
        </button>

        <button className={styles.social}>
          <FaFacebook size={20} color="#1877f2" /> Sign in with Facebook
        </button>

        {/* signup */}
        <p className={styles.signup}>
          Don't have an account yet? <span>Sign up now</span>
        </p>

      </div>
    </div>
  );
};

export default Login;