"use server";

import { CarCard } from "@/models/carCard";
import axios, { AxiosHeaders } from "axios";

export const updatePhotos = async (
  carCardId: string,
  photosIds: string[],
  headers: HeadersInit,
): Promise<CarCard | undefined> => {
  try {
    const carCard = await axios.patch(
      `${process.env.API_URL}manager/cars/${carCardId}`,
      {
        photosIds,
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
