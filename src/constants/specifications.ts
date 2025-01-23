import { CarCardSpecifications } from "@/models/carCardSpecification";

export type SpecificationCreateDto = Pick<
  CarCardSpecifications,
  "value" | "field" | "fieldName"
> & { carCardId: string };

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
  {
    fieldName: "Поколение",
    field: "generation",
  },
  {
    fieldName: "Кузов",
    field: "body",
  },
  {
    fieldName: "Двигатель",
    field: "engine",
  },
  {
    fieldName: "Налог",
    field: "tax",
  },
  {
    fieldName: "Коробка",
    field: "transmission",
  },
  {
    fieldName: "Привод",
    field: "drive",
  },
];
