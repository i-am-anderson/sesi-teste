import Container from "../Container/Container";
import FeatureList from "../FeatureList/FeatureList";
import { features } from "../../data/features";
import styles from "./CourseFeatures.module.scss";

export default function CourseFeatures() {
  return (
    <section className={styles.section}>
      <Container>
        <FeatureList items={features} columns={4} tone="sand" />
      </Container>
    </section>
  );
}
