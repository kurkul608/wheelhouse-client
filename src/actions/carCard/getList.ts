"use server";

import { CarCard } from "@/models/carCard";

const CARS_LIMIT = 20;

export const getCarCardsList = async (page: number): Promise<CarCard[]> => {
  const offset = `${page * CARS_LIMIT}`;
  const searchParams = new URLSearchParams({
    limit: `${CARS_LIMIT}`,
    offset: offset,
  });
  const list = await fetch(
    `${process.env.API_URL}cars?${searchParams.toString()}`,
  );
  return list.json();
};
