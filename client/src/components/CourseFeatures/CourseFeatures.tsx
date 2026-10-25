import Container from "../Container/Container";
import SectionHeading from "../SectionHeading/SectionHeading";
import FeatureList, { type Feature } from "../FeatureList/FeatureList";
import { features } from "../../data/features";
import styles from "./CourseFeatures.module.scss";

type CourseFeaturesProps = {
  items?: Feature[];
  columns?: 3 | 4;
  tone?: "red" | "sand";
  eyebrow?: string;
  title?: string;
};

export default function CourseFeatures({
  items = features,
  columns = 4,
  tone = "sand",
  eyebrow,
  title,
}: CourseFeaturesProps) {
  return (
    <section className={styles.section}>
      <Container>
        {title && (
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            className={styles.heading}
          />
        )}
        <FeatureList items={items} columns={columns} tone={tone} />
      </Container>
    </section>
  );
}
