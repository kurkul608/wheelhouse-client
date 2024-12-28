import { createContext } from "react";

export type CarCardsStockFilter = "all" | "inStock" | "onOrder";

export interface ICarCardsFiltersContext {
  stockFilter: CarCardsStockFilter;
  update: null | ((filters: Partial<ICarCardsFiltersContext>) => void);
}
export const CarCardsFiltersContext = createContext<ICarCardsFiltersContext>({
  stockFilter: "all",
  update: null,
});
