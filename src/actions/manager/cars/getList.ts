"use server";

import { CarCardsStockFilter } from "@/contexts/carCardsFiltersContext";
import { CarCard } from "@/models/carCard";
import { ActiveFilter } from "@/app/manager/cars/page";

export const getManagerCarsList = async (
  search: string,
  stockFilter: CarCardsStockFilter,
  activeFilter: ActiveFilter,
  headers: HeadersInit,
): Promise<CarCard[] | undefined> => {
  try {
    const searchParams = new URLSearchParams({
      stockFilter: stockFilter,
      activeFilter: activeFilter,
      search,
    });

    const cars = await fetch(
      `${process.env.API_URL}manager/cars?${searchParams.toString()}`,
      {
        headers: {
          ...headers,
        },
      },
    );

    return cars.json();
  } catch (err) {
    console.error(err);
  }
};
