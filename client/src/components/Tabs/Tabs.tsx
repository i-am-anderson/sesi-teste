import { useId, useRef, type KeyboardEvent, type ReactNode } from "react";
import styles from "./Tabs.module.scss";

export type TabItem = {
  id: string;
  label: string;
  panel: ReactNode;
};

type TabsProps = {
  items: TabItem[];
  value: string;
  onChange: (id: string) => void;
  label: string;
};

export default function Tabs({ items, value, onChange, label }: TabsProps) {
  const uid = useId();
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const active = items.find((item) => item.id === value) ?? items[0];

  const move = (index: number) => {
    const next = items[(index + items.length) % items.length];
    onChange(next.id);
    refs.current[next.id]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent, index: number) => {
    const keys: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: items.length - 1,
    };
    if (!(event.key in keys)) return;
    event.preventDefault();
    move(keys[event.key]);
  };

  return (
    <div>
      <div className={styles.list} role="tablist" aria-label={label}>
        {items.map((item, index) => {
          const selected = item.id === active.id;
          return (
            <button
              key={item.id}
              ref={(el) => {
                refs.current[item.id] = el;
              }}
              type="button"
              role="tab"
              id={`${uid}-tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`${uid}-panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              className={`${styles.tab} ${selected ? styles.selected : ""}`}
              onClick={() => onChange(item.id)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${uid}-panel-${active.id}`}
        aria-labelledby={`${uid}-tab-${active.id}`}
        className={styles.panel}
      >
        {active.panel}
      </div>
    </div>
  );
}
