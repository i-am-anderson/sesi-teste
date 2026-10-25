import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, User } from "lucide-react";
import Container from "../Container/Container";
import Button from "../Button/Button";
import Drawer from "../Drawer/Drawer";
import { useScrolled } from "../../hooks/useScrolled";
import { useAuth } from "../../hooks/useAuth";
import { navigation, studentArea } from "../../data/navigation";
import logoWhite from "../../assets/icons/logo-sesi-industria-white.svg";
import logoPrimary from "../../assets/icons/logo-sesi-industria-primary.svg";
import styles from "./Header.module.scss";

type HeaderProps = {
  solid?: boolean;
};

export default function Header({ solid = false }: HeaderProps) {
  const scrolled = useScrolled(0) || solid;
  const { student } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const accountLabel = student ? student.name.split(" ")[0] : studentArea.label;
  const accountIcon = student && <User size={16} aria-hidden="true" />;

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <Container className={styles.inner}>
          <Link
            to="/"
            className={styles.logo}
            aria-label="SESI Indústria - página inicial"
          >
            <img
              src={scrolled ? logoPrimary : logoWhite}
              alt="SESI Indústria"
              width="188"
              height="19"
            />
          </Link>

          <nav className={styles.nav} aria-label="Principal">
            <ul className={styles.links}>
              {navigation.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Button
              href={studentArea.href}
              size="sm"
              className={`${styles.account} ${styles.desktopOnly}`}
              variant={scrolled ? "outline" : "outlineLight"}
            >
              {accountIcon}
              {accountLabel}
            </Button>

            <button
              type="button"
              className={styles.menuButton}
              onClick={() => setMenuOpen(true)}
              aria-haspopup="dialog"
              aria-label="Abrir menu"
            >
              <Menu size={28} aria-hidden="true" />
            </button>
          </nav>
        </Container>
      </header>

      <Drawer
        open={menuOpen}
        onClose={closeMenu}
        title="Menu"
        footer={
          <Button
            href={studentArea.href}
            variant="dark"
            className={styles.account}
            onClick={closeMenu}
          >
            {accountIcon}
            {accountLabel}
          </Button>
        }
      >
        <ul className={styles.mobileLinks}>
          {navigation.map((item) => (
            <li key={item.label}>
              <Link to={item.href} className={styles.mobileLink} onClick={closeMenu}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </Drawer>
    </>
  );
}