import type {
  RoofingMaterial,
  RoofingMaterialDetail,
  RoofingMaterialsListResponse,
  DraftCalculationInfo,
} from "../types";

const API_BASE_URL = "/api";

const MOCK_MATERIALS: RoofingMaterial[] = [
  {
    roofing_material_id: 10,
    title: "Битумный рулонный материал",
    min_tilt_angle: 0,
    max_tilt_angle: 25,
    photo: "",
  },
  {
    roofing_material_id: 11,
    title: "Медная кровля",
    min_tilt_angle: 15,
    max_tilt_angle: 90,
    photo: "",
  },
  {
    roofing_material_id: 12,
    title: "Цинк-титановая кровля",
    min_tilt_angle: 10,
    max_tilt_angle: 90,
    photo: "",
  },
  {
    roofing_material_id: 1,
    title: "Металлочерепица",
    min_tilt_angle: 24,
    max_tilt_angle: 90,
    photo: "https://академия-кровли.рф/wp-content/uploads/2019/11/Stalnoj-barhat.jpg",
  },
  {
    roofing_material_id: 2,
    title: "Керамическая черепица",
    min_tilt_angle: 22,
    max_tilt_angle: 60,
    photo: "https://magnitogorsk.tstn.ru/upload/medialibrary/29f/cementno_peschanay.jpg",
  },
  {
    roofing_material_id: 3,
    title: "Гибкая черепица",
    min_tilt_angle: 12,
    max_tilt_angle: 90,
    photo: "https://evroshtaketnikmoskva.ru/image/catalog/products/Gibkaya_cherepica/gibrayacherepisa/odnoslgibcher.jpeg",
  },
  {
    roofing_material_id: 4,
    title: "Профнастил",
    min_tilt_angle: 10,
    max_tilt_angle: 60,
    photo: "https://alarmmetall.ru/wp-content/uploads/2022/12/scvetnoy-proflist.jpg",
  },
  {
    roofing_material_id: 5,
    title: "Фальцевая кровля",
    min_tilt_angle: 3,
    max_tilt_angle: 90,
    photo: "https://spb.rooffasad.ru/upload/wysiwyg/680f809f6289f.jpg",
  },
  {
    roofing_material_id: 6,
    title: "Ондулин",
    min_tilt_angle: 5,
    max_tilt_angle: 45,
    photo: "https://cache3.youla.io/files/images/780_780/5b/d0/5bd0329ef20263b1a166a116.jpg",
  },
  {
    roofing_material_id: 7,
    title: "Композитная черепица",
    min_tilt_angle: 15,
    max_tilt_angle: 90,
    photo: "https://www.strd.ru/img/offer/4/44/446958/11334_66783_003.png",
  },
  {
    roofing_material_id: 8,
    title: "Шифер",
    min_tilt_angle: 12,
    max_tilt_angle: 60,
    photo: "https://ireland.apollo.olxcdn.com/v1/files/umw5p2tju5jd3-UA/image;s=640x460",
  },
  {
    roofing_material_id: 9,
    title: "Сланцевая кровля",
    min_tilt_angle: 25,
    max_tilt_angle: 90,
    photo: "https://www.krovgid.ru/upload/iblock/1f3/1f30e65d402d158174e249516bcda7e6.jpg",
  },
];

