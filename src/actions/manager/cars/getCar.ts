"use server";

import { CarCard } from "@/models/carCard";
import axios from "axios";

export const getCarManager = async (
  carCardId: string,
): Promise<CarCard | null | undefined> => {
  try {
    const carCard = await axios.get<CarCard | null>(
      `${process.env.API_URL}manager/public/cars/${carCardId}`,
    );

    return carCard.data;
  } catch (error) {
    console.error(error);
  }
};
