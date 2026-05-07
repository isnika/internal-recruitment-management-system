import { Outlet } from "react-router-dom";
import MenuEmployer from "../../components/Menu/menuEmployer";
import styles from "./homeEmployer.module.css";

const HomeEmployer = () => {
  return (
    <div className={styles.container}>
      <MenuEmployer />
      <main className={styles.content}>
            <div className={styles.body}>
                <Outlet />
            </div>
      </main>

    </div>
  );
};

export default HomeEmployer;