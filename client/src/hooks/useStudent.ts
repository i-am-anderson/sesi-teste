import { useSyncExternalStore } from "react";
import { readStudent, subscribeStudent } from "../services/studentStorage";

/** Todos os dados do aluno (reage a mudanças, inclusive de outras abas). */
export function useStudentData() {
  return useSyncExternalStore(subscribeStudent, readStudent);
}

/** Matrícula de um curso, ou undefined se o aluno ainda não se matriculou. */
export function useEnrollment(slug: string) {
  return useStudentData().enrollments[slug];
}
