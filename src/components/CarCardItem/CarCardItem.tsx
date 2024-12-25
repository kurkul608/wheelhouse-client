"use client";

import { Button, Card, List } from "@telegram-apps/telegram-ui";
import Image from "next/image";
import { CardChip } from "@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip";
import { CardCell } from "@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell";
import { useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CarCard } from "@/models/carCard";
import { BucketContext } from "@/contexts/bucketContext";
import { addToBucket } from "@/actions/bucket/addTo";
import { getAuthorization } from "@/utils/getAuthorization";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { deleteFromBucket } from "@/actions/bucket/deleteTo";
import { getIsCarInBucket } from "@/utils/getIsCarInBucket";
import { throttle } from "@/utils/throttle";

export const CarCardItem = (props: CarCard) => {
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();
  const lp = useLaunchParams();

  const { bucket, update } = useContext(BucketContext);

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

  const isCardInBucket = useMemo(
    () => getIsCarInBucket(props.id, bucket),
    [props.id, bucket],
  );

  const buttonClick = async (e: any) => {
    e.stopPropagation();
    const headers = getAuthorization(lp);
    setIsLoading(true);
    if (isCardInBucket) {
      await deleteFromBucket(props.id, headers);
      if (update) {
        await update();
      }
    } else {
      await addToBucket(props.id, headers);
      if (update) {
        await update();
      }
    }
    await throttle();
    setIsLoading(false);
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
        <Button
          mode={isCardInBucket ? "gray" : "filled"}
          size="m"
          stretched
          disabled={loading}
          loading={loading}
          onClick={buttonClick}
        >
          {isCardInBucket ? "Убрать из корзины" : "Добавить в корзину"}
        </Button>
      </>
    </Card>
  );
};

export const CarCardItemList = ({ list }: { list: CarCard[] }) => {
  return <List>{list.map(CarCardItem)}</List>;
};
