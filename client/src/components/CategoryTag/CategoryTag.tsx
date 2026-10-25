import { categories } from "../../data/courses";
import styles from "./CategoryTag.module.scss";

type CategoryTagProps = { category?: keyof typeof categories };

export default function CategoryTag({ category }: CategoryTagProps) {
  const tag = category ? categories[category] : undefined;
  if (!tag) return null;

  return (
    <span className={styles.tag} style={{ background: tag.color }}>
      <img src={tag.icon} alt="" width="16" height="16" />
      {tag.label}
    </span>
  );
}
