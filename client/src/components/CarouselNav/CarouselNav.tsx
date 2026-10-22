import ArrowIcon from "../ArrowIcon/ArrowIcon";
import styles from "./CarouselNav.module.scss";

type CarouselNavProps = {
  onPrev: () => void;
  onNext: () => void;
  disablePrev?: boolean;
  disableNext?: boolean;
  tone?: "dark" | "light";
};

export default function CarouselNav({
  onPrev,
  onNext,
  disablePrev = false,
  disableNext = false,
  tone = "dark",
}: CarouselNavProps) {
  return (
    <div className={`${styles.nav} ${styles[tone]}`}>
      <button
        type="button"
        className={styles.button}
        onClick={onPrev}
        disabled={disablePrev}
        aria-label="Anterior"
      >
        <ArrowIcon direction="left" size={48} />
      </button>
      <button
        type="button"
        className={styles.button}
        onClick={onNext}
        disabled={disableNext}
        aria-label="Próximo"
      >
        <ArrowIcon direction="right" size={48} />
      </button>
    </div>
  );
}
