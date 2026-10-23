import Rating from "../Rating/Rating";
import styles from "./TestimonialCard.module.scss";

type TestimonialCardProps = {
  quote: string;
  name: string;
  role: string;
  rating?: number;
};

export default function TestimonialCard({
  quote,
  name,
  role,
  rating = 5,
}: TestimonialCardProps) {
  return (
    <figure className={styles.card}>
      <blockquote className={styles.quote}>{quote}</blockquote>
      <figcaption className={styles.author}>
        <strong className={styles.name}>{name}</strong>
        <span className={styles.role}>{role}</span>
        <Rating value={rating} />
      </figcaption>
    </figure>
  );
}
