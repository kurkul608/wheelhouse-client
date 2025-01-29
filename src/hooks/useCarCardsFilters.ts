import {
  CarCardsStockFilter,
  ICarCardsFiltersContext,
} from "@/contexts/carCardsFiltersContext";
import { useState } from "react";

export const useCarCardsFilters = (): ICarCardsFiltersContext => {
  const [stockFilter, setStockFilter] = useState<CarCardsStockFilter>("all");
  const [search, setSearch] = useState("");

  const update = (data: Partial<ICarCardsFiltersContext>) => {
    if (data.stockFilter) {
      setStockFilter(data.stockFilter);
    }
    if (data.search !== undefined) {
      setSearch(data.search);
    }
  };

  return { stockFilter, update, search };
};
