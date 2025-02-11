"use client";

import { useContext } from "react";
import { WishlistContext } from "@/contexts/wishlistContext";
import { CarCardListItem } from "@/components/CarCardList/CarCardListItem/CarCardItemList";
import { List, Subheadline } from "@telegram-apps/telegram-ui";

export const Wishlist = () => {
  const { wishlist } = useContext(WishlistContext);
  const carCardsList = wishlist?.carCards ?? [];
  return carCardsList.length ? (
    <List style={{ backgroundColor: "var(--tgui--secondary_bg_color)" }}>
      {carCardsList.map((carCard, index) => (
        <CarCardListItem {...carCard} key={`car-card-${index}`} />
      ))}
    </List>
  ) : (
    <div className={"flex justify-center items-center mt-4"}>
      <Subheadline>Ваш список желаемого пуст!</Subheadline>
    </div>
  );
};
