import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  Header,
  Footer,
  TestimonialsSection,
  CourseHero,
  CourseFeatures,
  AccordionSection,
  ModulesList,
  TextSections,
  FaqList,
  ContactCtaSection,
  EnrollBar,
  Container,
} from "../../components";
import NotFound from "../NotFound";
import { getCourse } from "../../services/courses";
import { categoryById } from "../../data/courses";
import { onlineSections, faq } from "../../data/courseInfo";
import styles from "./CourseDetails.module.scss";

export default function CourseDetailsPage() {
  const { id } = useParams();
  const courseId = Number(id);

  const {
    data: course,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["courses", courseId],
    queryFn: () => getCourse(courseId),
    enabled: Number.isInteger(courseId),
  });

  if (isError || !Number.isInteger(courseId)) return <NotFound />;

  return (
    <>
      <Header solid />
      <main className={styles.main} aria-busy={isLoading}>
        {isLoading && (
          <Container>
            <p className={styles.loading} role="status">
              Carregando curso…
            </p>
          </Container>
        )}
        {course && (
          <>
            <CourseHero
              title={course.fullName}
              image={course.imageUrl}
              category={categoryById[course.category.id]}
              status={course.status}
              startDate={course.availableFrom}
            />
            <CourseFeatures />
            <AccordionSection
              title="Sobre o curso"
              description={course.description}
              defaultOpenIds={[]}
              items={[
                {
                  id: "modulos",
                  title: "Módulos",
                  content: <ModulesList topics={course.topics} />,
                },
                {
                  id: "aulas",
                  title: "Aulas online e avaliações",
                  content: <TextSections sections={onlineSections} />,
                },
                {
                  id: "duvidas",
                  title: "Dúvidas frequentes",
                  content: <FaqList items={faq} />,
                },
              ]}
            />
            <TestimonialsSection variant="sand" />
            <ContactCtaSection />
          </>
        )}
      </main>
      <Footer />
      {course && <EnrollBar title={course.fullName} />}
    </>
  );
}
