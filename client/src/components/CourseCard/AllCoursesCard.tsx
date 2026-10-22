import ArrowIcon from "../ArrowIcon/ArrowIcon";
import styles from "./CourseCard.module.scss";

export default function AllCoursesCard({
  href = "#",
  label = "Todos os cursos",
}) {
  return (
    <a href={href} className={`${styles.card} ${styles.all}`}>
      <span className={styles.allLabel}>
        {label}
        <ArrowIcon size={32} />
      </span>
    </a>
  );
}
