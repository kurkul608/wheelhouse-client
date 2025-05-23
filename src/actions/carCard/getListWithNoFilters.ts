"use server";

import { CARS_LIMIT } from "@/constants/carsLimit";
import { CarPage } from "@/actions/carCard/getList";

export const getCarCardsListWithNoFilters = async ({
  pageParam = 1,
}): Promise<CarPage | undefined> => {
  try {
    const offset = `${((pageParam as number) - 1) * CARS_LIMIT}`;
    const searchParams = new URLSearchParams({
      limit: `${CARS_LIMIT}`,
      offset: offset,
      stockFilter: "all",
    });

    const list = await fetch(
      `${process.env.API_URL}cars?${searchParams.toString()}`,
    );
    const data = await list.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
