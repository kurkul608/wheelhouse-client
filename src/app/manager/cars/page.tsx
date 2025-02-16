"use client";

import { getManagerCarsList } from "@/actions/manager/cars/getList";
import { useEffect, useState } from "react";
import { CarCard } from "@/models/carCard";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { getAuthorization } from "@/utils/getAuthorization";
import {
  Avatar,
  Cell,
  Headline,
  Input,
  Select,
  Spinner,
  Text,
} from "@telegram-apps/telegram-ui";
import { CarCardsStockFilter } from "@/contexts/carCardsFiltersContext";
import { useRouter } from "next/navigation";
import { Page } from "@/components/Page";
import { getFileLink } from "@/utils/getFileLink";

export type ActiveFilter = "all" | "active" | "disabled";

export default function ManagerCarsPage() {
  const router = useRouter();
  const [list, setList] = useState<CarCard[]>([]);
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState<CarCardsStockFilter>("all");
  const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");
  const [loading, setLoading] = useState(false);
  const lp = useLaunchParams();
  const getCars = async () => {
    const cars = await getManagerCarsList(
      search,
      stockFilter,
      activeFilter,
      getAuthorization(lp),
    );

    if (cars) {
      setList(cars);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    setList([]);
    getCars();
  }, [stockFilter, activeFilter, search]);

  return (
    <Page>
      <div
        style={{ backgroundColor: "var(--tgui--secondary_bg_color)" }}
        className={"h-[calc(100vh-62px)] overflow-auto"}
      >
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={"Введите название авто"}
        />
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
        <Text className={"flex  px-[10px] py-[8px]"}>
          Фильтр активных авто:
        </Text>
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
        {list.map((car) => {
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
              before={
                <Avatar
                  alt={model?.value}
                  src={
                    car.externalId
                      ? (car?.importedPhotos?.[0] ?? "")
                      : (getFileLink(car?.photos?.[0]) ?? "")
                  }
                />
              }
              onClick={() => {
                router.push(`/manager/cars/${car.id}`);
              }}
            >
              {model?.value}
            </Cell>
          );
        })}
        {loading && <Spinner size={"l"} />}
        {!loading && !list.length && <Headline>Ничего не найдено</Headline>}
      </div>
    </Page>
  );
}
