import Button from "../Button/Button";
import ProgressBar from "../ProgressBar/ProgressBar";
import { studyPath } from "../../data/studyContent";
import type { Enrollment } from "../../services/studentStorage";
import styles from "./EnrolledCourseCard.module.scss";

const formatDate = (iso: string) => new Date(iso).toLocaleDateString("pt-BR");

export default function EnrolledCourseCard({
  enrollment,
}: {
  enrollment: Enrollment;
}) {
  const { slug, title, imageUrl, progress, completedAt, lastLessonSlug } =
    enrollment;
  const done = completedAt !== null;
  const href = studyPath(slug, lastLessonSlug ?? undefined);

  return (
    <article className={styles.card}>
      <img src={imageUrl} alt="" className={styles.image} loading="lazy" />

      <div className={styles.body}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.meta}>
          {done
            ? `Concluído em ${formatDate(completedAt)}`
            : `${progress.completed} de ${progress.total} aulas concluídas`}
        </p>
        <ProgressBar
          value={progress.percent}
          label={`Progresso em ${title}`}
          tone="red"
        />

        <div className={styles.actions}>
          <Button href={href} size="sm" variant="dark" withArrow={!done}>
            {done ? "Rever curso" : "Continuar"}
          </Button>
          {done && (
            <Button href="#" size="sm" variant="outline">
              Certificado
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}
