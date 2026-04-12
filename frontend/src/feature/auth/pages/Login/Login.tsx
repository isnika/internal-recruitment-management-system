import styles from "./Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

import { login } from "../../../../service/authApi";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const user = await login(account, password);

      console.log("LOGIN SUCCESS:", user);

      navigate("/"); // vào home
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
          <button className={`${styles.tab} ${styles.active}`}>Candidate</button>
          <button className={styles.tab}>Company</button>
        </div>

        {/* email */}
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

        {/* login button */}
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