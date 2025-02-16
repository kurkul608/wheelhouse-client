"use client";

import { useEffect, useState } from "react";
import { CarList } from "@/components/CarCardList/InfiniteCarCardsScroll";

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
    return null;
  }

  return <CarList initialIndex={initialIndex} />;
}
