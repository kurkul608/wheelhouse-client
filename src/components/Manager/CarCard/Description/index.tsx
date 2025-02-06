"use client";

import { CarCard } from "@/models/carCard";
import { FC, useState } from "react";
import { Button } from "@telegram-apps/telegram-ui";
import { updateDescription } from "@/actions/manager/cars/updateDescription";
import { getAuthorization } from "@/utils/getAuthorization";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useRouter } from "next/navigation";
import { Tiptap } from "@/components/TipTap";

export interface DescriptionProps {
  carCard: CarCard;
}
export const Description: FC<DescriptionProps> = ({ carCard }) => {
  const [value, setValue] = useState<string>(carCard.description);
  const [isLoading, setIsLoading] = useState(false);
  const lp = useLaunchParams();
  const router = useRouter();

  const buttonClickHandler = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    await updateDescription(carCard.id, value, getAuthorization(lp));
    setIsLoading(false);

    router.refresh();
  };

  return (
    <div>
      <Tiptap editorContent={value} onChange={setValue} />
      <Button
        type={"button"}
        onClick={buttonClickHandler}
        loading={isLoading}
        disabled={value === carCard.description || isLoading}
      >
        Сохранить описание
      </Button>
    </div>
  );
};
