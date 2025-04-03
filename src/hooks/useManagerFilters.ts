"use client";

import { useState } from "react";
import { CarCardsStockFilter } from "@/contexts/carCardsFiltersContext";
import { ActiveFilter } from "@/app/manager/cars/page";

export const useManagerFilters = () => {
  const [searchString, setSearchString] = useState("");
  const [stockFilter, setStockFilter] = useState<CarCardsStockFilter>("all");
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");

  const updateManagerFilters = (data: {
    searchString?: string;
    stockFilter?: CarCardsStockFilter;
    activeFilter?: ActiveFilter;
  }) => {
    if (data.searchString) {
      setSearchString(data.searchString);
    }
    if (data.stockFilter) {
      setStockFilter(data.stockFilter);
    }
    if (data.activeFilter) {
      setActiveFilter(data.activeFilter);
    }
  };

  return {
    managerFilters: { searchString, stockFilter, activeFilter },
    updateManagerFilters,
  };
};
