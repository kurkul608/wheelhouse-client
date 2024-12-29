"use client";

import { getManagerCarsList } from "@/actions/manager/cars/getList";
import { useEffect, useState } from "react";
import { CarCard } from "@/models/carCard";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { getAuthorization } from "@/utils/getAuthorization";
import { Cell, Select, Switch, Text } from "@telegram-apps/telegram-ui";
import { CarCardsStockFilter } from "@/contexts/carCardsFiltersContext";
import { updateIsActive } from "@/actions/manager/cars/updateIsActive";

export type ActiveFilter = "all" | "active" | "disabled";

export default function ManagerCarsPage() {
  const [list, setList] = useState<CarCard[]>([]);
  const [stockFilter, setStockFilter] = useState<CarCardsStockFilter>("all");
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");
  const lp = useLaunchParams();
  const getCars = async () => {
    const cars = await getManagerCarsList(
      stockFilter,
      activeFilter,
      getAuthorization(lp),
    );

    if (cars) {
      setList(cars);
    }
  };

  useEffect(() => {
    getCars();
  }, [stockFilter, activeFilter]);

  const updateActive = async (carCardId: string, isActive: boolean) => {
    await updateIsActive(carCardId, isActive, getAuthorization(lp));
    await getCars();
  };
  return (
    <div style={{ backgroundColor: "var(--tgui--secondary_bg_color)" }}>
      <Text className={"flex  px-[10px] py-[8px]"}>Фильтр наличия авто:</Text>
      <Select
        onChange={(e) => {
          setStockFilter(e.target.value as CarCardsStockFilter);
        }}
        value={stockFilter}
      >
        <option value={"all"}>Все</option>
        <option value={"inStock"}>Только в наличии</option>
        <option value={"onOrder"}>Только на заказ</option>
      </Select>
      <Text className={"flex  px-[10px] py-[8px]"}>Фильтр активных авто:</Text>
      <Select
        onChange={(e) => {
          setActiveFilter(e.target.value as ActiveFilter);
        }}
        value={activeFilter}
      >
        <option value={"all"}>Все</option>
        <option value={"active"}>Только активные</option>
        <option value={"disabled"}>Только деактивированные</option>
      </Select>
      {list.length ? (
        list.map((car) => {
          const model = car.specifications?.find(
            (spec) => spec.field === "model",
          );
          const specification = car.specifications?.find(
            (spec) => spec.field === "specification",
          );

          return (
            <Cell
              subhead={specification?.value}
              key={car.id}
              after={
                <Switch
                  checked={car.isActive}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  onChange={() => {
                    updateActive(car.id, !car.isActive);
                  }}
                />
              }
            >
              {model?.value}
            </Cell>
          );
        })
      ) : (
        <Text>Ничего не найдено</Text>
      )}
    </div>
  );
}
