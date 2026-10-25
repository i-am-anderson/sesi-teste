import { useEffect, useRef } from "react";
import styles from "./Accessibility.module.scss";

export default function ReadingRuler() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const setY = (y: number) =>
      ref.current?.style.setProperty("--ruler-y", `${y}px`);
    setY(window.innerHeight / 2);

    const onMove = (event: PointerEvent) => setY(event.clientY);
    const onFocus = (event: FocusEvent) => {
      const rect = (event.target as HTMLElement).getBoundingClientRect?.();
      if (rect) setY(rect.top + rect.height / 2);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("focusin", onFocus);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("focusin", onFocus);
    };
  }, []);

  return (
    <div ref={ref} className={styles.ruler} aria-hidden="true">
      <div className={styles.rulerTop} />
      <div className={styles.rulerBottom} />
    </div>
  );
}
