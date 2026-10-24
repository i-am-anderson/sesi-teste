import Container from "../Container/Container";
import Button from "../Button/Button";
import styles from "./EnrollBar.module.scss";

type EnrollBarProps = {
  title: string;
  cta?: { label: string; href: string };
};

export default function EnrollBar({ title, cta = { label: "Matricule-se", href: "#" } }: EnrollBarProps) {
  return (
    <div className={styles.wrapper}>
      <Container className={styles.bar}>
        <p className={styles.title}>{title}</p>
        <Button href={cta.href} withArrow>
          {cta.label}
        </Button>
      </Container>
    </div>
  );
}