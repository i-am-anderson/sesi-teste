import Container from "../Container/Container";
import Button from "../Button/Button";
import heroImage from "../../assets/images/hero-image.png";
import styles from "./Hero.module.scss";

export default function Hero({
  title = "Impulsione sua carreira na indústria",
  description = "Amplie seus conhecimentos com excelência na melhor plataforma de estudos da indústria brasileira",
  cta = { label: "Conhecer cursos", href: "/cursos" },
  image = heroImage,
}) {
  return (
    <section className={styles.hero}>
      <img src={image} alt="" className={styles.image} />
      <div className={styles.overlay} />

      <Container className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
        <Button as="a" href={cta.href} withArrow>
          {cta.label}
        </Button>
      </Container>
    </section>
  );
}
