"use client";

import React, { useEffect, useState } from "react";
import { CarList } from "@/components/CarCardList/InfiniteCarCardsScroll";
import { Spinner } from "@telegram-apps/telegram-ui";

export function CarCardList() {
  const [initialIndex, setInitialIndex] = useState<null | number>(null);

  useEffect(() => {
    const savedIndex = sessionStorage.getItem("carsListScrollIndex");
    if (savedIndex) {
      setInitialIndex(parseInt(savedIndex, 10));
    } else {
      setInitialIndex(0);
    }
  }, []);

  if (initialIndex === null) {
    return (
      <div className={"flex justify-center items-center"}>
        <Spinner size="l" />
      </div>
    );
  }

  return <CarList initialIndex={initialIndex} />;
}
