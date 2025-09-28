import { Route, Routes } from "react-router";
import ListPlantPage from "../pages/Plantas/ListPlantsPage";
import PlantsDetailsPage from "../pages/Plantas/PlantsDetailsPage";
import CareForm from "../pages/Plantas/CaresForm";
import SuggestedPage from "../pages/Calendar/SuggestedPage";
import MainLayout from "../layout/MainLayout";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" index element={<ListPlantPage />} />
        <Route path="/plants/:id" element={<PlantsDetailsPage />} />
        <Route path="/plants/:plantId/care" element={<CareForm />} />
        <Route path="/plants/:plantId/care/:id" element={<CareForm />} />
        <Route path="/calendar-recommendation" element={<SuggestedPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
