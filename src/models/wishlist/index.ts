import { CarCard } from "@/models/carCard";

export interface WishlistCarCard {
  id: string;
  wishlistId: string;
  carCardId: string;
  addedAt: string;
  updatedAt: string;
  carCard: CarCard;
}

export interface Wishlist {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  WishlistCarCard: WishlistCarCard[];
}
