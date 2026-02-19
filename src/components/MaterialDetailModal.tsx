import type { RoofingMaterialDetail } from "../types";
import { useImageFallback } from "../hooks/useImageFallback";

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
  const { imageError, handleImageError } = useImageFallback();

  if (!show) return null;

  return (
    <div className="material-detail-modal" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="material-detail-modal__content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="material-detail-modal__close"
          onClick={onClose}
          aria-label="Закрыть"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
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
