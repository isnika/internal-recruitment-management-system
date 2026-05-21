import styles from "./CVModal.module.css";

type Props = {
  url: string | null;
  onClose: () => void;
};

export default function CVModal({ url, onClose }: Props) {
  if (!url) return null;

  return (
    <div
      className={styles.modalOverlay}
      onClick={onClose}
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={url}
          title="Candidate CV"
          className={styles.cvFrame}
        />

        <a
          href={url}
          target="_blank"
          rel="noreferrer"
        >
          Open CV in new tab
        </a>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}