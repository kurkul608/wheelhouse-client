"use client";
import { CarCard } from "@/models/carCard";
import { Button, Input } from "@telegram-apps/telegram-ui";
import { FC, useEffect, useState } from "react";
import { updatePrice } from "@/actions/manager/cars/updatePrice";
import { getAuthorization } from "@/utils/getAuthorization";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useRouter } from "next/navigation";

interface UpdatePriceProps {
  price?: string | null;
  carCardId: string;
}

export const UpdatePrice: FC<UpdatePriceProps> = ({ carCardId, price }) => {
  const [value, setValue] = useState(price);
  const [loading, setLoading] = useState(false);
  const lp = useLaunchParams();
  const router = useRouter();

  useEffect(() => {
    if (value !== price) {
      setValue(price);
    }
  }, [price]);

  const updatePriceHandler = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    await updatePrice(carCardId, value || "", getAuthorization(lp));
    setLoading(false);
    router.refresh();
  };

  return (
    <div className={"flex"}>
      <Input
        value={value ?? undefined}
        onChange={(event) => setValue(event.target.value)}
        placeholder={"Введите цену авто"}
      />
      <Button loading={loading} onClick={updatePriceHandler}>
        Сохранить
      </Button>
    </div>
  );
};
