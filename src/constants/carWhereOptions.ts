import { SelectOption } from "@/components/MultiSelectWithSearch";
import { CarsWhere } from "@/models/messageTemplate";

export const carWhereOptions: SelectOption<unknown>[] = [
  // { value: CarsWhere.SELECT_BY_USER, label: "Выбрать из списка авто" },
  {
    value: CarsWhere.SELECT_BY_USER_PERIOD,
    label: "Кастомный период",
  },
  { value: CarsWhere.SELECT_BY_DEFAULT_PERIOD, label: "Выбрать период" },
];
