import React, { useState } from "react";
import type { RoofingMaterialDetail } from "../types";

interface MaterialDetailModalProps {
  material: RoofingMaterialDetail;
  show: boolean;
  onClose: () => void;
}

const MaterialDetailModal: React.FC<MaterialDetailModalProps> = ({
  material,
  show,
  onClose,
}) => {
  const [imageError, setImageError] = useState(false);

  if (!show) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="material-detail-modal" onClick={handleBackdropClick}>
      <div className="material-detail-modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="material-detail-modal__close" onClick={onClose}>
          ×
        </button>
        <div className="material-detail-modal__card">
          {material.photo && !imageError ? (
            <img
              src={material.photo}
              alt={material.title}
              className="material-detail-modal__image"
              onError={handleImageError}
            />
          ) : (
            <div className="material-detail-modal__placeholder">
              <img src="/favicon.svg" alt="RoofMaster" width={240} height={240} />
            </div>
          )}
          <div className="material-detail-modal__info">
            <h1 className="material-detail-modal__name">{material.title}</h1>
            <p className="material-detail-modal__description">
              {material.description}
            </p>
            <p className="material-detail-modal__angles">
              <strong>min ∠:</strong> {material.min_tilt_angle}°
            </p>
            <p className="material-detail-modal__angles">
              <strong>max ∠:</strong> {material.max_tilt_angle}°
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialDetailModal;
