import type { ElementType, HTMLAttributes } from "react";
import styles from "./SectionHeading.module.scss";

type SectionHeadingProps = HTMLAttributes<HTMLDivElement> & {
  eyebrow?: string;
  title: string;
  description?: string;
  tone?: "dark" | "light";
  as?: ElementType;
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "dark",
  as: Tag = "h2",
  className = "",
  ...rest
}: SectionHeadingProps) {
  return (
    <div className={`${styles.heading} ${styles[tone]} ${className}`} {...rest}>
      {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
      <Tag className={styles.title}>{title}</Tag>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
