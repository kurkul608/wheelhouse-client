"use server";

import { CarCard } from "@/models/carCard";

export const getCarCard = async (id: string): Promise<CarCard | undefined> => {
  try {
    const carCard = await fetch(`${process.env.API_URL}cars/${id}`);
    return carCard.json();
  } catch (error) {
    console.error(error);
  }
};
