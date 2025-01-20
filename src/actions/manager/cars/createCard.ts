"use server";

import { CarCard } from "@/models/carCard";

export interface CreateCardDto {
  inStock: boolean;
  description: string;
  price?: string;
  currency?: string;
  isActive: boolean;
}

export const createCard = async (
  data: CreateCardDto,
  headers: HeadersInit,
): Promise<CarCard> => {
  const carCard = await fetch(`${process.env.API_URL}manager/cars`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return carCard.json();
};
