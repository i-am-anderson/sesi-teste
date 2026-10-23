import {
  Header,
  Hero,
  CoursesSection,
  StatsSection,
  TestimonialsSection,
  CtaSection,
  Footer,
} from "../../components";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <CoursesSection />
        <StatsSection />
        <TestimonialsSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
