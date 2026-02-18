import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import type { RoofingMaterialDetail } from "../types";
import { apiService } from "../services/api";
import SidebarNavigation from "../components/SidebarNavigation";
import Breadcrumbs from "../components/Breadcrumbs";
import MaterialDetailModal from "../components/MaterialDetailModal";

const MaterialDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [material, setMaterial] = useState<RoofingMaterialDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState(false);
  const [videoError, setVideoError] = useState(false);
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

  const handleVideoError = () => {
    setVideoError(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleTitleClick = () => {
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="page-material-detail-vertical">
        <SidebarNavigation />
        <div className="page-material-detail-vertical__main">
          <div className="page-material-detail-vertical__breadcrumbs">
            <Breadcrumbs />
          </div>
          <div className="page-material-detail-vertical__loader">
            <Spinner animation="border" role="status" variant="light">
              <span className="visually-hidden">Загрузка...</span>
            </Spinner>
          </div>
        </div>
      </div>
    );
  }

  if (!material) {
    return null;
  }

  return (
    <div className="page-material-detail-vertical">
      <SidebarNavigation />
      <div className="page-material-detail-vertical__main">
        <div className="page-material-detail-vertical__breadcrumbs">
          <Breadcrumbs />
        </div>
        <div className="page-material-detail-vertical__card">
          {/* Video section */}
          <div className="page-material-detail-vertical__video-section">
            {material.video_url && !videoError ? (
              <video
                src={material.video_url}
                className="page-material-detail-vertical__video"
                controls
                onError={handleVideoError}
              />
            ) : (
              <div className="page-material-detail-vertical__video-placeholder">
                <img src="/favicon.svg" alt="RoofMaster" width={120} height={120} />
                <p>Видео недоступно</p>
              </div>
            )}
          </div>

          {/* Bottom overlay with photo, name, and angles */}
          <div className="page-material-detail-vertical__overlay">
            <div className="page-material-detail-vertical__overlay-content">
              {material.photo && !imageError ? (
                <img
                  src={material.photo}
                  alt={material.title}
                  className="page-material-detail-vertical__overlay-image"
                  onError={handleImageError}
                />
              ) : (
                <div className="page-material-detail-vertical__overlay-image-placeholder">
                  <img src="/favicon.svg" alt="RoofMaster" width={60} height={60} />
                </div>
              )}
              <div className="page-material-detail-vertical__overlay-info">
                <h3
                  className="page-material-detail-vertical__overlay-title"
                  onClick={handleTitleClick}
                >
                  {material.title}
                </h3>
                <div className="page-material-detail-vertical__overlay-angles">
                  <span>min ∠: {material.min_tilt_angle}°</span>
                  <span>max ∠: {material.max_tilt_angle}°</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <MaterialDetailModal
          material={material}
          show={showModal}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default MaterialDetailPage;
