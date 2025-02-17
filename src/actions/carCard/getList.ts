"use server";

import { CarCard } from "@/models/carCard";
import { CARS_LIMIT } from "@/constants/carsLimit";
import { ICarCardsFiltersContext } from "@/contexts/carCardsFiltersContext";
import axios from "axios";

export interface CarPage {
  items: CarCard[];
  page: number;
  hasMore: boolean;
}

export const getCarCardsList = async (
  page: number,
  filters: Partial<ICarCardsFiltersContext>,
): Promise<CarPage | undefined> => {
  try {
    const offset = `${(page - 1) * CARS_LIMIT}`;
    const searchParams = new URLSearchParams({
      limit: `${CARS_LIMIT}`,
      offset: offset,
      ...(filters.stockFilter !== undefined
        ? { stockFilter: filters.stockFilter }
        : {}),
      ...(filters.search !== undefined ? { search: filters.search } : {}),
      ...(filters.minDateFilter !== undefined
        ? { minDateFilter: String(filters.minDateFilter) }
        : {}),
      ...(filters.maxDateFilter !== undefined
        ? { maxDateFilter: String(filters.maxDateFilter) }
        : {}),
      ...(filters.sortBy !== undefined
        ? { sortBy: String(filters.sortBy) }
        : {}),
      ...(filters.sortOrder !== undefined
        ? { sortOrder: String(filters.sortOrder) }
        : {}),
    });
    filters.carModelFilter?.forEach((filter) => {
      searchParams.append("carModelFilter", filter);
    });
    filters.carBrandFilter?.forEach((filter) => {
      searchParams.append("carBrandFilter", filter);
    });
    const list = await axios.get(`${process.env.API_URL}cars`, {
      params: searchParams,
    });
    return list.data;
  } catch (error) {
    console.error(error);
  }
};
