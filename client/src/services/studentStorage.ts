/**
 * Dados do aluno guardados no localStorage (simulação até existir API).
 * Estrutura pensada para a futura Área do Aluno: cada matrícula já traz
 * título, imagem e o progresso do curso e de cada módulo.
 */
const KEY = "sesi:student";
const EVENT = "sesi:student-change";

export type ModuleProgress = {
  title: string;
  completed: number;
  total: number;
  percent: number;
};

export type CourseProgress = {
  percent: number;
  completed: number;
  total: number;
  /** Progresso por módulo, indexado pelo id do módulo. */
  modules: Record<string, ModuleProgress>;
};

export type Enrollment = {
  courseId: number;
  title: string;
  imageUrl: string;
  enrolledAt: string; // ISO
  updatedAt: string; // ISO
  completedAt: string | null; // ISO, quando chega a 100%
  lastLessonId: string | null;
  completedLessonIds: string[];
  progress: CourseProgress;
};

export type StudentData = {
  version: 1;
  /** Cursos matriculados, indexados pelo id do curso. */
  enrollments: Record<number, Enrollment>;
};

const EMPTY: StudentData = { version: 1, enrollments: {} };

// A leitura precisa devolver a MESMA referência enquanto nada mudou
// (exigência do useSyncExternalStore), então guardamos o último valor lido.
let cachedRaw: string | null | undefined;
let cachedData: StudentData = EMPTY;
let memoryOnly = false; // localStorage indisponível: mantém só em memória

export function readStudent(): StudentData {
  if (memoryOnly) return cachedData;

  let raw: string | null = null;
  try {
    raw = localStorage.getItem(KEY);
  } catch {
    // acesso bloqueado (ex.: modo privado)
  }
  if (raw === cachedRaw) return cachedData;

  cachedRaw = raw;
  try {
    const parsed = raw ? (JSON.parse(raw) as StudentData) : EMPTY;
    cachedData = parsed.version === 1 ? parsed : EMPTY;
  } catch {
    cachedData = EMPTY;
  }
  return cachedData;
}

export function subscribeStudent(callback: () => void) {
  window.addEventListener("storage", callback); // outras abas
  window.addEventListener(EVENT, callback); // esta aba
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(EVENT, callback);
  };
}

function writeStudent(data: StudentData) {
  const json = JSON.stringify(data);
  try {
    localStorage.setItem(KEY, json);
  } catch {
    memoryOnly = true;
  }
  cachedRaw = json;
  cachedData = data;
  window.dispatchEvent(new Event(EVENT));
}

export function saveEnrollment(enrollment: Enrollment) {
  const current = readStudent();
  writeStudent({
    ...current,
    enrollments: { ...current.enrollments, [enrollment.courseId]: enrollment },
  });
}
