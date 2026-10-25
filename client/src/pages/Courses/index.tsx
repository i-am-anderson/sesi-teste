import { useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { LoaderCircle, Search } from "lucide-react";
import {
  Header,
  Footer,
  Container,
  SectionHeading,
  Button,
  Input,
  CourseCard,
  CourseCardSkeleton,
  CourseFilters,
  type FilterValues,
} from "../../components";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { getCourses, getCourseFilters } from "../../services/courses";
import { EMPTY_FILTERS, toCourseCardProps } from "../../data/courses";
import styles from "./Courses.module.scss";

const PAGE_SIZE = 4;

const skeletons = (key: string) =>
  Array.from({ length: PAGE_SIZE }, (_, i) => (
    <li key={`${key}-${i}`} aria-hidden="true">
      <CourseCardSkeleton />
    </li>
  ));

export default function CoursesPage() {
  // Filtros e busca vivem na URL: link compartilhável e botão "voltar" funcionam.
  const [params, setParams] = useSearchParams();
  const search = params.get("search") ?? "";
  const values: FilterValues = {
    categoryId: params.get("categoryId") ?? "",
    modality: params.get("modality") ?? "",
    status: params.get("status") ?? "",
  };

  const updateParams = (next: Record<string, string>) =>
    setParams((prev) => {
      const merged = new URLSearchParams(prev);
      Object.entries(next).forEach(([key, value]) =>
        value ? merged.set(key, value) : merged.delete(key),
      );
      return merged;
    });

  const { data: filterOptions } = useQuery({
    queryKey: ["courses", "filters"],
    queryFn: getCourseFilters,
    staleTime: Infinity,
  });

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["courses", "list", { search, ...values }],
    queryFn: ({ pageParam }) =>
      getCourses(PAGE_SIZE, pageParam, { search, ...values }),
    initialPageParam: 1,
    getNextPageParam: (last) =>
      last.page < last.totalPages ? last.page + 1 : undefined,
    select: (result) => ({
      total: result.pages[0]?.total ?? 0,
      items: result.pages.flatMap((page) => page.items.map(toCourseCardProps)),
    }),
  });

  const hasActiveFilters =
    Boolean(search) || Object.values(values).some(Boolean);
  const formRef = useRef<HTMLFormElement>(null);

  const clearAll = () => {
    formRef.current?.reset();
    updateParams({ search: "", ...EMPTY_FILTERS });
  };

  const sentinelRef = useInfiniteScroll(
    () => void fetchNextPage(),
    Boolean(hasNextPage) && !isFetchingNextPage && !isError,
  );

  const items = data?.items ?? [];
  const total = data?.total ?? 0;
  const isEmpty = !isLoading && !isError && items.length === 0;

  return (
    <>
      <Header solid />
      <main className={styles.main}>
        <Container>
          <SectionHeading
            as="h1"
            title="Todos os cursos"
            description="Encontre o curso ideal para impulsionar sua carreira na indústria."
          />

          <div className={styles.toolbar}>
            <form
              ref={formRef}
              role="search"
              className={styles.search}
              onSubmit={(event) => {
                event.preventDefault();
                const term = new FormData(event.currentTarget).get("search");
                updateParams({ search: String(term ?? "").trim() });
              }}
            >
              <Input
                key={search}
                name="search"
                type="search"
                label="Buscar cursos"
                hideLabel
                placeholder="Buscar cursos"
                defaultValue={search}
                icon={<Search size={18} aria-hidden="true" />}
                className={styles.searchInput}
              />
              <Button as="button" type="submit" variant="dark">
                Buscar
              </Button>
              {hasActiveFilters && (
                <Button as="button" variant="outline" onClick={clearAll}>
                  Limpar
                </Button>
              )}
            </form>

            <CourseFilters
              options={filterOptions}
              values={values}
              onApply={(next) => updateParams({ ...next })}
            />
          </div>

          <p className={styles.count} aria-live="polite">
            {!isLoading &&
              !isError &&
              `${total} ${total === 1 ? "curso encontrado" : "cursos encontrados"}`}
          </p>

          {isError && (
            <div className={styles.message} role="alert">
              <p>Não foi possível carregar os cursos.</p>
              <Button
                as="button"
                variant="outline"
                onClick={() => void refetch()}
              >
                Tentar novamente
              </Button>
            </div>
          )}

          {isEmpty && (
            <div className={styles.message}>
              <p>Nenhum curso encontrado para essa busca.</p>
              <Button as="button" variant="outline" onClick={clearAll}>
                Limpar busca e filtros
              </Button>
            </div>
          )}

          <ul
            className={styles.grid}
            aria-busy={isLoading || isFetchingNextPage}
          >
            {isLoading && skeletons("first")}
            {items.map((course) => (
              <li key={course.href}>
                <CourseCard {...course} />
              </li>
            ))}
            {isFetchingNextPage && skeletons("next")}
          </ul>

          {/* sentinela do scroll infinito */}
          <div ref={sentinelRef} className={styles.sentinel} />

          <div className={styles.status} role="status">
            {isFetchingNextPage && (
              <>
                <LoaderCircle
                  className={styles.spinner}
                  size={20}
                  aria-hidden="true"
                />
                Carregando mais cursos…
              </>
            )}
            {!isFetchingNextPage && !hasNextPage && items.length > 0 && (
              <>Você viu todos os cursos.</>
            )}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
