import { CarCard } from "@/models/carCard";

export interface Wishlist {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  carCardIds: string[];
  carCards: CarCard[];
}
