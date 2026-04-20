import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import styles from "./SubmitSuccessMessage.module.css";

const SubmitSuccessMessage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <FaCheckCircle className={styles.icon} />
        <p className={styles.message}>
          Your CV has been successfully submitted. Please check your
          notifications or email for updates.
        </p>
        <button className={styles.returnBtn} onClick={() => navigate("/")}>
          Return Home
        </button>
      </div>
    </div>
  );
};

export default SubmitSuccessMessage;
