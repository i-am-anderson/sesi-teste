import { useState, type ReactNode } from "react";
import styles from "./Accordion.module.scss";

export type AccordionItem = {
  id: string;
  title: string;
  content: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  defaultOpenIds?: string[];
};

export default function Accordion({ items, defaultOpenIds }: AccordionProps) {
  const [open, setOpen] = useState<Set<string>>(
    () => new Set(defaultOpenIds ?? items.map((item) => item.id)),
  );

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (!next.delete(id)) next.add(id);
      return next;
    });

  return (
    <div>
      {items.map((item) => {
        const isOpen = open.has(item.id);

        return (
          <section key={item.id} className={styles.item}>
            <h3 className={styles.heading}>
              <button
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={`${item.id}-panel`}
                id={`${item.id}-trigger`}
                onClick={() => toggle(item.id)}
              >
                <span>{item.title}</span>
                <span
                  className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}
                  aria-hidden="true"
                />
              </button>
            </h3>

            <div
              id={`${item.id}-panel`}
              role="region"
              aria-labelledby={`${item.id}-trigger`}
              className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}
            >
              <div className={styles.panelInner}>{item.content}</div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
