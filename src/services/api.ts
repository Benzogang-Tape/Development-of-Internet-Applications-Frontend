import type {
  RoofingMaterial,
  RoofingMaterialDetail,
  RoofingMaterialsListResponse,
  DraftCalculationInfo,
} from "../types";

const API_BASE_URL = "/api";

const MOCK_MATERIALS: RoofingMaterial[] = [
  {
    roofing_material_id: 1,
    title: "Металлочерепица",
    min_tilt_angle: 14,
    max_tilt_angle: 45,
    photo: "",
    is_delete: false,
  },
  {
    roofing_material_id: 2,
    title: "Профнастил",
    min_tilt_angle: 12,
    max_tilt_angle: 60,
    photo: "",
    is_delete: false,
  },
  {
    roofing_material_id: 3,
    title: "Гибкая черепица",
    min_tilt_angle: 11,
    max_tilt_angle: 90,
    photo: "",
    is_delete: false,
  },
  {
    roofing_material_id: 4,
    title: "Керамическая черепица",
    min_tilt_angle: 22,
    max_tilt_angle: 60,
    photo: "",
    is_delete: false,
  },
  {
    roofing_material_id: 5,
    title: "Ондулин",
    min_tilt_angle: 6,
    max_tilt_angle: 90,
    photo: "",
    is_delete: false,
  },
  {
    roofing_material_id: 6,
    title: "Фальцевая кровля",
    min_tilt_angle: 7,
    max_tilt_angle: 90,
    photo: "",
    is_delete: false,
  },
];

const MOCK_MATERIAL_DETAILS: Record<number, RoofingMaterialDetail> = {
  1: {
    roofing_material_id: 1,
    title: "Металлочерепица",
    description:
      "Металлочерепица — кровельный материал из оцинкованной стали с полимерным покрытием. Обладает высокой прочностью, устойчивостью к коррозии и длительным сроком службы. Широко применяется в частном и коммерческом строительстве.",
    min_tilt_angle: 14,
    max_tilt_angle: 45,
    photo: "",
    video_url: "",
    is_delete: false,
  },
  2: {
    roofing_material_id: 2,
    title: "Профнастил",
    description:
      "Профнастил — профилированный лист из оцинкованной стали. Легкий, прочный и экономичный материал для кровли. Отличается простотой монтажа и широким выбором цветов.",
    min_tilt_angle: 12,
    max_tilt_angle: 60,
    photo: "",
    video_url: "",
    is_delete: false,
  },
  3: {
    roofing_material_id: 3,
    title: "Гибкая черепица",
    description:
      "Гибкая черепица — мягкий кровельный материал на основе стеклохолста, пропитанного битумом. Подходит для крыш сложной формы. Обеспечивает отличную шумоизоляцию и герметичность.",
    min_tilt_angle: 11,
    max_tilt_angle: 90,
    photo: "",
    video_url: "",
    is_delete: false,
  },
  4: {
    roofing_material_id: 4,
    title: "Керамическая черепица",
    description:
      "Керамическая черепица — классический кровельный материал из обожжённой глины. Отличается долговечностью (срок службы более 100 лет), экологичностью и эстетичным внешним видом.",
    min_tilt_angle: 22,
    max_tilt_angle: 60,
    photo: "",
    video_url: "",
    is_delete: false,
  },
  5: {
    roofing_material_id: 5,
    title: "Ондулин",
    description:
      "Ондулин — волнистый кровельный материал на основе целлюлозы, пропитанной битумом. Лёгкий, гибкий и простой в монтаже. Подходит для крыш с малым углом наклона.",
    min_tilt_angle: 6,
    max_tilt_angle: 90,
    photo: "",
    video_url: "",
    is_delete: false,
  },
  6: {
    roofing_material_id: 6,
    title: "Фальцевая кровля",
    description:
      "Фальцевая кровля — металлическое покрытие, элементы которого соединяются фальцевым замком. Обеспечивает абсолютную герметичность и подходит для крыш с минимальным уклоном.",
    min_tilt_angle: 7,
    max_tilt_angle: 90,
    photo: "",
    video_url: "",
    is_delete: false,
  },
};

const MOCK_DRAFT_CALCULATION: DraftCalculationInfo = {
  tilt_angle_calculation_id: 1,
  roofing_materials_count: 3,
};

export const apiService = {
  async getMaterials(query: string): Promise<RoofingMaterial[]> {
    try {
      const params = new URLSearchParams();
      if (query) params.append("roofing_material", query);

      const response = await fetch(`${API_BASE_URL}/roofing_materials?${params}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: RoofingMaterialsListResponse = await response.json();
      return data.roofing_materials;
    } catch {
      let mockMaterials = [...MOCK_MATERIALS];
      if (query) {
        mockMaterials = mockMaterials.filter((m) =>
          m.title.toLowerCase().includes(query.toLowerCase())
        );
      }
      return mockMaterials;
    }
  },

  async getMaterialById(id: number): Promise<RoofingMaterialDetail | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/roofing_materials/${id}`);

      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch {
      return MOCK_MATERIAL_DETAILS[id] || null;
    }
  },

  async getDraftCalculation(): Promise<DraftCalculationInfo> {
    try {
      const response = await fetch(
        `${API_BASE_URL}/roof_angle_calculation/current_tilt_calculation`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch {
      return MOCK_DRAFT_CALCULATION;
    }
  },
};
