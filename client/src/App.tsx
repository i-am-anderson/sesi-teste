import {
  Header,
  Hero,
  CoursesSection,
  StatsSection,
  TestimonialsSection,
  CtaSection,
  Footer,
} from "./components";

export default function App() {
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
