"use client";

import { FC, useEffect, useRef, useState } from "react";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import {
  CarPage,
  getCarCardsListWithNoFilters,
} from "@/actions/carCard/getListWithNoFilters";
import { CarCardListItem } from "@/components/CarCardList/CarCardListItem/CarCardItemList";

export const CarList: FC = () => {
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const [initialIndex, setInitialIndex] = useState(0);

  useEffect(() => {
    const savedIndex = sessionStorage.getItem("carsListScrollIndex");
    if (savedIndex) {
      setInitialIndex(parseInt(savedIndex, 10));
    }
  }, []);

  const {
    data,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isFetchingNextPage,
    isFetchingPreviousPage,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
  } = useInfiniteQuery<CarPage, Error, InfiniteData<CarPage, unknown>, unknown>(
    {
      queryKey: ["cars"],
      queryFn: ({ pageParam = 1 }) =>
        getCarCardsListWithNoFilters({
          pageParam: pageParam as unknown as number,
        }),
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.page + 1 : undefined,
      getPreviousPageParam: (firstPage) =>
        firstPage.page > 1 ? firstPage.page - 1 : undefined,
    },
  );
  const cars = data ? data.pages.flatMap((page) => page.items) : [];
  console.log("cars: ", cars);
  console.log("initialIndex: ", initialIndex);
  console.log("hasNextPage: ", hasNextPage);
  console.log("hasPreviousPage: ", hasPreviousPage);
  // console.log(cars);

  return (
    <Virtuoso
      ref={virtuosoRef}
      data={cars}
      initialTopMostItemIndex={initialIndex}
      itemContent={(index, car) => <CarCardListItem {...car}></CarCardListItem>}
      rangeChanged={(range) => {
        sessionStorage.setItem(
          "carsListScrollIndex",
          range.startIndex.toString(),
        );
      }}
      startReached={() => {
        if (hasPreviousPage && !isFetchingPreviousPage) {
          fetchPreviousPage();
        }
      }}
      endReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      style={{ height: "calc(100vh - 140px)" }}
    />
  );
};
