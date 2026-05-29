import styles from "./UserDetailModal.module.css";

const UserDetailModal = ({ open, user, loading, onClose }: any) => {
  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>User Detail</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className={styles.grid}>
            <p><b>Name:</b> {user?.firstName} {user?.lastName}</p>
            <p><b>Email:</b> {user?.email}</p>
            <p><b>Phone:</b> {user?.phone}</p>
            <p><b>Gender:</b> {user?.gender}</p>
            <p><b>DOB:</b> {user?.dateOfBirth}</p>
            <p><b>Address:</b> {user?.address}</p>

            <hr />

            <p><b>Tax Code:</b> {user?.taxCode}</p>
            <p><b>Citizen ID:</b> {user?.citizenId}</p>
            <p><b>Bank:</b> {user?.bankAccountName}</p>
            <p><b>Social:</b> {user?.socialLink}</p>

            <p><b>Status:</b> {user?.status}</p>
          </div>
        )}

        <button className={styles.closeBtn} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default UserDetailModal;