"use client";

import { useLaunchParams } from "@telegram-apps/sdk-react";
import { Switch, Text } from "@telegram-apps/telegram-ui";
import { getAuthorization } from "@/utils/getAuthorization";
import { useRouter } from "next/navigation";
import { updateInStock } from "@/actions/manager/cars/updateInStock";

export const StockSwitch = ({
  inStock,
  id,
}: {
  inStock: boolean;
  id: string;
}) => {
  const lp = useLaunchParams();
  const router = useRouter();

  const updateActive = async (carCardId: string, inStock: boolean) => {
    await updateInStock(carCardId, inStock, getAuthorization(lp));
    router.refresh();
  };

  return (
    <div className={"flex justify-between items-center mb-2"}>
      <Text>Автомобиль в наличии: </Text>
      <Switch
        checked={inStock}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => {
          e.stopPropagation();
          updateActive(id, !inStock);
        }}
      />
    </div>
  );
};
