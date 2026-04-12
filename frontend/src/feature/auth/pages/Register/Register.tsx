import styles from "./Register.module.css";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

import { useState, ChangeEvent, FormEvent } from "react";

type FormData = {
  email: string;
  firstName: string;
  lastName: string;
  year: string;
  month: string;
  day: string;
  gender: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const [form, setForm] = useState<FormData>({
    email: "",
    firstName: "",
    lastName: "",
    year: "",
    month: "",
    day: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }

    console.log(form);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>

        {/* logo */}
        <h2 className={styles.logoTitle}>
          Sign up to
          <span className={styles.logoBlack}> H</span>
          <span className={styles.logoBlue}>KK</span>
          <span>Q </span>
          <span className={styles.logoItalic}>Careers</span>
        </h2>

        {/* tabs */}
        <div className={styles.tabs}>
          <button className={`${styles.tab} ${styles.active}`}>Candidate</button>
          <button className={styles.tab}>Company</button>
        </div>

        {/* FORM */}
        <form className={styles.form} onSubmit={handleSubmit}>

          <label>Email or phone number</label>
          <input
            type="text"
            name="email"
            placeholder="Email or phone"
            onChange={handleChange}
          />

          <label>Full name</label>
          <div className={styles.row}>
            <input name="firstName" placeholder="First name" onChange={handleChange}/>
            <input name="lastName" placeholder="Last name" onChange={handleChange}/>
          </div>

          <label>Year of birth</label>
          <div className={styles.row}>
            <input name="year" placeholder="Year" onChange={handleChange}/>

            <select name="month" onChange={handleChange}>
              <option value="">Month</option>
              {[...Array(12)].map((_, i) => (
                <option key={i}>{i + 1}</option>
              ))}
            </select>

            <select name="day" onChange={handleChange}>
              <option value="">Day</option>
              {[...Array(31)].map((_, i) => (
                <option key={i}>{i + 1}</option>
              ))}
            </select>
          </div>

          <label>Gender</label>
          <select name="gender" onChange={handleChange}>
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          {/* Password */}
          <label>Password</label>
          <div className={styles.inputIcon}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <FaRegEye
              className={styles.eye}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {/* Confirm */}
          <label>Confirm Password</label>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Password"
            onChange={handleChange}
          />

          <button type="submit">Sign up</button>
        </form>

        {/* divider */}
        <div className={styles.divider}>
          <span></span>
          <p>or</p>
          <span></span>
        </div>

        {/* social */}
        <button className={styles.social}>
          <FcGoogle size={20} /> Sign up with Google
        </button>

        <button className={styles.social}>
          <FaFacebook size={20} color="#1877f2" /> Sign up with Facebook
        </button>

        <p className={styles.signup}>
          Do you already have an account? <span>Sign in now</span>
        </p>
      </div>
    </div>
  );
};

export default Register;