import Container from "../Container/Container";
import SectionHeading from "../SectionHeading/SectionHeading";
import Button from "../Button/Button";
import styles from "./ContactCtaSection.module.scss";

type ContactCtaSectionProps = {
  eyebrow?: string;
  title?: string;
  cta?: { label: string; href: string };
};

export default function ContactCtaSection({
  eyebrow = "Precisa de ajuda para decidir?",
  title = "Fale com a gente",
  cta = { label: "Mandar uma mensagem", href: "#" },
}: ContactCtaSectionProps) {
  return (
    <section className={styles.section}>
      <Container className={styles.content}>
        <SectionHeading eyebrow={eyebrow} title={title} tone="light" />
        <Button href={cta.href} withArrow>
          {cta.label}
        </Button>
      </Container>
    </section>
  );
}