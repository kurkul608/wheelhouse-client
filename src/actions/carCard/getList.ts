"use server";
export interface CarCardSpecifications {
  field: string;
  fieldName: string;
  value: string;
}

export type FiatAsset =
  | "EUR"
  | "RUB"
  | "BYN"
  | "UAH"
  | "GBP"
  | "CNY"
  | "KZT"
  | "UZS"
  | "GEL"
  | "TRY"
  | "AMD"
  | "THB"
  | "INR"
  | "BRL"
  | "IDR"
  | "AZN"
  | "AED"
  | "PLN"
  | "ILS";

export interface CarCard {
  id: string;
  externalId: string | null;
  inStock: boolean;
  importedPhotos: string[];
  photos: string[];
  description: string;
  price: string | null;
  currency: FiatAsset | null;
  isActive: boolean;
  orderId: string | null;
  specifications: CarCardSpecifications[];
}

const CARS_LIMIT = 20;

export const getCarCardsList = async (page: number): Promise<CarCard[]> => {
  const offset = `${page * CARS_LIMIT}`;
  const searchParams = new URLSearchParams({
    limit: `${CARS_LIMIT}`,
    offset: offset,
  });
  const list = await fetch(
    `http://localhost:8080/cars?${searchParams.toString()}`,
  );
  return list.json();
};
