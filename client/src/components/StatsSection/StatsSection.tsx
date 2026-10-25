import Container from "../Container/Container";
import SectionHeading from "../SectionHeading/SectionHeading";
import FeatureList from "../FeatureList/FeatureList";
import { stats } from "../../data/stats";
import { features } from "../../data/features";
import styles from "./StatsSection.module.scss";

type StatItemProps = {
  value: string | number;
  label: string;
};

export function StatItem({ value, label }: StatItemProps) {
  return (
    <li className={styles.stat}>
      <span className={styles.value}>{value}</span>
      <span className={styles.label}>{label}</span>
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

          <FeatureList
            items={features.slice(0, 3)}
            columns={3}
            className={styles.features}
          />
        </div>
      </Container>
    </section>
  );
}
