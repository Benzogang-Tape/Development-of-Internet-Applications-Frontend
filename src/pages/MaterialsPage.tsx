import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import type { RoofingMaterial } from "../types";
import { apiService } from "../services/api";
import MaterialCard from "../components/MaterialCard";
import OrderButton from "../components/OrderButton";

const MaterialsPage: React.FC = () => {
  const [materials, setMaterials] = useState<RoofingMaterial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    loadMaterials();
  }, []);

  const loadMaterials = async () => {
    try {
      setLoading(true);
      const data = await apiService.getMaterials(searchQuery);
      setMaterials(data);
    } catch (err) {
      console.error("Error loading materials:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
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
            onChange={(e) => setSearchQuery(e.target.value)}
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
