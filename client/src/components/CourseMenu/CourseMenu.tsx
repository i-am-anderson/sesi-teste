import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CircleCheck, Circle, Lock, Search } from "lucide-react";
import ProgressBar from "../ProgressBar/ProgressBar";
import Input from "../Input/Input";
import { flattenLessons, studyPath, type StudyModule } from "../../data/studyContent";
import type { LessonStatus } from "../../hooks/useCourseStudy";
import styles from "./CourseMenu.module.scss";

type CourseMenuProps = {
  courseId: number;
  courseTitle: string;
  backHref: string;
  percent: number;
  curriculum: StudyModule[];
  selectedId: string;
  getStatus: (lessonId: string) => LessonStatus;
  /** Chamado ao escolher uma aula (ex.: fechar o Drawer no mobile). */
  onNavigate?: () => void;
};

const statusText: Record<LessonStatus, string> = {
  completed: "concluída",
  unlocked: "disponível",
  locked: "bloqueada",
};

const statusIcon = {
  completed: CircleCheck,
  unlocked: Circle,
  locked: Lock,
};

/** Menu lateral: progresso, busca e módulos/aulas. */
export default function CourseMenu({
  courseId,
  courseTitle,
  backHref,
  percent,
  curriculum,
  selectedId,
  getStatus,
  onNavigate,
}: CourseMenuProps) {
  const [query, setQuery] = useState("");
  const term = query.trim().toLowerCase();

  const labels = new Map(flattenLessons(curriculum).map((item) => [item.lesson.id, item.label]));

  const modules = curriculum
    .map((module) => ({
      ...module,
      lessons: module.lessons.filter((lesson) => lesson.title.toLowerCase().includes(term)),
    }))
    .filter((module) => module.lessons.length > 0);

  return (
    <nav className={styles.menu} aria-label="Conteúdo do curso">
      <Link to={backHref} className={styles.back} onClick={onNavigate}>
        <ArrowLeft size={20} aria-hidden="true" />
        Voltar ao curso
      </Link>

      <div className={styles.header}>
        <span className={styles.eyebrow}>Certificação</span>
        <p className={styles.title}>{courseTitle}</p>
        <ProgressBar value={percent} label="Progresso no curso" />
      </div>

      <Input
        className={styles.search}
        type="search"
        label="Buscar aula"
        hideLabel
        placeholder="Buscar aula"
        icon={<Search size={18} aria-hidden="true" />}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />

      <div className={styles.list}>
        {modules.length === 0 && <p className={styles.empty}>Nenhuma aula encontrada.</p>}

        {modules.map((module) => (
          <section key={module.id} className={styles.module}>
            <h2 className={styles.moduleTitle}>{module.title}</h2>
            <ul>
              {module.lessons.map((lesson) => {
                const status = getStatus(lesson.id);
                const Icon = statusIcon[status];
                const content = (
                  <>
                    <Icon size={18} aria-hidden="true" className={styles[status]} />
                    <span className={styles.lessonName}>
                      {labels.get(lesson.id)} {lesson.title}
                    </span>
                    <span className={styles.srOnly}>({statusText[status]})</span>
                  </>
                );

                return (
                  <li key={lesson.id}>
                    {status === "locked" ? (
                      <span className={`${styles.lesson} ${styles.disabled}`} aria-disabled="true">
                        {content}
                      </span>
                    ) : (
                      <Link
                        to={studyPath(courseId, lesson.id)}
                        className={`${styles.lesson} ${lesson.id === selectedId ? styles.current : ""}`}
                        aria-current={lesson.id === selectedId ? "page" : undefined}
                        onClick={onNavigate}
                      >
                        {content}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </nav>
  );
}
