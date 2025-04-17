"use client";

import { getManagerCarsList } from "@/actions/manager/cars/getList";
import { useContext, useEffect, useState } from "react";
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
import { ManagerFiltersContext } from "@/contexts/managerFiltersContext";
import { AxiosHeaders } from "axios";
import { Virtuoso } from "react-virtuoso";

export type ActiveFilter = "all" | "active" | "disabled";

export default function ManagerCarsPage() {
  const router = useRouter();
  const [list, setList] = useState<CarCard[]>([]);
  const { stockFilter, activeFilter, updateManagerFilters, searchString } =
    useContext(ManagerFiltersContext);
  const [loading, setLoading] = useState(false);
  const lp = useLaunchParams();
  const getCars = async () => {
    const cars = await getManagerCarsList(
      searchString,
      stockFilter,
      activeFilter,
      getAuthorization(lp) as AxiosHeaders,
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
  }, [stockFilter, activeFilter, searchString]);

  return (
    <Page>
      <div
        style={{ backgroundColor: "var(--tgui--secondary_bg_color)" }}
        className={"h-[calc(100vh-62px)] overflow-auto"}
      >
        {!loading && list.length ? (
          <Virtuoso
            style={{ height: "100%" }}
            totalCount={list.length}
            data={list}
            components={{
              Header: () => (
                <>
                  <Input
                    value={searchString}
                    onChange={(e) =>
                      updateManagerFilters?.({ searchString: e.target.value })
                    }
                    placeholder={"Введите название авто"}
                  />
                  <Text className={"flex  px-[10px] py-[8px]"}>
                    Фильтр наличия авто:
                  </Text>
                  <Select
                    onChange={(e) => {
                      updateManagerFilters?.({
                        stockFilter: e.target.value as CarCardsStockFilter,
                      });
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
                      updateManagerFilters?.({
                        activeFilter: e.target.value as ActiveFilter,
                      });
                    }}
                    value={activeFilter}
                  >
                    <option value={"all"}>Все</option>
                    <option value={"active"}>Только активные</option>
                    <option value={"disabled"}>Только деактивированные</option>
                  </Select>
                </>
              ),
            }}
            itemContent={(_, car) => (
              <Cell
                subhead={car.carModel}
                before={
                  <Avatar
                    alt={car.carBrand}
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
                {car.carBrand}
              </Cell>
            )}
          />
        ) : null}
        {loading && <Spinner size={"l"} />}
        {!loading && !list.length && <Headline>Ничего не найдено</Headline>}
      </div>
    </Page>
  );
}
