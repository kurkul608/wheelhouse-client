import { CarCardsStockFilter } from "@/contexts/carCardsFiltersContext";

export const STOCK_FILTER_OPTIONS = [
  { value: "all" as CarCardsStockFilter, label: "Все" },
  { value: "inStock" as CarCardsStockFilter, label: "В наличии" },
  { value: "onOrder" as CarCardsStockFilter, label: "Под заказ" },
];
