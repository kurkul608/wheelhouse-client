"use server";

import { CarCard } from "@/models/carCard";
import { CARS_LIMIT } from "@/constants/carsLimit";
import { CarCardsStockFilter } from "@/contexts/carCardsFiltersContext";

export interface GetCardListFilters {
  stockFilter: CarCardsStockFilter;
  search: string;
}

export const getCarCardsList = async (
  page: number,
  filters: GetCardListFilters,
): Promise<CarCard[] | undefined> => {
  try {
    const offset = `${page * CARS_LIMIT}`;
    const searchParams = new URLSearchParams({
      limit: `${CARS_LIMIT}`,
      offset: offset,
      stockFilter: filters.stockFilter,
      search: filters.search,
    });
    const list = await fetch(
      `${process.env.API_URL}cars?${searchParams.toString()}`,
    );
    return list.json();
  } catch (error) {
    console.error(error);
  }
};
