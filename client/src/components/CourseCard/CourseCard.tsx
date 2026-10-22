import { categories } from "../../data/courses";
import styles from "./CourseCard.module.scss";

export type CourseCardProps = {
  title: string;
  description: string;
  image: string;
  category: keyof typeof categories;
  href?: string;
};

export function CourseCard({
  title,
  description,
  image,
  category,
  href = "#",
}: CourseCardProps) {
  const tag = categories[category];

  return (
    <a href={href} className={styles.card}>
      <img src={image} alt="" className={styles.image} loading="lazy" />
      <div className={styles.overlay} />

      {tag && (
        <span className={styles.tag} style={{ background: tag.color }}>
          <img src={tag.icon} alt="" width="16" height="16" />
          {tag.label}
        </span>
      )}

      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </a>
  );
}

export default CourseCard;
