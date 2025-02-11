"use server";

import { CarCard } from "@/models/carCard";
import { FC } from "react";
import { Info, List } from "@telegram-apps/telegram-ui";
import { DeleteButton } from "@/components/Manager/CarCard/SpecList/DeleteButton";

interface SpecListProps {
  carCard: CarCard;
}

export const SpecList: FC<SpecListProps> = async ({ carCard }) => {
  return (
    <List>
      {carCard.specifications?.map((spec) => (
        <div className={"flex justify-between"} key={spec.id}>
          <Info subtitle={spec.fieldName} type="text" className={"text-left"}>
            {spec.value}
          </Info>
          <DeleteButton
            specificationId={spec.id}
            disabled={spec.field === "specification" || spec.field === "model"}
          />
        </div>
      ))}
    </List>
  );
};
