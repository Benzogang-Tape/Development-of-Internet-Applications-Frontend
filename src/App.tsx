import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { invoke } from "@tauri-apps/api/core";
import NavigationBar from "./components/NavigationBar";
import Breadcrumbs from "./components/Breadcrumbs";
import HomePage from "./pages/HomePage";
import MaterialsPage from "./pages/MaterialsPage";
import MaterialDetailPage from "./pages/MaterialDetailPage";

function App() {
  const location = useLocation();
  const isDetailPage = location.pathname.startsWith("/materials/") && location.pathname !== "/materials";

  useEffect(() => {
    invoke('tauri', { cmd: 'create' })
      .then(() => { console.log("Tauri launched") })
      .catch(() => { console.log("Tauri not launched") })
    return () => {
      invoke('tauri', { cmd: 'close' })
        .then(() => { console.log("Tauri closed") })
        .catch(() => { console.log("Tauri not launched") })
    }
  }, [])

  return (
    <>
      {!isDetailPage && <NavigationBar />}
      {!isDetailPage && <Breadcrumbs />}
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
