"use server";

import { CarCardsStockFilter } from "@/contexts/carCardsFiltersContext";
import { CarCard } from "@/models/carCard";
import { ActiveFilter } from "@/app/manager/cars/page";
import axios, { AxiosHeaders } from "axios";

export const getManagerCarsList = async (
  search: string,
  stockFilter: CarCardsStockFilter,
  activeFilter: ActiveFilter,
  headers: AxiosHeaders,
): Promise<CarCard[]> => {
  try {
    const searchParams = new URLSearchParams({
      stockFilter: stockFilter,
      activeFilter: activeFilter,
      search,
    });

    const cars = await axios.get<CarCard[]>(
      `${process.env.API_URL}manager/cars`,
      {
        params: searchParams,
        headers,
      },
    );

    return cars.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
