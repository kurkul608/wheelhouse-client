import {
  CarCardsStockFilter,
  ICarCardsFiltersContext,
} from "@/contexts/carCardsFiltersContext";
import { useState } from "react";

export const useCarCardsFilters = (): ICarCardsFiltersContext => {
  const [stockFilter, setStockFilter] = useState<CarCardsStockFilter>("all");

  const update = (data: Partial<ICarCardsFiltersContext>) => {
    if (data.stockFilter) {
      setStockFilter(data.stockFilter);
    }
  };

  return { stockFilter, update };
};
