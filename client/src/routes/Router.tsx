import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/Home";
import NotFoundPage from "../pages/NotFound";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Router;
