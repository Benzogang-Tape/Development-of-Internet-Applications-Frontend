import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import type { RoofingMaterialDetail } from "../types";
import { apiService } from "../services/api";

const MaterialDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [material, setMaterial] = useState<RoofingMaterialDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (!id || isNaN(parseInt(id))) {
      navigate("/", { replace: true });
      return;
    }
    loadMaterial(parseInt(id));
  }, [id, navigate]);

  const loadMaterial = async (materialId: number) => {
    try {
      setLoading(true);
      const data = await apiService.getMaterialById(materialId);
      if (!data) {
        navigate("/", { replace: true });
        return;
      }
      setMaterial(data);
    } catch {
      navigate("/", { replace: true });
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

  if (!material) {
    return null;
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
            <div className="page-material-detail__placeholder">
              <img src="/favicon.svg" alt="RoofMaster" width={240} height={240} />
            </div>
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
