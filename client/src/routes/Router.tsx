import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home";
import CoursesPage from "../pages/Courses";
import CourseDetailsPage from "../pages/CourseDetails";
import CourseStudyPage from "../pages/CourseStudy";
import AboutPage from "../pages/About";
import NotFoundPage from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../pages/Login";
import StudentAreaPage from "../pages/StudentArea";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cursos" element={<CoursesPage />} />
      <Route path="/curso/:slug" element={<CourseDetailsPage />} />
      <Route path="/curso/:slug/estudar" element={<CourseStudyPage />} />
      <Route path="/sobre" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/area-do-aluno" element={<StudentAreaPage />} />
        <Route path="/curso/:id/estudar" element={<CourseStudyPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
