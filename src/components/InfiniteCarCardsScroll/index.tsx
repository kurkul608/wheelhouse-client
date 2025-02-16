"use client";

import { FC, useEffect, useRef, useState } from "react";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";
import {
  CarPage,
  getCarCardsListWithNoFilters,
} from "@/actions/carCard/getListWithNoFolters";
import { CarCard } from "@/models/carCard";

export const CarList: FC = () => {
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const [initialIndex, setInitialIndex] = useState(0);

  useEffect(() => {
    // При монтировании пытаемся восстановить сохранённый индекс прокрутки
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
  } = useInfiniteQuery<CarPage, Error, CarPage, [string]>({
    queryKey: ["cars"],
    queryFn: getCarCardsListWithNoFilters,
    getNextPageParam: (lastPage) =>
      lastPage.hasMore ? lastPage.page + 1 : undefined,
    getPreviousPageParam: (firstPage) =>
      firstPage.page > 1 ? firstPage.page - 1 : undefined,
  });
  // Объединяем все загруженные страницы в один массив
  // const cars = data ? data.pages.flatMap((page) => page.items) : [];
  console.log(data);
  return null;

  // return (
  //   <Virtuoso
  //     ref={virtuosoRef}
  //     data={cars}
  //     // При монтировании скролл устанавливается на сохранённый индекс
  //     initialTopMostItemIndex={initialIndex}
  //     // Отрисовка каждой карточки: оборачиваем в Link для перехода на страницу деталей
  //     itemContent={(index, car) => (
  //       <Link href={`/cars/${car.id}`}>
  //         <a>
  //           <CarCard car={car} />
  //         </a>
  //       </Link>
  //     )}
  //     // При изменении диапазона видимых элементов сохраняем индекс первого видимого элемента
  //     onRangeChanged={(range) => {
  //       sessionStorage.setItem(
  //         "carsListScrollIndex",
  //         range.startIndex.toString(),
  //       );
  //     }}
  //     // При достижении начала списка (скролл вверх) пытаемся подгрузить предыдущую страницу, если она есть
  //     startReached={() => {
  //       if (hasPreviousPage && !isFetchingPreviousPage) {
  //         fetchPreviousPage();
  //       }
  //     }}
  //     // При достижении конца списка (скролл вниз) подгружаем следующую страницу
  //     endReached={() => {
  //       if (hasNextPage && !isFetchingNextPage) {
  //         fetchNextPage();
  //       }
  //     }}
  //     // Задаём высоту контейнера (например, чтобы список занимал весь viewport)
  //     style={{ height: "100vh" }}
  //   />
  // );
};
