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
        className="h-[calc(100vh-62px)] overflow-auto"
      >
        <div className="px-[10px] py-[8px] flex flex-col gap-2">
          <Input
            value={searchString}
            onChange={(e) =>
              updateManagerFilters?.({ searchString: e.target.value })
            }
            placeholder="Введите название авто"
          />
          <Text>Фильтр наличия авто:</Text>
          <Select
            value={stockFilter}
            onChange={(e) =>
              updateManagerFilters?.({
                stockFilter: e.target.value as CarCardsStockFilter,
              })
            }
          >
            <option value="all">Все</option>
            <option value="inStock">Только в наличии</option>
            <option value="onOrder">Только на заказ</option>
          </Select>
          <Text>Фильтр активных авто:</Text>
          <Select
            value={activeFilter}
            onChange={(e) =>
              updateManagerFilters?.({
                activeFilter: e.target.value as ActiveFilter,
              })
            }
          >
            <option value="all">Все</option>
            <option value="active">Только активные</option>
            <option value="disabled">Только деактивированные</option>
          </Select>
        </div>

        {loading && (
          <div className="flex justify-center items-center mt-8">
            <Spinner size="l" />
          </div>
        )}

        {!loading && list.length > 0 && (
          <Virtuoso
            style={{ height: "100%" }}
            totalCount={list.length}
            data={list}
            itemContent={(_, car) => (
              <Cell
                subhead={car.carModel}
                before={
                  <Avatar
                    alt={car.carBrand}
                    src={
                      car.externalId
                        ? (car.importedPhotos?.[0] ?? "")
                        : (getFileLink(car.photos?.[0]) ?? "")
                    }
                  />
                }
                onClick={() => router.push(`/manager/cars/${car.id}`)}
              >
                {car.carBrand}
              </Cell>
            )}
          />
        )}

        {!loading && list.length === 0 && (
          <div className="flex justify-center mt-8">
            <Headline>Ничего не найдено</Headline>
          </div>
        )}
      </div>
    </Page>
  );
}
