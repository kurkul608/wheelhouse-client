import { createContext } from "react";
import { CarBrandsFilterType } from "@/constants/carBrandsFilterOptions";
import { CarModelsFilterType } from "@/constants/carModelsFilterOptions";

export type CarCardsStockFilter = "all" | "inStock" | "onOrder";

export interface ICarCardsFiltersContext {
  sortBy: string;
  sortOrder: string;
  maxDateFilter: number;
  minDateFilter: number;
  carModelFilter: CarModelsFilterType[];
  carBrandFilter: CarBrandsFilterType[];
  stockFilter: CarCardsStockFilter;
  search: string;
  update: null | ((filters: Partial<ICarCardsFiltersContext>) => void);
}
export const CarCardsFiltersContext = createContext<ICarCardsFiltersContext>({
  sortBy: "",
  sortOrder: "",
  maxDateFilter: new Date().getFullYear(),
  minDateFilter: 2004,
  carModelFilter: [],
  carBrandFilter: [],
  stockFilter: "all",
  search: "",
  update: null,
});
