"use server";

import { CarCard } from "@/models/carCard";
import axios, { AxiosHeaders } from "axios";

export const updateInStock = async (
  carCardId: string,
  inStock: boolean,
  headers: HeadersInit,
): Promise<CarCard | undefined> => {
  try {
    const carCard = await axios.patch(
      `${process.env.API_URL}manager/cars/${carCardId}`,
      { inStock },
      {
        headers: {
          ...(headers as AxiosHeaders),
          "Content-Type": "application/json",
        },
      },
    );

    return carCard.data;
  } catch (error) {
    console.error(error);
  }
};
