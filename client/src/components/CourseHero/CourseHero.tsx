import { Calendar, CircleCheck, CircleX, Award } from "lucide-react";
import Container from "../Container/Container";
import Button from "../Button/Button";
import CategoryTag from "../CategoryTag/CategoryTag";
import type { categories } from "../../data/courses";
import type { CourseDto } from "../../services/courses";
import styles from "./CourseHero.module.scss";

type CourseHeroProps = {
  title: string;
  image: string;
  category?: keyof typeof categories;
  status: CourseDto["status"];
  startDate?: string | null; // "YYYY-MM-DD" (usada só em ComingSoon)
  certification?: string;
  cta?: { label: string; href: string };
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
  cta = { label: "Matricule-se", href: "#" },
}: CourseHeroProps) {
  return (
    <section className={styles.hero}>
      <Container className={styles.grid}>
        <div className={styles.text}>
          <CategoryTag category={category} />
          <h1 className={styles.title}>{title}</h1>

          <ul className={styles.meta}>
            <StatusInfo status={status} startDate={startDate} />
            <li>
              <Award {...iconProps} />
              <span>
                Certificação: <strong>{certification}</strong>
              </span>
            </li>
          </ul>

          <Button href={cta.href} variant="dark" withArrow>
            {cta.label}
          </Button>
        </div>

        <img src={image} alt="" className={styles.image} />
      </Container>
    </section>
  );
}
