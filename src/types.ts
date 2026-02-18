export interface RoofingMaterial {
  roofing_material_id: number;
  title: string;
  min_tilt_angle: number;
  max_tilt_angle: number;
  photo: string;
  is_delete: boolean;
}

export interface RoofingMaterialDetail {
  roofing_material_id: number;
  title: string;
  description: string;
  min_tilt_angle: number;
  max_tilt_angle: number;
  photo: string;
  video_url: string;
  is_delete: boolean;
}

export interface RoofingMaterialsListResponse {
  roofing_materials: RoofingMaterial[];
}

export interface DraftCalculationInfo {
  tilt_angle_calculation_id: number;
  roofing_materials_count: number;
}
