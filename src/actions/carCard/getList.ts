"use server";

import { CarCard } from "@/models/carCard";
import { CARS_LIMIT } from "@/constants/carsLimit";
import { CarCardsStockFilter } from "@/contexts/carCardsFiltersContext";

export interface GetCardListFilters {
  stockFilter: CarCardsStockFilter;
}

export const getCarCardsList = async (
  page: number,
  filters: GetCardListFilters,
): Promise<CarCard[]> => {
  const offset = `${page * CARS_LIMIT}`;
  const searchParams = new URLSearchParams({
    limit: `${CARS_LIMIT}`,
    offset: offset,
    stockFilter: filters.stockFilter,
  });
  const list = await fetch(
    `${process.env.API_URL}cars?${searchParams.toString()}`,
  );
  return list.json();
};
