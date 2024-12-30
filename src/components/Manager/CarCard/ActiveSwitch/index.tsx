"use client";

import { useLaunchParams } from "@telegram-apps/sdk-react";
import { Switch, Text } from "@telegram-apps/telegram-ui";
import { updateIsActive } from "@/actions/manager/cars/updateIsActive";
import { getAuthorization } from "@/utils/getAuthorization";
import { useRouter } from "next/navigation";

export const ActiveSwitch = ({
  isActive,
  id,
}: {
  isActive: boolean;
  id: string;
}) => {
  const lp = useLaunchParams();
  const router = useRouter();

  const updateActive = async (carCardId: string, isActive: boolean) => {
    await updateIsActive(carCardId, isActive, getAuthorization(lp));
    router.refresh();
  };

  return (
    <div className={"flex justify-between items-center mb-2"}>
      <Text>Автомобиль активен: </Text>
      <Switch
        checked={isActive}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onChange={(e) => {
          e.stopPropagation();
          updateActive(id, !isActive);
        }}
      />
    </div>
  );
};
