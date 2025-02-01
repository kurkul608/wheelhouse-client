"use client";

import {
  Button,
  Card,
  CircularProgress,
  List,
  Text,
} from "@telegram-apps/telegram-ui";
import Image from "next/image";
import { CardChip } from "@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardChip/CardChip";
import { CardCell } from "@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell";
import { useMemo, Fragment, useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { CarCard } from "@/models/carCard";
import { WishlistButton } from "@/components/CarCardList/CarCardListItem/WishlistButton/imdex";
import { getCarCardsList } from "@/actions/carCard/getList";
import { CarCardsFiltersContext } from "@/contexts/carCardsFiltersContext";
import { getFileLink } from "@/utils/getFileLink";

export const CarCardListItem = (props: CarCard) => {
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
    <Fragment key={props.id}>
      <Card className={"w-full"} onClick={onCardClick}>
        <CardChip after={<WishlistButton carCardId={props.id} />}>
          {props.inStock ? "В наличии" : "Под заказ"}
        </CardChip>
        <Image
          src={
            props.importedPhotos?.[0] || getFileLink(props.photos?.[0]) || ""
          }
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
      </Card>
    </Fragment>
  );
};

export const CarCardItemList = ({
  initialList,
  isScrollActive,
}: {
  initialList: CarCard[];
  isScrollActive?: boolean;
}) => {
  const {
    stockFilter,
    search,
    minDateFilter,
    maxDateFilter,
    carModelFilter,
    carBrandFilter,
    sortBy,
    sortOrder,
  } = useContext(CarCardsFiltersContext);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState<CarCard[]>(initialList);

  const loadMoreCars = async (newPage?: number, newList?: CarCard[]) => {
    setIsLoading(true);
    const apiCarCards = await getCarCardsList(newPage ?? page, {
      stockFilter,
      search,
      minDateFilter,
      maxDateFilter,
      carModelFilter,
      carBrandFilter,
      sortOrder,
      sortBy,
    });
    setList([...(newList ?? list), ...(apiCarCards ?? [])]);
    setPage(newPage ?? page + 1);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isScrollActive) {
      setList([]);
      setPage(0);
      loadMoreCars(0, []);
    }
  }, [
    isScrollActive,
    stockFilter,
    search,
    minDateFilter,
    maxDateFilter,
    carModelFilter,
    carBrandFilter,
    sortOrder,
    sortBy,
  ]);

  return list.length ? (
    <List style={{ backgroundColor: "var(--tgui--secondary_bg_color)" }}>
      {list.map((carCard, index) => (
        <CarCardListItem {...carCard} key={`car-card-${index}`} />
      ))}
      {isScrollActive && (
        <div className={"flex justify-center items-center"}>
          <Button
            onClick={() => {
              loadMoreCars();
            }}
          >
            Загрузить еще
          </Button>
        </div>
      )}
    </List>
  ) : isLoading ? (
    <div className={"h-full flex items-center justify-center"}>
      <CircularProgress />
    </div>
  ) : (
    <div className={"h-full flex items-center justify-center"}>
      <Text>Ниего не найдено</Text>
    </div>
  );
};
