import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { StudyLayout, CourseMenu, LessonContent } from "../../components";
import NotFound from "../NotFound";
import { getCourse, type CourseDetailDto } from "../../services/courses";
import { useCourseStudy } from "../../hooks/useCourseStudy";
import styles from "./CourseStudy.module.scss";

/** Só monta quando o curso já foi carregado (os hooks precisam dele). */
function Study({ course }: { course: CourseDetailDto }) {
  const study = useCourseStudy(course);

  return (
    <StudyLayout
      renderMenu={(onNavigate) => (
        <CourseMenu
          courseId={course.id}
          courseTitle={course.fullName}
          backHref={`/curso/${course.id}`}
          percent={study.progress.percent}
          curriculum={study.curriculum}
          selectedId={study.selected.lesson.id}
          getStatus={study.getStatus}
          onNavigate={onNavigate}
        />
      )}
    >
      <LessonContent
        courseId={course.id}
        item={study.selected}
        nextItem={study.nextItem}
        isCompleted={study.isCompleted}
        isCourseDone={study.isCourseDone}
        onComplete={study.complete}
      />
    </StudyLayout>
  );
}

export default function CourseStudyPage() {
  const { id } = useParams();
  const courseId = Number(id);

  const { data: course, isError } = useQuery({
    queryKey: ["courses", courseId],
    queryFn: () => getCourse(courseId),
    enabled: Number.isInteger(courseId),
  });

  if (isError || !Number.isInteger(courseId)) return <NotFound />;
  if (!course) {
    return (
      <p className={styles.loading} role="status">
        Carregando curso…
      </p>
    );
  }
  // Curso ainda não iniciado: volta para a página de detalhes.
  if (course.status === "ComingSoon")
    return <Navigate to={`/curso/${course.id}`} replace />;

  return <Study course={course} />;
}
