import Container from "../Container/Container";
import Button from "../Button/Button";
import thumb from "../../assets/images/video-thumb.png";
import styles from "./CtaSection.module.scss";

export default function CtaSection({
  title = "Pronto para transformar sua carreira?",
  description = "Junte-se a milhares de profissionais que já estão transformando a indústria através dos nossos cursos. Invista no seu futuro hoje mesmo!",
  cta = { label: "Matricule-se", href: "#" },
  image = thumb,
}) {
  return (
    <section className={styles.section}>
      <Container className={styles.grid}>
        <div className={styles.text}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
          <Button href={cta.href} withArrow>
            {cta.label}
          </Button>
        </div>

        <a href="#" className={styles.media} aria-label="Assistir ao vídeo">
          <img src={image} alt="" />
        </a>
      </Container>
    </section>
  );
}
