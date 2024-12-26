"use client";

import { useContext } from "react";
import { WishlistContext } from "@/contexts/wishlistContext";
import { CarCardItemList } from "@/components/CarCardList/CarCardListItem/CarCardItem";

export const Wishlist = () => {
  const { wishlist } = useContext(WishlistContext);
  const carCardsList = wishlist?.WishlistCarCard.map(
    (carCard) => carCard.carCard,
  );
  return carCardsList ? <CarCardItemList list={carCardsList} /> : null;
};
