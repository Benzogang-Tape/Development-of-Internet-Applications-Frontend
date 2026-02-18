import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import type { RoofingMaterialDetail } from "../types";
import { apiService } from "../services/api";

const MaterialDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [material, setMaterial] = useState<RoofingMaterialDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (id) {
      loadMaterial(parseInt(id));
    }
  }, [id]);

  const loadMaterial = async (materialId: number) => {
    try {
      setLoading(true);
      setError("");
      const data = await apiService.getMaterialById(materialId);
      if (!data) {
        setError("Материал не найден");
      } else {
        setMaterial(data);
      }
    } catch (err) {
      setError("Ошибка при загрузке данных материала");
      console.error("Error loading material:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (loading) {
    return (
      <div className="page-material-detail">
        <div className="page-material-detail__loader">
          <Spinner animation="border" role="status" variant="light">
            <span className="visually-hidden">Загрузка...</span>
          </Spinner>
        </div>
      </div>
    );
  }

  if (error || !material) {
    return (
      <div className="page-material-detail">
        <div className="container">
          <div className="page-material-detail__error">
            <h2 className="page-material-detail__error-title">Ошибка</h2>
            <p className="page-material-detail__error-message">
              {error || "Материал не найден"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-material-detail">
      <div className="container">
        <div className="page-material-detail__card">
          {material.photo && !imageError ? (
            <img
              src={material.photo}
              alt={material.title}
              className="page-material-detail__image"
              onError={handleImageError}
            />
          ) : (
            <div className="page-material-detail__placeholder">🏠</div>
          )}
          <div className="page-material-detail__content">
            <h1 className="page-material-detail__name">{material.title}</h1>
            <p className="page-material-detail__description">
              {material.description}
            </p>
            <p className="page-material-detail__angles">
              <strong>min ∠:</strong> {material.min_tilt_angle}°
            </p>
            <p className="page-material-detail__angles">
              <strong>max ∠:</strong> {material.max_tilt_angle}°
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialDetailPage;
