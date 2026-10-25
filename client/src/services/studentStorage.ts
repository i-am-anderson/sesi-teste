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
  modules: Record<string, ModuleProgress>;
};

export type Enrollment = {
  slug: string;
  title: string;
  imageUrl: string;
  enrolledAt: string;
  updatedAt: string;
  completedAt: string | null;
  lastLessonSlug: string | null;
  completedLessonIds: string[];
  progress: CourseProgress;
};

export type StudentProfile = {
  name: string;
  email: string;
  registration: string;
  company: string;
  jobTitle: string;
  city: string;
  phone: string;
  memberSince: string;
};

export type StudentData = {
  version: 1;
  profile: StudentProfile | null;
  enrollments: Record<string, Enrollment>;
};

const EMPTY: StudentData = { version: 1, profile: null, enrollments: {} };

let cachedRaw: string | null | undefined;
let cachedData: StudentData = EMPTY;
let memoryOnly = false;

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
    cachedData =
      parsed.version === 1
        ? { ...EMPTY, ...parsed, profile: parsed.profile ?? null }
        : EMPTY;
  } catch {
    cachedData = EMPTY;
  }
  return cachedData;
}

export function subscribeStudent(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(EVENT, callback);
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
    enrollments: { ...current.enrollments, [enrollment.slug]: enrollment },
  });
}

export function saveProfile(profile: StudentProfile) {
  writeStudent({ ...readStudent(), profile });
}

export function clearProfile() {
  writeStudent({ ...readStudent(), profile: null });
}
