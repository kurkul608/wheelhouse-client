"use server";

import { CarCard } from "@/models/carCard";

export const updateIsActive = async (
  carCardId: string,
  isActive: boolean,
  headers: HeadersInit,
): Promise<CarCard | undefined> => {
  try {
    const carCard = await fetch(
      `${process.env.API_URL}manager/cars/${carCardId}`,
      {
        method: "PATCH",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isActive,
        }),
      },
    );

    return carCard.json();
  } catch (error) {
    console.error(error);
  }
};
