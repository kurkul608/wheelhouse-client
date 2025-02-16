"use client";

import { Card } from "@telegram-apps/telegram-ui";
import Image from "next/image";
import { CardChip } from "@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip";
import { CardCell } from "@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell";
import { useMemo, Fragment, FC } from "react";
import { useRouter } from "next/navigation";
import { CarCard } from "@/models/carCard";
import { WishlistButton } from "@/components/CarCardList/CarCardListItem/WishlistButton";
import { getFileLink } from "@/utils/getFileLink";

type CarCardItemListProps = { listIndex?: number } & CarCard;

export const CarCardListItem: FC<CarCardItemListProps> = ({
  listIndex,
  ...props
}) => {
  const router = useRouter();

  const modelName = useMemo(() => {
    let modelName = "";
    const model = props.specifications.find((spec) => spec.field === "model");
    const specification = props.specifications.find(
      (spec) => spec.field === "specification",
    );
    if (model) {
      modelName = model.value;
    }
    if (specification) {
      modelName += ` ${specification.value}`;
    }
    return modelName;
  }, [props.specifications]);

  const onCardClick = () => {
    if (typeof listIndex === "number")
      sessionStorage.setItem("carsListScrollIndex", listIndex.toString());
    router.push(`/cars/${props.id}`);
  };

  return (
    <Fragment key={props.id}>
      <Card className={"w-full"} onClick={onCardClick}>
        <CardChip after={<WishlistButton carCardId={props.id} />}>
          {props.inStock ? "В наличии" : "Под заказ"}
        </CardChip>
        <div className="relative w-full h-[308px] overflow-hidden">
          <Image
            src={
              props.importedPhotos?.[0] || getFileLink(props.photos?.[0]) || ""
            }
            alt="Фото авто"
            fill
            style={{
              objectFit: "cover",
            }}
            className="w-full h-full"
            unoptimized={!props.importedPhotos?.[0]}
          />
        </div>
        <CardCell readOnly subtitle={modelName}>
          {!!props.externalId || !props.price
            ? "Узнать цену"
            : `${props.price} ${props.currency}`}
        </CardCell>
      </Card>
    </Fragment>
  );
};
