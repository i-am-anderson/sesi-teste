import { useEffect, useId, useRef, type ReactNode } from "react";
import { X } from "lucide-react";
import styles from "./Drawer.module.scss";

type DrawerProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  flush?: boolean;
  side?: "left" | "right";
};

export default function Drawer({
  open,
  onClose,
  title,
  children,
  footer,
  flush = false,
  side = "left",
}: DrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // trava o scroll da página enquanto aberto
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className={`${styles.drawer} ${side === "right" ? styles.right : ""}`}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        // clique no fundo escuro (o próprio <dialog>) fecha
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.panel}>
        <header className={styles.header}>
          <h2 id={titleId} className={styles.title}>
            {title}
          </h2>
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Fechar"
          >
            <X size={24} aria-hidden="true" />
          </button>
        </header>

        <div className={`${styles.body} ${flush ? styles.flush : ""}`}>
          {children}
        </div>

        {footer && <footer className={styles.footer}>{footer}</footer>}
      </div>
    </dialog>
  );
}
