import {
  CarCardsStockFilter,
  ICarCardsFiltersContext,
} from "@/contexts/carCardsFiltersContext";
import { useState } from "react";
import { CarBrandsFilterType } from "@/constants/carBrandsFilterOptions";
import { CarModelsFilterType } from "@/constants/carModelsFilterOptions";

export const useCarCardsFilters = (): ICarCardsFiltersContext => {
  const [stockFilter, setStockFilter] = useState<CarCardsStockFilter>("all");
  const [minDateFilter, setMinDateFilter] = useState<number>(2004);
  const [maxDateFilter, setMaxDateFilter] = useState<number>(
    new Date().getFullYear(),
  );
  const [carBrandFilter, setCarBrandFilter] = useState<CarBrandsFilterType[]>(
    [],
  );
  const [carModelFilter, setCarModelFilter] = useState<CarModelsFilterType[]>(
    [],
  );
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const update = (data: Partial<ICarCardsFiltersContext>) => {
    if (data.stockFilter) {
      setStockFilter(data.stockFilter);
    }
    if (data.search !== undefined) {
      setSearch(data.search);
    }
    if (data.carBrandFilter) {
      setCarBrandFilter(data.carBrandFilter);
    }
    if (data.carModelFilter) {
      setCarModelFilter(data.carModelFilter);
    }
    if (
      typeof data.minDateFilter === "number" &&
      data.minDateFilter <= new Date().getFullYear()
    ) {
      setMinDateFilter(data.minDateFilter);
    }

    if (
      typeof data.maxDateFilter === "number" &&
      data.maxDateFilter <= new Date().getFullYear() &&
      (data.maxDateFilter > minDateFilter ||
        (data.minDateFilter && data.maxDateFilter > data.minDateFilter))
    ) {
      setMaxDateFilter(data.maxDateFilter);
    }
    if (data.sortBy !== undefined) {
      setSortBy(data.sortBy);
    }
    if (data.sortOrder !== undefined) {
      setSortOrder(data.sortOrder);
    }
  };

  return {
    stockFilter,
    update,
    search,
    carBrandFilter,
    carModelFilter,
    maxDateFilter,
    minDateFilter,
    sortBy,
    sortOrder,
  };
};
