import type { ReactNode } from "react";
import styles from "./FeatureList.module.scss";

export type Feature = {
  icon: string | ReactNode;
  title: string;
  description: string;
};

type FeatureItemProps = Feature & { tone?: "red" | "sand" };

export function FeatureItem({
  icon,
  title,
  description,
  tone = "red",
}: FeatureItemProps) {
  return (
    <li className={styles.feature}>
      {typeof icon === "string" ? (
        <span className={tone === "sand" ? styles.iconSand : styles.icon}>
          <img src={icon} alt="" width="48" height="48" />
        </span>
      ) : (
        <span
          className={`${styles.iconBox} ${tone === "sand" ? styles.boxSand : styles.boxRed}`}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{description}</p>
    </li>
  );
}

type FeatureListProps = {
  items: Feature[];
  columns?: 3 | 4;
  tone?: "red" | "sand";
  className?: string;
};

export default function FeatureList({
  items,
  columns = 3,
  tone = "red",
  className = "",
}: FeatureListProps) {
  return (
    <ul className={`${styles.list} ${styles[`cols${columns}`]} ${className}`}>
      {items.map((item) => (
        <FeatureItem key={item.title} tone={tone} {...item} />
      ))}
    </ul>
  );
}
