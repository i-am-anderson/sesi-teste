import { useQuery } from "@tanstack/react-query";
import Container from "../Container/Container";
import SectionHeading from "../SectionHeading/SectionHeading";
import Carousel from "../Carousel/Carousel";
import Button from "../Button/Button";
import CourseCard, { type CourseCardProps } from "../CourseCard/CourseCard";
import CourseCardSkeleton from "../CourseCard/CourseCardSkeleton";
import AllCoursesCard from "../CourseCard/AllCoursesCard";
import { getCourses, type CourseDto } from "../../services/courses";
import styles from "./CoursesSection.module.scss";

const categoryById: Record<number, CourseCardProps["category"]> = {
  1: "natureza",
  2: "matematica",
  3: "linguagens",
};

const toCourseCardProps = (course: CourseDto): CourseCardProps => ({
  title: course.fullName,
  description: course.description,
  image: course.imageUrl,
  category: categoryById[course.category.id],
  href: `/curso/${course.id}`,
});

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
        extraSlide={<AllCoursesCard href="#" />}
        footerStart={
          <Button href="#" variant="outline" size="sm">
            Ver todos os cursos
          </Button>
        }
      />
    </section>
  );
}
