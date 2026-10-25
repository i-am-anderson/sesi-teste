import styles from "./ProgressBar.module.scss";

type ProgressBarProps = {
  value: number; // 0–100
  label: string; // lido por leitores de tela
  showValue?: boolean;
  tone?: "light" | "red";
};

/** <progress> nativo estilizado, com o percentual ao lado. */
export default function ProgressBar({ value, label, showValue = true, tone = "light" }: ProgressBarProps) {
  return (
    <div className={`${styles.wrapper} ${styles[tone]}`}>
      <progress className={styles.bar} value={value} max={100} aria-label={label} />
      {showValue && <span className={styles.value}>{value}%</span>}
    </div>
  );
}
