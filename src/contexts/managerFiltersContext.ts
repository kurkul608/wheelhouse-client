import { createContext } from "react";
import { CarCardsStockFilter } from "@/contexts/carCardsFiltersContext";
import { ActiveFilter } from "@/app/manager/cars/page";

export const ManagerFiltersContext = createContext<{
  stockFilter: CarCardsStockFilter;
  activeFilter: ActiveFilter;
  searchString: string;
  updateManagerFilters?(data: {
    searchString?: string;
    stockFilter?: CarCardsStockFilter;
    activeFilter?: ActiveFilter;
  }): void;
}>({ stockFilter: "all", activeFilter: "all", searchString: "" });
