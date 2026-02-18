import { Routes, Route, Navigate } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Breadcrumbs from "./components/Breadcrumbs";
import HomePage from "./pages/HomePage";
import MaterialsPage from "./pages/MaterialsPage";
import MaterialDetailPage from "./pages/MaterialDetailPage";

function App() {
  return (
    <>
      <NavigationBar />
      <Breadcrumbs />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/materials" element={<MaterialsPage />} />
        <Route path="/materials/:id" element={<MaterialDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
