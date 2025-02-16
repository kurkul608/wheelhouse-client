"use server";

import { CarCard } from "@/models/carCard";
import { CARS_LIMIT } from "@/constants/carsLimit";
import { QueryFunctionContext } from "@tanstack/query-core";

export interface CarPage {
  items: CarPage[];
  page: number;
  hasMore: boolean;
}

export const getCarCardsListWithNoFilters = async ({
  pageParam = 1,
}: QueryFunctionContext<[string]>): Promise<CarPage | undefined> => {
  try {
    const offset = `${(pageParam as number) * CARS_LIMIT}`;
    const searchParams = new URLSearchParams({
      limit: `${CARS_LIMIT}`,
      offset: offset,
    });

    const list = await fetch(
      `${process.env.API_URL}cars?${searchParams.toString()}`,
    );
    return list.json();
  } catch (error) {
    console.error(error);
  }
};
