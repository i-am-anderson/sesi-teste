import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import styles from "./Input.module.scss";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  /** Esconde o label visualmente (continua lido por leitores de tela). */
  hideLabel?: boolean;
  icon?: ReactNode;
};

export default function Input({
  label,
  hideLabel = false,
  icon,
  id,
  className = "",
  ...rest
}: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <div className={`${styles.field} ${className}`}>
      <label
        htmlFor={inputId}
        className={hideLabel ? styles.srOnly : styles.label}
      >
        {label}
      </label>
      <div className={styles.control}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <input
          id={inputId}
          className={`${styles.input} ${icon ? styles.withIcon : ""}`}
          {...rest}
        />
      </div>
    </div>
  );
}
