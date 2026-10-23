import star from "../../assets/icons/star.svg";
import styles from "./Rating.module.scss";

export default function Rating({ value = 5, max = 5 }) {
  return (
    <div
      className={styles.rating}
      role="img"
      aria-label={`Avaliação ${value} de ${max}`}
    >
      {Array.from({ length: max }, (_, i) => (
        <img
          key={i}
          src={star}
          alt=""
          width="20"
          height="20"
          className={i < value ? styles.on : styles.off}
        />
      ))}
    </div>
  );
}
