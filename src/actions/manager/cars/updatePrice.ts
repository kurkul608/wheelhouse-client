"use server";

import { CarCard } from "@/models/carCard";
import axios, { AxiosHeaders } from "axios";

export const updatePrice = async (
  carCardId: string,
  price: string,
  headers: HeadersInit,
): Promise<CarCard | undefined> => {
  try {
    const carCard = await axios.patch(
      `${process.env.API_URL}manager/cars/${carCardId}`,
      {
        price,
      },
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