const MOCK_MATERIAL_DETAILS: Record<number, RoofingMaterialDetail> = {
  10: {
    roofing_material_id: 10,
    title: "Битумный рулонный материал",
    description:
      "Рулонный кровельный материал на основе битума. Применяется для плоских и малоуклонных крыш. Обеспечивает отличную гидроизоляцию при минимальных затратах.",
    min_tilt_angle: 0,
    max_tilt_angle: 25,
    photo: "",
    video_url: "",
  },
  11: {
    roofing_material_id: 11,
    title: "Медная кровля",
    description:
      "Престижное кровельное покрытие из листовой меди. С годами приобретает благородную патину. Срок службы превышает 150 лет без какого-либо обслуживания.",
    min_tilt_angle: 15,
    max_tilt_angle: 90,
    photo: "",
    video_url: "",
  },
  12: {
    roofing_material_id: 12,
    title: "Цинк-титановая кровля",
    description:
      "Современный кровельный материал из сплава цинка и титана. Отличается самовосстанавливающейся поверхностью, устойчивостью к коррозии и элегантным внешним видом.",
    min_tilt_angle: 10,
    max_tilt_angle: 90,
    photo: "",
    video_url: "",
  },
  1: {
    roofing_material_id: 1,
    title: "Металлочерепица",
    description:
      "Прочный и долговечный кровельный материал из оцинкованной стали с полимерным покрытием. Имитирует натуральную черепицу.",
    min_tilt_angle: 24,
    max_tilt_angle: 90,
    photo: "https://академия-кровли.рф/wp-content/uploads/2019/11/Stalnoj-barhat.jpg",
    video_url: "",
  },
  2: {
    roofing_material_id: 2,
    title: "Керамическая черепица",
    description:
      "Натуральная черепица из обожженной глины. Отличается высокой долговечностью, экологичностью и привлекательным внешним видом.",
    min_tilt_angle: 22,
    max_tilt_angle: 60,
    photo: "https://magnitogorsk.tstn.ru/upload/medialibrary/29f/cementno_peschanay.jpg",
    video_url: "",
  },
  3: {
    roofing_material_id: 3,
    title: "Гибкая черепица",
    description:
      "Современный кровельный материал на основе стеклохолста с битумной пропиткой. Подходит для крыш сложной формы.",
    min_tilt_angle: 12,
    max_tilt_angle: 90,
    photo: "https://evroshtaketnikmoskva.ru/image/catalog/products/Gibkaya_cherepica/gibrayacherepisa/odnoslgibcher.jpeg",
    video_url: "",
  },
  4: {
    roofing_material_id: 4,
    title: "Профнастил",
    description:
      "Листовой материал из оцинкованной стали с трапециевидным профилем. Экономичный и прочный вариант для кровли.",
    min_tilt_angle: 10,
    max_tilt_angle: 60,
    photo: "https://alarmmetall.ru/wp-content/uploads/2022/12/scvetnoy-proflist.jpg",
    video_url: "",
  },
  5: {
    roofing_material_id: 5,
    title: "Фальцевая кровля",
    description:
      "Металлическая кровля со специальным способом соединения листов. Обеспечивает надежную герметичность даже при малых углах наклона.",
    min_tilt_angle: 3,
    max_tilt_angle: 90,
    photo: "https://spb.rooffasad.ru/upload/wysiwyg/680f809f6289f.jpg",
    video_url: "",
  },
  6: {
    roofing_material_id: 6,
    title: "Ондулин",
    description:
      "Волнистые листы из целлюлозы, пропитанные битумом. Легкий и доступный материал с хорошими звукоизоляционными свойствами.",
    min_tilt_angle: 5,
    max_tilt_angle: 45,
    photo: "https://cache3.youla.io/files/images/780_780/5b/d0/5bd0329ef20263b1a166a116.jpg",
    video_url: "",
  },
  7: {
    roofing_material_id: 7,
    title: "Композитная черепица",
    description:
      "Многослойный материал на основе металла с каменной крошкой. Сочетает преимущества металлической и натуральной черепицы.",
    min_tilt_angle: 15,
    max_tilt_angle: 90,
    photo: "https://www.strd.ru/img/offer/4/44/446958/11334_66783_003.png",
    video_url: "",
  },
  8: {
    roofing_material_id: 8,
    title: "Шифер",
    description:
      "Традиционный волнистый материал из цементно-волокнистых листов. Долговечный и огнестойкий вариант кровельного покрытия.",
    min_tilt_angle: 12,
    max_tilt_angle: 60,
    photo: "https://ireland.apollo.olxcdn.com/v1/files/umw5p2tju5jd3-UA/image;s=640x460",
    video_url: "",
  },
  9: {
    roofing_material_id: 9,
    title: "Сланцевая кровля",
    description:
      "Элитный натуральный материал из природного сланца. Обладает уникальным внешним видом и исключительной долговечностью.",
    min_tilt_angle: 25,
    max_tilt_angle: 90,
    photo: "https://www.krovgid.ru/upload/iblock/1f3/1f30e65d402d158174e249516bcda7e6.jpg",
    video_url: "",
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
        return {
          tilt_angle_calculation_id: -1,
          roofing_materials_count: 0,
        };
      }

      return await response.json();
    } catch {
      return MOCK_DRAFT_CALCULATION;
    }
  },
};
