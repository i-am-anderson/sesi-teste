import { useState, type ReactNode } from "react";
import { Menu } from "lucide-react";
import Drawer from "../Drawer/Drawer";
import styles from "./StudyLayout.module.scss";

type StudyLayoutProps = {
  /** Recebe onNavigate para fechar o Drawer no mobile. */
  renderMenu: (onNavigate?: () => void) => ReactNode;
  children: ReactNode;
};

/**
 * Menu lateral fixo (rolagem própria) + conteúdo.
 * No mobile o menu vira o Drawer, aberto por um botão na barra superior.
 */
export default function StudyLayout({ renderMenu, children }: StudyLayoutProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>{renderMenu()}</aside>

      <div className={styles.content}>
        <div className={styles.topbar}>
          <button type="button" className={styles.menuButton} onClick={() => setOpen(true)}>
            <Menu size={20} aria-hidden="true" />
            Conteúdo do curso
          </button>
        </div>
        <main className={styles.main}>{children}</main>
      </div>

      <div className={styles.mobileOnly}>
        <Drawer open={open} onClose={() => setOpen(false)} title="Conteúdo do curso" flush>
          {renderMenu(() => setOpen(false))}
        </Drawer>
      </div>
    </div>
  );
}
