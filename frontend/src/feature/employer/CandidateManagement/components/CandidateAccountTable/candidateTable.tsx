import styles from "./candidateTable.module.css";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
};

export default function CandidateTable() {
  const users: User[] = [
    {
      id: 1,
      name: "Nguyen Van A",
      email: "vana@gmail.com",
      phone: "0901234567",
      role: "Frontend Developer",
      status: "Pending",
    },
    {
      id: 2,
      name: "Tran Thi B",
      email: "thib@gmail.com",
      phone: "0912345678",
      role: "Backend Developer",
      status: "Interview",
    },
    {
      id: 3,
      name: "Le Van C",
      email: "vanc@gmail.com",
      phone: "0987654321",
      role: "UI/UX Designer",
      status: "Hired",
    },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Candidate List</h2>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Position</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td>
                <span
                  className={`${styles.status} ${
                    user.status === "Hired"
                      ? styles.hired
                      : user.status === "Interview"
                      ? styles.interview
                      : styles.pending
                  }`}
                >
                  {user.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}