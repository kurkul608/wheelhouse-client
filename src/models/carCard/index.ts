import { CarCardSpecifications } from "@/models/carCardSpecification";

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
