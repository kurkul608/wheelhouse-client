import { CarCardSpecifications } from "@/models/carCardSpecification";

export type SpecificationCreateDto = Pick<
  CarCardSpecifications,
  "value" | "field" | "fieldName"
>;

export type SpecificationCreateTemplate = Pick<
  SpecificationCreateDto,
  "field" | "fieldName"
>;

export const SPECIFICATIONS_TEMPLATE: SpecificationCreateTemplate[] = [
  {
    fieldName: "Цвет экстерьера",
    field: "color_ext",
  },
  {
    fieldName: "Цвет интерьера",
    field: "color_int",
  },
  {
    fieldName: "Год выпуска",
    field: "year",
  },
  {
    fieldName: "VIN номер",
    field: "vin",
  },
];
