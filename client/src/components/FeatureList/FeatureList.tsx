import styles from "./FeatureList.module.scss";

export type Feature = {
  icon: string;
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
      <span className={tone === "sand" ? styles.iconSand : styles.icon}>
        <img src={icon} alt="" width="48" height="48" />
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{description}</p>
    </li>
  );
}

type FeatureListProps = {
  items: Feature[];
  columns?: 3 | 4;
  /** red: ícone vermelho (home) | sand: ícone preto sobre bege (detalhe do curso) */
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
