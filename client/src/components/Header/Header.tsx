import Container from "../Container/Container";
import Button from "../Button/Button";
import { useScrolled } from "../../hooks/useScrolled";
import { navigation, studentArea } from "../../data/navigation";
import logoWhite from "../../assets/icons/logo-sesi-industria-white.svg";
import logoPrimary from "../../assets/icons/logo-sesi-industria-primary.svg";
import styles from "./Header.module.scss";

export default function Header() {
  // Transparente no topo, ao scrollar fica branco
  const scrolled = useScrolled(0);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <Container className={styles.inner}>
        <a
          href="#"
          className={styles.logo}
          aria-label="SESI Indústria - página inicial"
        >
          <img
            src={scrolled ? logoPrimary : logoWhite}
            alt="SESI Indústria"
            width="188"
            height="19"
          />
        </a>

        <nav className={styles.nav} aria-label="Principal">
          <ul className={styles.links}>
            {navigation.map((item) => (
              <li key={item.label}>
                <a href={item.href} className={styles.link}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <Button
            href={studentArea.href}
            size="sm"
            variant={scrolled ? "outline" : "outlineLight"}
          >
            {studentArea.label}
          </Button>
        </nav>
      </Container>
    </header>
  );
}
