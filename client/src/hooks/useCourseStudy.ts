import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { CourseDetailDto } from "../services/courses";
import { readStudent, saveEnrollment } from "../services/studentStorage";
import { useEnrollment } from "./useStudent";
import {
  buildCurriculum,
  computeProgress,
  flattenLessons,
} from "../data/studyContent";

export type LessonStatus = "completed" | "unlocked" | "locked";

/**
 * Estado da página de estudo: currículo, aula selecionada (na URL, ?aula=),
 * liberação sequencial e persistência da matrícula/progresso no localStorage.
 */
export function useCourseStudy(course: CourseDetailDto) {
  const [params, setParams] = useSearchParams();
  const enrollment = useEnrollment(course.id);

  const curriculum = useMemo(() => buildCurriculum(course), [course]);
  const items = useMemo(() => flattenLessons(curriculum), [curriculum]);
  const completed = useMemo(
    () => new Set(enrollment?.completedLessonIds ?? []),
    [enrollment],
  );
  const progress = useMemo(
    () => computeProgress(curriculum, completed),
    [curriculum, completed],
  );

  // Aula liberada = a primeira não concluída e todas as anteriores.
  const currentIndex = items.findIndex((item) => !completed.has(item.lesson.id));
  const unlockedUntil = currentIndex === -1 ? items.length - 1 : currentIndex;

  const requestedIndex = items.findIndex((item) => item.lesson.id === params.get("aula"));
  const lastIndex = items.findIndex((item) => item.lesson.id === enrollment?.lastLessonId);

  let selectedIndex: number;
  if (requestedIndex !== -1 && requestedIndex <= unlockedUntil) {
    selectedIndex = requestedIndex; // aula pedida na URL (e liberada)
  } else if (currentIndex !== -1) {
    selectedIndex = currentIndex; // continua de onde parou
  } else {
    selectedIndex = Math.max(lastIndex, 0); // curso concluído
  }

  const selected = items[selectedIndex];
  const selectedId = selected.lesson.id;

  // Matricula o aluno na primeira visita.
  useEffect(() => {
    if (readStudent().enrollments[course.id]) return;
    const now = new Date().toISOString();
    saveEnrollment({
      courseId: course.id,
      title: course.fullName,
      imageUrl: course.imageUrl,
      enrolledAt: now,
      updatedAt: now,
      completedAt: null,
      lastLessonId: null,
      completedLessonIds: [],
      progress: computeProgress(curriculum, []),
    });
  }, [course, curriculum]);

  // Mantém a aula na URL (link compartilhável e botão "voltar").
  useEffect(() => {
    if (params.get("aula") !== selectedId) {
      setParams({ aula: selectedId }, { replace: true });
    }
  }, [params, selectedId, setParams]);

  // Guarda a última aula acessada.
  useEffect(() => {
    if (enrollment && enrollment.lastLessonId !== selectedId) {
      saveEnrollment({
        ...enrollment,
        lastLessonId: selectedId,
        updatedAt: new Date().toISOString(),
      });
    }
  }, [enrollment, selectedId]);

  // Ao trocar de aula, volta ao topo do conteúdo.
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [selectedId]);

  const complete = () => {
    if (!enrollment || completed.has(selectedId)) return;

    const ids = [...enrollment.completedLessonIds, selectedId];
    const next = computeProgress(curriculum, ids);
    const now = new Date().toISOString();

    saveEnrollment({
      ...enrollment,
      completedLessonIds: ids,
      progress: next,
      updatedAt: now,
      completedAt: next.percent === 100 ? now : null,
    });
  };

  const indexById = useMemo(
    () => new Map(items.map((item, index) => [item.lesson.id, index])),
    [items],
  );

  const getStatus = (lessonId: string): LessonStatus => {
    if (completed.has(lessonId)) return "completed";
    return (indexById.get(lessonId) ?? Infinity) <= unlockedUntil ? "unlocked" : "locked";
  };

  return {
    curriculum,
    selected,
    nextItem: items[selectedIndex + 1],
    isCompleted: completed.has(selectedId),
    isCourseDone: progress.percent === 100,
    progress,
    getStatus,
    complete,
  };
}
