import {
  Calendar,
  CircleCheck,
  CircleX,
  Award,
  Clock,
  Monitor,
  MapPin,
} from "lucide-react";

import Container from "../Container/Container";
import Button from "../Button/Button";
import CategoryTag from "../CategoryTag/CategoryTag";
import {
  formatWorkload,
  modalityLabels,
  type categories,
} from "../../data/courses";
import type { CourseDto } from "../../services/courses";
import styles from "./CourseHero.module.scss";

type CourseHeroProps = {
  title: string;
  image: string;
  category?: keyof typeof categories;
  status: CourseDto["status"];
  startDate?: string | null;
  certification?: string;
  workloadHours?: number;
  audience?: string;
  modality?: CourseDto["modality"];
  cta?: { label: string; href: string; disabled?: boolean };
};

const formatDate = (iso: string) => iso.split("-").reverse().join("/");

const iconProps = { size: 16, strokeWidth: 1.5, "aria-hidden": true } as const;

function StatusInfo({
  status,
  startDate,
}: Pick<CourseHeroProps, "status" | "startDate">) {
  if (status === "ComingSoon") {
    return (
      <li>
        <Calendar {...iconProps} />
        <span>
          {startDate ? (
            <>
              Início do curso: <strong>{formatDate(startDate)}</strong>
            </>
          ) : (
            <strong>Em breve</strong>
          )}
        </span>
      </li>
    );
  }

  if (status === "Open") {
    return (
      <li>
        <CircleCheck {...iconProps} />
        <strong>Matrículas abertas</strong>
      </li>
    );
  }

  return (
    <li>
      <CircleX {...iconProps} />
      <strong>Curso encerrado</strong>
    </li>
  );
}

export default function CourseHero({
  title,
  image,
  category,
  status,
  startDate,
  certification = "SESI",
  workloadHours,
  audience,
  modality,
  cta = { label: "Matricule-se", href: "#" },
}: CourseHeroProps) {
  return (
    <section className={styles.hero}>
      <Container className={styles.grid}>
        <div className={styles.text}>
          <CategoryTag category={category} />
          <h1 className={styles.title}>{title}</h1>
          {audience && (
            <p className={styles.audience}>
              <strong>Para quem é:</strong> {audience}
            </p>
          )}

          <ul className={styles.meta}>
            <StatusInfo status={status} startDate={startDate} />
            <li>
              <Award {...iconProps} />
              <span>
                Certificação: <strong>{certification}</strong>
              </span>
            </li>
            {workloadHours !== undefined && (
              <li>
                <Clock {...iconProps} />
                <span>
                  Carga horária:{" "}
                  <strong>{formatWorkload(workloadHours)}</strong>
                </span>
              </li>
            )}
            {modality && (
              <li>
                {modality === "Online" ? (
                  <Monitor {...iconProps} />
                ) : (
                  <MapPin {...iconProps} />
                )}
                <span>
                  Modalidade: <strong>{modalityLabels[modality]}</strong>
                </span>
              </li>
            )}
          </ul>

          {cta.disabled ? (
            <Button as="button" variant="dark" disabled>
              {cta.label}
            </Button>
          ) : (
            <Button href={cta.href} variant="dark" withArrow>
              {cta.label}
            </Button>
          )}
        </div>

        <img src={image} alt="" className={styles.image} />
      </Container>
    </section>
  );
}
