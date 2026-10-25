import Container from "../Container/Container";
import SectionHeading from "../SectionHeading/SectionHeading";
import Button from "../Button/Button";
import styles from "./SplitSection.module.scss";

type SplitSectionProps = {
  eyebrow?: string;
  title: string;
  paragraphs: string[];
  image: string;
  imageAlt?: string;
  cta?: { label: string; href: string };
  reverse?: boolean;
  first?: boolean;
};

export default function SplitSection({
  eyebrow,
  title,
  paragraphs,
  image,
  imageAlt = "",
  cta,
  reverse = false,
  first = false,
}: SplitSectionProps) {
  return (
    <section className={`${styles.section} ${first ? styles.first : ""}`}>
      <Container className={`${styles.grid} ${reverse ? styles.reverse : ""}`}>
        <div className={styles.text}>
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            as={first ? "h1" : "h2"}
          />
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
          {cta && (
            <Button
              href={cta.href}
              variant="dark"
              withArrow
              className={styles.cta}
            >
              {cta.label}
            </Button>
          )}
        </div>

        <img src={image} alt={imageAlt} className={styles.image} />
      </Container>
    </section>
  );
}
