import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaRegEye, FaEyeSlash } from "react-icons/fa";

import styles from "./Login.module.css";
import * as authApi from "../../../../service/authApi";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // --- States ---
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [roleType, setRoleType] = useState<"candidate" | "company">("candidate");

  //
  const getDashboardRoute = (role: string) => {
    //
    console.log("Vai trò nhận được:", role);

    const r = role?.toUpperCase();

    if (r === "ADMIN" || r === "RECRUITER") {
      return "/layoutManagement";
    }
    return "/";
  };

  // --- Login Handler ---
  const handleLogin = async () => {
      if (!account || !password) return alert("Vui lòng điền đầy đủ thông tin");

      setLoading(true);
      try {
        const res = await authApi.login({ email: account, password });


        const authData = res.data?.data ? res.data.data : res.data;

        console.log("Dữ liệu sau khi bóc tách:", authData);

        if (!authData?.token) {
          throw new Error("Không tìm thấy token trong phản hồi");
        }

        localStorage.setItem("access_token", authData.token);
        localStorage.setItem("user", JSON.stringify(authData));

        login(authData, authData.token);


        const role = authData.role?.toUpperCase();

        // Điều hướng
        navigate(getDashboardRoute(role));

      } catch (err: any) {
        console.error("Login Error:", err);
        alert(err?.message || "Đăng nhập thất bại");
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.logoTitle}>
          Sign in to <span className={styles.logoBlack}>H</span>
          <span className={styles.logoBlue}>KK</span>Q
          <span className={styles.logoItalic}>Careers</span>
        </h2>

        {/* Role Tabs */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${roleType === "candidate" ? styles.active : ""}`}
            onClick={() => setRoleType("candidate")}
          >Candidate</button>
          <button
            className={`${styles.tab} ${roleType === "company" ? styles.active : ""}`}
            onClick={() => setRoleType("company")}
          >Company</button>
        </div>

        {/* Input Fields */}
        <label>Email or phone number</label>
        <div className={styles.inputGroup}>
          <input
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            placeholder="Email or phone number"
          />
        </div>

        <label>Password</label>
        <div className={styles.inputGroup}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <span className={styles.eye} onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaRegEye />}
          </span>
        </div>

        <div className={styles.forgot} onClick={() => navigate("/forgotPassW")}>
          Forgot password?
        </div>

        {/* Action Button */}
        <button
          className={styles.signIn}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <div className={styles.divider}>
          <span></span><p>or</p><span></span>
        </div>

        <button className={styles.social}><FcGoogle size={20} /> Sign in with Google</button>
        <button className={styles.social}><FaFacebook size={20} color="#1877f2" /> Sign in with Facebook</button>

        <p className={styles.signup}>
          Don't have an account yet?{" "}
          <span onClick={() => navigate("/register")}>Sign up now</span>
        </p>
      </div>
    </div>
  );
};

export default Login;