"use client";

import { Card, List } from "@telegram-apps/telegram-ui";
import Image from "next/image";
import { CardChip } from "@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip";
import { CardCell } from "@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { CarCard } from "@/models/carCard";

export const CarCardItem = (props: CarCard) => {
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
    router.push(`/cars/${props.id}`);
  };

  return (
    <Card key={props.id} className={"w-full"} onClick={onCardClick}>
      <>
        <CardChip>{props.inStock ? "В наличии" : "Под заказ"}</CardChip>
        <Image
          src={props.importedPhotos[0] || props.photos[0]}
          alt={"Фото авто"}
          width={254}
          height={308}
          style={{
            display: "block",
            objectFit: "cover",
          }}
          className={"w-full"}
        />
        <CardCell readOnly subtitle={modelName}>
          {!!props.externalId || !props.price
            ? "Узнать цену"
            : `${props.price} ${props.currency}`}
        </CardCell>
      </>
    </Card>
  );
};

export const CarCardItemList = ({ list }: { list: CarCard[] }) => {
  return <List>{list.map(CarCardItem)}</List>;
};
