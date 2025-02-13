import { CarCardsStockFilter } from "@/contexts/carCardsFiltersContext";
import { SelectOption } from "@/components/MultiSelectWithSearch";

export const STOCK_FILTER_OPTIONS: SelectOption<unknown>[] = [
  { value: "all" as CarCardsStockFilter, label: "Все" },
  { value: "inStock" as CarCardsStockFilter, label: "В наличии" },
  { value: "onOrder" as CarCardsStockFilter, label: "Под заказ" },
];
