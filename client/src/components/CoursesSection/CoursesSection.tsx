import { useQuery } from "@tanstack/react-query";
import Container from "../Container/Container";
import SectionHeading from "../SectionHeading/SectionHeading";
import Carousel from "../Carousel/Carousel";
import Button from "../Button/Button";
import CourseCard, { type CourseCardProps } from "../CourseCard/CourseCard";
import CourseCardSkeleton from "../CourseCard/CourseCardSkeleton";
import AllCoursesCard from "../CourseCard/AllCoursesCard";
import { getCourses } from "../../services/courses";
import { toCourseCardProps } from "../../data/courses";
import styles from "./CoursesSection.module.scss";

const SKELETON_COUNT = 5;
const skeletons = Array.from({ length: SKELETON_COUNT }, () => null);

export default function CoursesSection({
  title = "Principais cursos",
}: {
  title?: string;
}) {
  const { data: courses = [], isLoading } = useQuery({
    queryKey: ["courses", { pageSize: SKELETON_COUNT, page: 1 }],
    queryFn: () => getCourses(SKELETON_COUNT),
    select: (data) => data.items.map(toCourseCardProps),
  });

  const items: (CourseCardProps | null)[] = isLoading ? skeletons : courses;

  return (
    <section className={styles.section} id="cursos" aria-busy={isLoading}>
      <Container>
        <SectionHeading title={title} />
      </Container>

      <Carousel
        items={items}
        renderItem={(course) =>
          course ? <CourseCard {...course} /> : <CourseCardSkeleton />
        }
        extraSlide={<AllCoursesCard href="/cursos" />}
        footerStart={
          <Button href="/cursos" variant="outline" size="sm">
            Ver todos os cursos
          </Button>
        }
      />
    </section>
  );
}
