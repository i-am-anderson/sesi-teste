import { useId, type TextareaHTMLAttributes } from "react";
import styles from "../Input/Input.module.scss";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
};

export default function Textarea({
  label,
  id,
  className = "",
  ...rest
}: TextareaProps) {
  const autoId = useId();
  const textareaId = id ?? autoId;

  return (
    <div className={`${styles.field} ${className}`}>
      <label htmlFor={textareaId} className={styles.label}>
        {label}
      </label>
      <textarea
        id={textareaId}
        className={`${styles.input} ${styles.textarea}`}
        {...rest}
      />
    </div>
  );
}
