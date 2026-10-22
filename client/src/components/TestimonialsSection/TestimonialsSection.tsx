import Container from "../Container/Container";
import SectionHeading from "../SectionHeading/SectionHeading";
import Carousel from "../Carousel/Carousel";
import TestimonialCard from "../TestimonialCard/TestimonialCard";
import { testimonials } from "../../data/testimonials";
import styles from "./TestimonialsSection.module.scss";

export default function TestimonialsSection({ items = testimonials }) {
  return (
    <section className={styles.section}>
      <Container>
        <SectionHeading
          eyebrow="Depoimentos"
          title="Quem fez recomenda"
          tone="light"
        />
      </Container>

      <Carousel
        tone="light"
        items={items}
        renderItem={(item) => <TestimonialCard {...item} />}
      />
    </section>
  );
}
