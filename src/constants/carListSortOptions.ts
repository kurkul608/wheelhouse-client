import { SelectOption } from "@/components/MultiSelectWithSearch";

export const CAR_LIST_SORT_OPTIONS: SelectOption<{
  sortOrder: SORT_ORDER;
}>[] = [
  {
    value: "date",
    sortOrder: "desc" as SORT_ORDER,
    label: "По дате размещения - новее",
  },
  {
    value: "date",
    sortOrder: "asc" as SORT_ORDER,
    label: "По дате размещения - старее",
  },
];

export type SORT_ORDER = "asc" | "desc";

export type CarListSortOptionsType = "date";
