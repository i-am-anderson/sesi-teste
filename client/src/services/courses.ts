const BASE_URL = import.meta.env.VITE_API_URL;

async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) throw new Error(`Erro ${response.status} em ${path}`);
  return response.json() as Promise<T>;
}

export type CourseDto = {
  id: number;
  slug: string;
  fullName: string;
  shortName: string;
  description: string;
  category: { id: number; name: string };
  modality: "Online" | "InPerson";
  workloadHours: number;
  targetAudience: string;
  status: "Open" | "ComingSoon" | "Finished";
  imageUrl: string;
  availableFrom: string | null;
};

export type LessonDto = {
  id: number;
  order: number;
  title: string;
  description: string | null;
  durationMinutes: number;
};

export type TopicDto = {
  id: number;
  order: number;
  title: string;
  description: string | null;
  lessons: LessonDto[];
};

export type CourseDetailDto = CourseDto & { topics: TopicDto[] };

export type PagedResponse<T> = {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  items: T[];
};

export type CourseFilters = {
  search?: string;
  categoryId?: string;
  modality?: string;
  status?: string;
};

export type CourseFiltersOptions = {
  categories: { id: number; name: string }[];
  modalities: CourseDto["modality"][];
  statuses: CourseDto["status"][];
};

export function getCourses(pageSize = 12, page = 1, filters: CourseFilters = {}) {
  const params = new URLSearchParams({ pageSize: String(pageSize), page: String(page) });

  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });

  return get<PagedResponse<CourseDto>>(`/api/courses?${params}`);
}

export function getCourseFilters() {
  return get<CourseFiltersOptions>("/api/courses/filters");
}

export function getCourse(slug: string) {
  return get<CourseDetailDto>(`/api/courses/${slug}`);
}
