"use client";

import { useLaunchParams } from "@telegram-apps/sdk-react";
import { Spinner, Switch, Text } from "@telegram-apps/telegram-ui";
import { getAuthorization } from "@/utils/getAuthorization";
import { useRouter } from "next/navigation";
import { updateInStock } from "@/actions/manager/cars/updateInStock";
import { useState } from "react";

export const StockSwitch = ({
  inStock,
  id,
}: {
  inStock: boolean;
  id: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const lp = useLaunchParams();
  const router = useRouter();

  const updateActive = async (carCardId: string, inStock: boolean) => {
    await updateInStock(carCardId, inStock, getAuthorization(lp));
    setIsLoading(false);
    router.refresh();
  };

  return (
    <div className={"flex justify-between items-center mb-2"}>
      <Text>Автомобиль в наличии: </Text>
      <div className={"flex "}>
        {isLoading ? <Spinner size={"s"} /> : null}
        <Switch
          checked={inStock}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={(e) => {
            e.stopPropagation();
            setIsLoading(true);
            updateActive(id, !inStock);
          }}
        />
      </div>
    </div>
  );
};
