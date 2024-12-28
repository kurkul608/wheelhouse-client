import { Wishlist } from "@/models/wishlist";

export const getIsCarInWishlist = (carId: string, wishlist: Wishlist | null) =>
  wishlist?.carCards?.some(({ id }) => id === carId);
