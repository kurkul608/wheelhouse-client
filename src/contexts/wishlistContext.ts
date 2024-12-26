import { createContext } from "react";
import { Wishlist } from "@/models/wishlist";

export const WishlistContext = createContext<{
  wishlist: Wishlist | null;
  update: null | (() => Promise<void>);
}>({ wishlist: null, update: null });
