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

export function useCourseStudy(course: CourseDetailDto) {
  const [params, setParams] = useSearchParams();
  const enrollment = useEnrollment(course.slug);

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

  const currentIndex = items.findIndex(
    (item) => !completed.has(item.lesson.id),
  );
  const unlockedUntil = currentIndex === -1 ? items.length - 1 : currentIndex;

  const requestedIndex = items.findIndex(
    (item) => item.lesson.slug === params.get("aula"),
  );
  const lastIndex = items.findIndex(
    (item) => item.lesson.slug === enrollment?.lastLessonSlug,
  );

  let selectedIndex: number;
  if (requestedIndex !== -1 && requestedIndex <= unlockedUntil) {
    selectedIndex = requestedIndex;
  } else if (currentIndex !== -1) {
    selectedIndex = currentIndex; // continua de onde parou
  } else {
    selectedIndex = Math.max(lastIndex, 0);
  }

  const selected = items[selectedIndex];
  const selectedId = selected.lesson.id;
  const selectedSlug = selected.lesson.slug;

  useEffect(() => {
    if (readStudent().enrollments[course.slug]) return;
    const now = new Date().toISOString();
    saveEnrollment({
      slug: course.slug,
      title: course.fullName,
      imageUrl: course.imageUrl,
      enrolledAt: now,
      updatedAt: now,
      completedAt: null,
      lastLessonSlug: null,
      completedLessonIds: [],
      progress: computeProgress(curriculum, []),
    });
  }, [course, curriculum]);

  useEffect(() => {
    if (params.get("aula") !== selectedSlug) {
      setParams({ aula: selectedSlug }, { replace: true });
    }
  }, [params, selectedSlug, setParams]);

  useEffect(() => {
    if (enrollment && enrollment.lastLessonSlug !== selectedSlug) {
      saveEnrollment({
        ...enrollment,
        lastLessonSlug: selectedSlug,
        updatedAt: new Date().toISOString(),
      });
    }
  }, [enrollment, selectedSlug]);

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
    return (indexById.get(lessonId) ?? Infinity) <= unlockedUntil
      ? "unlocked"
      : "locked";
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
