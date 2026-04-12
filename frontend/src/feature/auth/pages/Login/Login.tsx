import styles from "./Login.module.css";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

const Login = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>

        {/* logo title */}
        <h2 className={styles.logoTitle}>
          Sign in to
          <span className={styles.logoBlack}> H</span>
          <span className={styles.logoBlue}>KK</span>
          <span>Q </span>
          <span className={styles.logoItalic}>Careers</span>
        </h2>

        {/* role chose */}
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${styles.active}`}>Candidate</button>
          <button className={styles.tab}>Company</button>
        </div>

        {/* gmail */}
        <label>Email or phone number</label>
        <div className={styles.inputGroup}>
          <input placeholder="Email or number phone" />
        </div>

        {/* pass */}
        <label>Password</label>
        <div className={styles.inputGroup}>
          <input type="password" placeholder="Password" />
          <span className={styles.eye}><FaRegEye /></span>
        </div>

        <div className={styles.forgot}>Forgot password</div>

        {/* nut */}
        <button className={styles.signIn}>Sign in</button>

        {/* can ngang*/}
        <div className={styles.divider}>
          <span></span>
          <p>or</p>
          <span></span>
        </div>

        {/* chose sign in*/}
        <button className={styles.social}><FcGoogle size={20} /> Sign in with Google</button>
        <button className={styles.social}><FaFacebook size={20} color="#1877f2" /> Sign in with Facebook</button>

        {/* chose khac */}
        <p className={styles.signup}>
          Don't have an account yet? <span>Sign up now</span>
        </p>

      </div>
    </div>
  );
};

export default Login;