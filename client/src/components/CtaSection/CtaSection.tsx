import Container from "../Container/Container";
import Button from "../Button/Button";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { INSTITUTIONAL_VIDEO_URL } from "../../data/video";
import thumb from "../../assets/images/video-thumb.png";
import styles from "./CtaSection.module.scss";

export default function CtaSection({
  title = "Pronto para transformar sua carreira?",
  description = "Junte-se a milhares de profissionais que já estão transformando a indústria através dos nossos cursos. Invista no seu futuro hoje mesmo!",
  cta = { label: "Matricule-se", href: "#" },
  image = thumb,
  videoUrl = INSTITUTIONAL_VIDEO_URL,
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

        <VideoPlayer url={videoUrl} image={image} title={title} className={styles.media} />
      </Container>
    </section>
  );
}
