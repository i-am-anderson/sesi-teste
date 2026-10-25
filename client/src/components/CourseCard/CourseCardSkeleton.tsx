import styles from "./CourseCardSkeleton.module.scss";

export default function CourseCardSkeleton() {
  return (
    <div className={styles.card} aria-hidden="true">
      <span className={styles.tag} />
      <span
        className={`${styles.bar} ${styles.title}`}
        style={{ width: "85%" }}
      />
      <span
        className={`${styles.bar} ${styles.title}`}
        style={{ width: "60%" }}
      />
      <span
        className={`${styles.bar} ${styles.text}`}
        style={{ width: "100%" }}
      />
      <span
        className={`${styles.bar} ${styles.text}`}
        style={{ width: "70%" }}
      />
    </div>
  );
}
