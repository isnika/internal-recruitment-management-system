import styles from "./Register.module.css";

import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaRegEye } from "react-icons/fa";

import { register, sendCode } from "../../../../service/authApi";

import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

type FormData = {
  email: string;
  phone: string;
  firstName: string;
  lastName: string;

  year: string;
  month: string;
  day: string;

  gender: "MALE" | "FEMALE" | "OTHER" | "";

  password: string;
  confirmPassword: string;

  role: "CANDIDATE";
  code: string;
  companyId: number | null;
};

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormData>({
    email: "",
    phone: "",
    firstName: "",
    lastName: "",
    year: "",
    month: "",
    day: "",
    gender: "",
    password: "",
    confirmPassword: "",
    code: "",
    role: "CANDIDATE",
    companyId: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [registering, setRegistering] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendOtp = async () => {
    if (!form.email.trim()) {
      alert("Vui lòng nhập email");
      return;
    }

    try {
      setSendingOtp(true);

      const res = await sendCode({
        email: form.email.trim(),
      });

      alert(res?.data?.message || "Đã gửi mã xác thực");
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Không thể gửi mã xác thực"
      );
    } finally {
      setSendingOtp(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.email.trim()) {
      alert("Vui lòng nhập email");
      return;
    }

    if (!form.phone.trim()) {
      alert("Vui lòng nhập số điện thoại");
      return;
    }

    if (!form.firstName.trim()) {
      alert("Vui lòng nhập họ");
      return;
    }

    if (!form.lastName.trim()) {
      alert("Vui lòng nhập tên");
      return;
    }

    if (!form.year || !form.month || !form.day) {
      alert("Vui lòng nhập ngày sinh");
      return;
    }

    if (!form.gender) {
      alert("Vui lòng chọn giới tính");
      return;
    }

    if (!form.password) {
      alert("Vui lòng nhập mật khẩu");
      return;
    }

    if (form.password.length < 6) {
      alert("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Mật khẩu không khớp");
      return;
    }

    if (!form.code.trim()) {
      alert("Vui lòng nhập mã xác thực");
      return;
    }

    try {
      setRegistering(true);

      const dateOfBirth = `${form.year}-${form.month.padStart(
        2,
        "0"
      )}-${form.day.padStart(2, "0")}`;

      const res = await register({
        email: form.email.trim(),
        password: form.password,
        confirmPassword: form.confirmPassword,
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        phone: form.phone.trim(),
        gender: form.gender,
        dateOfBirth,
        code: form.code.trim(),
        role: "CANDIDATE",
        companyId: null,
      });

      alert(res?.data?.message || "Đăng ký thành công");

      console.log(res?.data);

      navigate("/login");
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Đăng ký thất bại"
      );
    } finally {
      setRegistering(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2 className={styles.logoTitle}>
          Sign up to
          <span className={styles.logoBlack}> H</span>
          <span className={styles.logoBlue}>KK</span>
          <span>Q </span>
          <span className={styles.logoItalic}>Careers</span>
        </h2>

        <div className={styles.tabs}>
          <button
            type="button"
            className={`${styles.tab} ${styles.active}`}
          >
            Candidate
          </button>

          <button
            type="button"
            className={styles.tab}
          >
            Company
          </button>
        </div>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
        >
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <label>Phone</label>
          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />

          <label>Full name</label>

          <div className={styles.row}>
            <input
              name="firstName"
              placeholder="First name"
              value={form.firstName}
              onChange={handleChange}
            />

            <input
              name="lastName"
              placeholder="Last name"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>

          <label>Year of birth</label>

          <div className={styles.row}>
            <input
              name="year"
              placeholder="Year"
              value={form.year}
              onChange={handleChange}
            />

            <select
              name="month"
              value={form.month}
              onChange={handleChange}
            >
              <option value="">Month</option>

              {[...Array(12)].map((_, i) => (
                <option
                  key={i}
                  value={String(i + 1)}
                >
                  {i + 1}
                </option>
              ))}
            </select>

            <select
              name="day"
              value={form.day}
              onChange={handleChange}
            >
              <option value="">Day</option>

              {[...Array(31)].map((_, i) => (
                <option
                  key={i}
                  value={String(i + 1)}
                >
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <label>Gender</label>

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="">
              Select gender
            </option>

            <option value="MALE">
              Male
            </option>

            <option value="FEMALE">
              Female
            </option>

            <option value="OTHER">
              Other
            </option>
          </select>

          <label>Password</label>

          <div className={styles.inputIcon}>
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />

            <FaRegEye
              className={styles.eye}
              onClick={() =>
                setShowPassword(
                  (prev) => !prev
                )
              }
            />
          </div>

          <label>Confirm Password</label>

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
          />

          <label>Verification Code</label>

          <div className={styles.otpRow}>
            <input
              name="code"
              placeholder="Enter OTP"
              value={form.code}
              onChange={handleChange}
            />

            <button
              type="button"
              className={styles.otpButton}
              onClick={handleSendOtp}
              disabled={sendingOtp}
            >
              {sendingOtp
                ? "Sending..."
                : "Get OTP"}
            </button>
          </div>

          <button
            type="submit"
            disabled={registering}
          >
            {registering
              ? "Signing up..."
              : "Sign up"}
          </button>
        </form>

        <div className={styles.divider}>
          <span></span>
          <p>or</p>
          <span></span>
        </div>

        <button className={styles.social}>
          <FcGoogle size={20} />
          Sign up with Google
        </button>

        <button className={styles.social}>
          <FaFacebook
            size={20}
            color="#1877f2"
          />
          Sign up with Facebook
        </button>

        <p className={styles.signup}>
          Do you already have an account?{" "}
          <span
            style={{ cursor: "pointer" }}
            onClick={() =>
              navigate("/login")
            }
          >
            Sign in now
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;