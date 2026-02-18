import React, { useState } from "react";
import { Link } from "react-router-dom";
import type { RoofingMaterial } from "../types";

interface MaterialCardProps extends RoofingMaterial {}

const MaterialCard: React.FC<MaterialCardProps> = ({
  roofing_material_id,
  title,
  min_tilt_angle,
  max_tilt_angle,
  photo,
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="material-card">
      <Link to={`/materials/${roofing_material_id}`}>
        {photo && !imageError ? (
          <img
            src={photo}
            alt={title}
            className="material-card__image"
            onError={handleImageError}
          />
        ) : (
          <div className="material-card__placeholder">🏠</div>
        )}
        <div className="material-card__content">
          <h3 className="material-card__name">{title}</h3>
          <p className="material-card__angles">min ∠: {min_tilt_angle}°</p>
          <p className="material-card__angles">max ∠: {max_tilt_angle}°</p>
        </div>
      </Link>
      <div className="material-card__button-wrapper">
        <button className="material-card__button" disabled>
          Добавить
        </button>
      </div>
    </div>
  );
};

export default MaterialCard;
