import Container from "../Container/Container";
import SectionHeading from "../SectionHeading/SectionHeading";
import Carousel from "../Carousel/Carousel";
import TestimonialCard from "../TestimonialCard/TestimonialCard";
import { testimonials } from "../../data/testimonials";
import styles from "./TestimonialsSection.module.scss";

type TestimonialsSectionProps = {
  items?: typeof testimonials;
  /** red: fundo vermelho (home) | sand: fundo bege com cards brancos */
  variant?: "red" | "sand";
};

export default function TestimonialsSection({
  items = testimonials,
  variant = "red",
}: TestimonialsSectionProps) {
  const isSand = variant === "sand";

  return (
    <section className={`${styles.section} ${styles[variant]}`}>
      <Container>
        <SectionHeading
          eyebrow="Depoimentos"
          title="Quem fez recomenda"
          tone={isSand ? "dark" : "light"}
        />
      </Container>

      <Carousel
        tone={isSand ? "dark" : "light"}
        items={items}
        renderItem={(item) => (
          <TestimonialCard {...item} variant={isSand ? "light" : "red"} />
        )}
      />
    </section>
  );
}