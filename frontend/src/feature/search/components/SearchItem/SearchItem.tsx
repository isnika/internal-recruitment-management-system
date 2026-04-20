import { useNavigate } from "react-router-dom";
import styles from "./SearchItem.module.css";

type Category = {
  name: string;
};

type Props<T> = {
  item: T;
  type: "book" | "job";
  onSelect?: () => void;
};

export default function SearchItem<T extends any>({
  item,
  type,
  onSelect,
}: Props<T>) {
  const navigate = useNavigate();

  const handleClick = () => {
    onSelect?.();

    if (type === "book") {
      const book = item as any;
      navigate(`/product/${book.book_id}`);
    }

    if (type === "job") {
      const job = item as any;
      navigate(`/jobs/${job.id}`);
    }
  };

  return (
    <div className={styles.item} onClick={handleClick}>
      {/* IMAGE */}
      <img
        src={
          (item as any).cover_image_url ||
          (item as any).logo ||
          `https://picsum.photos/seed/${type}/60/60`
        }
        className={styles.img}
      />

      {/* INFO */}
      <div className={styles.info}>
        <p className={styles.title}>
          {(item as any).title}
        </p>

        {/* BOOK CATEGORY */}
        {type === "book" && (item as any).categories && (
          <p className={styles.sub}>
            {(item as any).categories
              .map((c: Category) => c.name)
              .join(", ")}
          </p>
        )}

        {/* JOB INFO */}
        {type === "job" && (
          <>
            <p className={styles.sub}>
              {(item as any).company?.name}
            </p>

            <p className={styles.sub}>
              {(item as any).location}
            </p>
          </>
        )}

        {/* PRICE (BOOK) */}
        {type === "book" && (
          <p className={styles.price}>
            {(item as any).price?.toLocaleString("vi-VN")}đ
          </p>
        )}
      </div>
    </div>
  );
}