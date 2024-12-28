"use client";

import { useContext } from "react";
import { WishlistContext } from "@/contexts/wishlistContext";
import { CarCardItemList } from "@/components/CarCardList/CarCardListItem/CarCardItem";

export const Wishlist = () => {
  const { wishlist } = useContext(WishlistContext);
  const carCardsList = wishlist?.carCards ?? [];
  return carCardsList ? <CarCardItemList initialList={carCardsList} /> : null;
};
