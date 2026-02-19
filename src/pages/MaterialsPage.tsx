import { useEffect } from "react";
import type { FormEvent } from "react";
import { useDispatch } from "react-redux";
import { Spinner } from "react-bootstrap";
import { apiService } from "../services/api";
import {
  useSearchQuery,
  useMaterials,
  useMaterialsLoading,
  setSearchQueryAction,
  setMaterialsAction,
  setLoadingAction,
} from "../store/materialsSlice";
import MaterialCard from "../components/MaterialCard";
import OrderButton from "../components/OrderButton";

const MaterialsPage: React.FC = () => {
  const dispatch = useDispatch();
  const searchQuery = useSearchQuery();
  const materials = useMaterials();
  const loading = useMaterialsLoading();

  useEffect(() => {
    if (materials.length === 0) {
      loadMaterials();
    }
  }, []);

  const loadMaterials = async () => {
    try {
      dispatch(setLoadingAction(true));
      const data = await apiService.getMaterials(searchQuery);
      dispatch(setMaterialsAction(data));
    } catch (err) {
      console.error("Error loading materials:", err);
    } finally {
      dispatch(setLoadingAction(false));
    }
  };

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    loadMaterials();
  };

  return (
    <div className="page-materials">
      <div className="container">
        <h1 className="page-materials__title">Расчет угла наклона кровли</h1>
        <p className="page-materials__subtitle">
          Выберите материал кровли для расчета оптимального угла наклона
        </p>

        <form className="page-materials__search" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="page-materials__search-input"
            placeholder="Поиск материала..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQueryAction(e.target.value))}
          />
          <button type="submit" className="page-materials__search-button">
            Найти
          </button>
        </form>

        {loading && (
          <div className="page-materials__loader">
            <Spinner animation="border" role="status" variant="light">
              <span className="visually-hidden">Загрузка...</span>
            </Spinner>
          </div>
        )}

        {!loading && materials.length === 0 && (
          <div className="page-materials__empty">
            <p>Материалы не найдены</p>
          </div>
        )}

        {!loading && materials.length > 0 && (
          <div className="page-materials__grid">
            {materials.map((material) => (
              <MaterialCard key={material.roofing_material_id} {...material} />
            ))}
          </div>
        )}
      </div>

      <OrderButton />
    </div>
  );
};

export default MaterialsPage;
