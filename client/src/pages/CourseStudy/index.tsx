import { Navigate, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { StudyLayout, CourseMenu, LessonContent } from "../../components";
import NotFound from "../NotFound";
import { getCourse, type CourseDetailDto } from "../../services/courses";
import { useCourseStudy } from "../../hooks/useCourseStudy";
import styles from "./CourseStudy.module.scss";

function Study({ course }: { course: CourseDetailDto }) {
  const study = useCourseStudy(course);

  return (
    <StudyLayout
      renderMenu={(onNavigate) => (
        <CourseMenu
          slug={course.slug}
          courseTitle={course.fullName}
          backHref={"/area-do-aluno"}
          percent={study.progress.percent}
          curriculum={study.curriculum}
          selectedId={study.selected.lesson.id}
          getStatus={study.getStatus}
          onNavigate={onNavigate}
        />
      )}
    >
      <LessonContent
        slug={course.slug}
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
  const { slug } = useParams();
  const { loggedIn } = useAuth();
  const location = useLocation();

  const { data: course, isError } = useQuery({
    queryKey: ["courses", slug],
    queryFn: () => getCourse(slug!),
    enabled: !!slug && loggedIn,
  });

  if (!loggedIn) {
    const from = location.pathname + location.search;
    return <Navigate to="/login" replace state={{ from }} />;
  }

  if (isError || !slug) return <NotFound />;
  if (!course) {
    return (
      <p className={styles.loading} role="status">
        Carregando curso…
      </p>
    );
  }
  // Curso ainda não iniciado: volta para a página de detalhes.
  if (course.status === "ComingSoon")
    return <Navigate to={`/curso/${course.slug}`} replace />;

  return <Study course={course} />;
}
