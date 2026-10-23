import Container from "../Container/Container";
import SectionHeading from "../SectionHeading/SectionHeading";
import { stats, features } from "../../data/stats";
import styles from "./StatsSection.module.scss";

type StatItemProps = {
  value: string | number;
  label: string;
};

type FeatureItemProps = {
  icon: string;
  title: string;
  description: string;
};

export function StatItem({ value, label }: StatItemProps) {
  return (
    <li className={styles.stat}>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
    </li>
  );
}

export function FeatureItem({ icon, title, description }: FeatureItemProps) {
  return (
    <li className={styles.feature}>
      <img src={icon} alt="" width="48" height="48" />
      <h3 className={styles.featureTitle}>{title}</h3>
      <p className={styles.featureText}>{description}</p>
    </li>
  );
}

export default function StatsSection() {
  return (
    <section className={styles.section}>
      <Container className={styles.grid}>
        <SectionHeading
          title="Impacto transformador"
          description="Resultados que demonstram o sucesso da nossa metodologia de capacitação contínua para a indústria"
        />

        <div>
          <ul className={styles.stats}>
            {stats.map((item) => (
              <StatItem key={item.label} {...item} />
            ))}
          </ul>

          <ul className={styles.features}>
            {features.map((item) => (
              <FeatureItem key={item.title} {...item} />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
