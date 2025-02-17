"use client";

import React, {
  FC,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import { CarCardListItem } from "@/components/CarCardList/CarCardListItem/CarCardListItem";
import { getCarCardsList } from "@/actions/carCard/getList";
import { CarCardsFiltersContext } from "@/contexts/carCardsFiltersContext";
import { Spinner } from "@telegram-apps/telegram-ui";

interface CarListProps {
  initialIndex: number;
}

export const CarList: FC<CarListProps> = ({ initialIndex = 0 }) => {
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const [initialScrolled, setInitialScrolled] = useState(false);

  const {
    stockFilter,
    search,
    minDateFilter,
    maxDateFilter,
    carModelFilter,
    carBrandFilter,
    sortBy,
    sortOrder,
  } = useContext(CarCardsFiltersContext);

  const filters = useMemo(
    () => ({
      stockFilter,
      search,
      minDateFilter,
      maxDateFilter,
      carModelFilter,
      carBrandFilter,
      sortBy,
      sortOrder,
    }),
    [
      stockFilter,
      search,
      minDateFilter,
      maxDateFilter,
      carModelFilter,
      carBrandFilter,
      sortBy,
      sortOrder,
    ],
  );

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
      queryKey: ["cars", filters],
      queryFn: ({ pageParam = 1 }) =>
        getCarCardsList(pageParam as number, {
          stockFilter,
          search,
          minDateFilter,
          maxDateFilter,
          carModelFilter,
          carBrandFilter,
          sortOrder,
          sortBy,
        }),
      getNextPageParam: (lastPage) =>
        lastPage.hasMore ? lastPage.page + 1 : undefined,
      getPreviousPageParam: (firstPage) =>
        firstPage.page > 1 ? firstPage.page - 1 : undefined,
    },
  );
  const cars = useMemo(
    () => (data ? data.pages.flatMap((page) => page.items) : []),
    [data],
  );

  useEffect(() => {
    if (!initialScrolled) {
      if (initialIndex !== null && cars.length > initialIndex) {
        virtuosoRef.current?.scrollToIndex({
          index: initialIndex,
          align: "start",
          behavior: "auto",
        });
        sessionStorage.removeItem("carsListScrollIndex");
        console.log("virtuosoRef.current: ", virtuosoRef.current);
        console.log("Scroll to index: ", initialIndex);
        setInitialScrolled(true);
      } else {
        fetchNextPage();
      }
    }
  }, [initialIndex, cars.length, initialScrolled]);

  return (
    <Virtuoso
      ref={virtuosoRef}
      data={cars}
      itemContent={(index, car) => (
        <CarCardListItem {...car} listIndex={index}></CarCardListItem>
      )}
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
      components={{
        Header: () => (
          <>
            {isFetchingPreviousPage ? (
              <div className={"flex justify-center items-center"}>
                <Spinner size="l" />
              </div>
            ) : null}
          </>
        ),
        Footer: () =>
          isFetchingNextPage ? (
            <div className={"flex justify-center items-center"}>
              <Spinner size="l" />
            </div>
          ) : null,
      }}
    />
  );
};
