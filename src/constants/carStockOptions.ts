import { SelectOption } from "@/components/MultiSelectWithSearch";
import { CarsWhereStock } from "@/models/messageTemplate";

export const carStockOptions: SelectOption<unknown>[] = [
  {
    value: CarsWhereStock.IN_STOCK,
    label: "В наличии",
  },
  { value: CarsWhereStock.IN_ORDER, label: "Под заказ" },
];
