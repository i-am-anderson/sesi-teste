import Container from "../Container/Container";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import SectionHeading from "../SectionHeading/SectionHeading";
import styles from "./VideoSection.module.scss";

type VideoSectionProps = {
  eyebrow?: string;
  title: string;
  image: string;
  /** Link do YouTube. */
  url: string;
};

/** Vídeo do YouTube centralizado, com miniatura e botão de play. */
export default function VideoSection({ eyebrow, title, image, url }: VideoSectionProps) {
  return (
    <section className={styles.section}>
      <Container className={styles.content}>
        <SectionHeading eyebrow={eyebrow} title={title} className={styles.heading} />
        <VideoPlayer url={url} image={image} title={title} className={styles.media} />
      </Container>
    </section>
  );
}
