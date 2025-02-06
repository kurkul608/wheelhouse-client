"use server";

import { CarCard } from "@/models/carCard";
import axios, { AxiosHeaders } from "axios";

export const updateDescription = async (
  carCardId: string,
  description: string,
  headers: HeadersInit,
): Promise<CarCard | undefined> => {
  try {
    const carCard = await axios.patch(
      `${process.env.API_URL}manager/cars/${carCardId}`,
      {
        description,
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
