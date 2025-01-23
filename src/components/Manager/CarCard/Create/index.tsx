"use client";

import { useState } from "react";
import { CreateAuto } from "@/components/Manager/CarCard/Create/CreateAuto";
import { CreatePhotos } from "../CreatePhotos";

export const ManagerCarCardCreate = () => {
  const [stage, setStage] = useState<number>(1);
  const [cardId, setCardId] = useState<string | null>(null);

  const toNextStage = (cardId: string) => {
    setStage(2);
    setCardId(cardId);
  };
  console.log(stage);
  return stage === 1 && !cardId ? (
    <CreateAuto toNextStage={toNextStage} />
  ) : (
    <CreatePhotos carId={cardId as string} />
  );
};
