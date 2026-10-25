import {
  Header,
  Footer,
  SplitSection,
  CourseFeatures,
  VideoSection,
  ContactSection,
} from "../../components";
import {
  aboutIntro,
  aboutPillars,
  aboutVideo,
  aboutHistory,
} from "../../data/about";

export default function AboutPage() {
  return (
    <>
      <Header solid />
      <main>
        <SplitSection first {...aboutIntro} />
        <CourseFeatures {...aboutPillars} columns={3} />
        <VideoSection {...aboutVideo} />
        <SplitSection reverse {...aboutHistory} />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
