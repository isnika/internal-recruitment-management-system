import UserTable from "./components/UserTable/UserTable";
import styles from "./UserAccountTable.module.css";

type Props = {
  visible: boolean;
};

export default function UserAccountTable({ visible }: Props) {
  return (
    <div
      className={`${styles.wrapper} ${
        visible ? styles.show : styles.hide
      }`}
    >
      <UserTable />
    </div>
  );
}