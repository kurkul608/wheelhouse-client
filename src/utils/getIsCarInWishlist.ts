import { Wishlist } from "@/models/wishlist";

export const getIsCarInWishlist = (carId: string, wishlist: Wishlist | null) =>
  wishlist?.WishlistCarCard?.some((wishlist) => wishlist.carCardId === carId);
