import Container from "../Container/Container";
import SectionHeading from "../SectionHeading/SectionHeading";
import styles from "./VideoSection.module.scss";

type VideoSectionProps = {
  eyebrow?: string;
  title: string;
  image: string;
  href?: string;
};

/** Vídeo centralizado (por enquanto só a imagem, sem player). */
export default function VideoSection({
  eyebrow,
  title,
  image,
  href = "#",
}: VideoSectionProps) {
  return (
    <section className={styles.section}>
      <Container className={styles.content}>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          className={styles.heading}
        />
        <a
          href={href}
          className={styles.media}
          aria-label={`Assistir ao vídeo: ${title}`}
        >
          <img src={image} alt="" />
        </a>
      </Container>
    </section>
  );
}
