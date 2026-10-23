import Container from "../Container/Container";
import SectionHeading from "../SectionHeading/SectionHeading";
import Carousel from "../Carousel/Carousel";
import Button from "../Button/Button";
import CourseCard, { type CourseCardProps } from "../CourseCard/CourseCard";
import AllCoursesCard from "../CourseCard/AllCoursesCard";
import { courses } from "../../data/courses";
import styles from "./CoursesSection.module.scss";

export default function CoursesSection({
  title = "Principais cursos",
  items = courses as CourseCardProps[],
}: {
  title?: string;
  items?: CourseCardProps[];
}) {
  return (
    <section className={styles.section} id="cursos">
      <Container>
        <SectionHeading title={title} />
      </Container>

      <Carousel
        items={items}
        renderItem={(course: CourseCardProps) => <CourseCard {...course} />}
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
