import { SelectOption } from "@/components/MultiSelectWithSearch";
import { CarsWherePeriod } from "@/models/messageTemplate";

export const carWhereDefaultPeriodOptions: SelectOption<unknown>[] = [
  {
    value: CarsWherePeriod.LAST_DAY,
    label: "За прошедний день",
  },
  { value: CarsWherePeriod.LAST_MONTH, label: "За прошедший месяц" },
  { value: CarsWherePeriod.LAST_WEEK, label: "За прошедшую неделю" },
];
