import { useState, useEffect } from "react";
import type { DraftCalculationInfo } from "../types";
import { apiService } from "../services/api";

const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
  </svg>
);

const OrderButton: React.FC = () => {
  const [draft, setDraft] = useState<DraftCalculationInfo>({
    tilt_angle_calculation_id: -1,
    roofing_materials_count: 0,
  });

  useEffect(() => {
    loadDraft();
  }, []);

  const loadDraft = async () => {
    try {
      const data = await apiService.getDraftCalculation();
      setDraft(data);
    } catch {
      // Silently fail — button will remain disabled
    }
  };

  const hasDraft = draft.tilt_angle_calculation_id > 0;

  if (hasDraft) {
    return (
      <div className="order-button-fixed" title="Перейти к заявке">
        <CalendarIcon />
        {draft.roofing_materials_count > 0 && (
          <span className="order-button-badge">
            {draft.roofing_materials_count}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className="order-button-fixed disabled"
      title="Нет активной заявки"
    >
      <CalendarIcon />
    </div>
  );
};

export default OrderButton;
