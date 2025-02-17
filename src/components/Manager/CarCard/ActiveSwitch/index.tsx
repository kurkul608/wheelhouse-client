"use client";

import { useLaunchParams } from "@telegram-apps/sdk-react";
import { Spinner, Switch, Text } from "@telegram-apps/telegram-ui";
import { updateIsActive } from "@/actions/manager/cars/updateIsActive";
import { getAuthorization } from "@/utils/getAuthorization";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const ActiveSwitch = ({
  isActive,
  id,
}: {
  isActive: boolean;
  id: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const lp = useLaunchParams();
  const router = useRouter();

  const updateActive = async (carCardId: string, isActive: boolean) => {
    await updateIsActive(carCardId, isActive, getAuthorization(lp));
    setIsLoading(false);
    router.refresh();
  };

  return (
    <div className={"flex justify-between items-center mb-2"}>
      <Text>Автомобиль активен: </Text>
      <div className={"flex"}>
        {isLoading ? <Spinner size={"s"} /> : null}
        <Switch
          checked={isActive}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={(e) => {
            e.stopPropagation();
            setIsLoading(true);
            updateActive(id, !isActive);
          }}
        />
      </div>
    </div>
  );
};
