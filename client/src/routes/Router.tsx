import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home";
import CoursesPage from "../pages/Courses";
import CourseDetailsPage from "../pages/CourseDetails";
import CourseStudyPage from "../pages/CourseStudy";
import AboutPage from "../pages/About";
import NotFoundPage from "../pages/NotFound";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cursos" element={<CoursesPage />} />
      <Route path="/curso/:id" element={<CourseDetailsPage />} />
      <Route path="/curso/:id/estudar" element={<CourseStudyPage />} />
      <Route path="/sobre" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
