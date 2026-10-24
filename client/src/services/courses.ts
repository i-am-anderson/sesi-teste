const BASE_URL = import.meta.env.VITE_API_URL;

async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) throw new Error(`Erro ${response.status} em ${path}`);
  return response.json() as Promise<T>;
}

export type CourseDto = {
  id: number;
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

export type PagedResponse<T> = {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  items: T[];
};

export function getCourses(pageSize = 12, page = 1) {
  return get<PagedResponse<CourseDto>>(
    `/api/courses?pageSize=${pageSize}&page=${page}`,
  );
}
