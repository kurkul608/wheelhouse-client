"use client";

import { TabsList } from "@telegram-apps/telegram-ui";
import { TabsItem } from "@telegram-apps/telegram-ui/dist/components/Navigation/TabsList/components/TabsItem/TabsItem";
import { useContext } from "react";
import { CarCardsFiltersContext } from "@/contexts/carCardsFiltersContext";

export const CarCardListFilters = () => {
  const { stockFilter, update } = useContext(CarCardsFiltersContext);

  return (
    <div>
      <TabsList>
        <TabsItem
          onClick={() => {
            if (update) {
              update({ stockFilter: "all" });
            }
          }}
          selected={stockFilter === "all"}
        >
          Все
        </TabsItem>
        <TabsItem
          onClick={() => {
            if (update) {
              update({ stockFilter: "inStock" });
            }
          }}
          selected={stockFilter === "inStock"}
        >
          В наличии
        </TabsItem>
        <TabsItem
          onClick={() => {
            if (update) {
              update({ stockFilter: "onOrder" });
            }
          }}
          selected={stockFilter === "onOrder"}
        >
          Под заказ
        </TabsItem>
      </TabsList>
    </div>
  );
};
