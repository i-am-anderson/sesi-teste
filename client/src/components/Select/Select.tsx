import { useId, type SelectHTMLAttributes } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./Select.module.scss";

type SelectOption = { value: string; label: string };

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: SelectOption[];
  /** Texto da opção vazia (value=""). */
  placeholder?: string;
};

export default function Select({
  label,
  options,
  placeholder = "Todos",
  id,
  className = "",
  ...rest
}: SelectProps) {
  const autoId = useId();
  const selectId = id ?? autoId;

  return (
    <div className={`${styles.field} ${className}`}>
      <label htmlFor={selectId} className={styles.label}>
        {label}
      </label>
      <div className={styles.control}>
        <select id={selectId} className={styles.select} {...rest}>
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className={styles.chevron} size={18} aria-hidden="true" />
      </div>
    </div>
  );
}
