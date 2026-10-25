import Container from "../Container/Container";
import Accordion, { type AccordionItem } from "../Accordion/Accordion";
import styles from "./AccordionSection.module.scss";

type AccordionSectionProps = {
  title: string;
  description?: string;
  items: AccordionItem[];
  defaultOpenIds?: string[];
};

export default function AccordionSection({
  title,
  description,
  items,
  defaultOpenIds,
}: AccordionSectionProps) {
  return (
    <section className={styles.section}>
      <Container className={styles.grid}>
        <div className={styles.intro}>
          <h2 className={styles.title}>{title}</h2>
          {description && <p className={styles.description}>{description}</p>}
        </div>

        <div className={styles.scroller} tabIndex={0}>
          <Accordion items={items} defaultOpenIds={defaultOpenIds} />
        </div>
      </Container>
    </section>
  );
}
