"use client";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getCarsPageUrl } from "@/utils/getCarsPageUrl";
import { PhotoGallery } from "@/components/PhotoGallery/PhotoGallery";
import {
  Avatar,
  Badge,
  Cell,
  List,
  Section,
  Text,
  Title,
} from "@telegram-apps/telegram-ui";
import { classNames, useLaunchParams } from "@telegram-apps/sdk-react";
import { FC, useState } from "react";
import { CarCard } from "@/models/carCard";
import { CarItemActions } from "@/components/CarCardItem/CarItemActions";
import { getFileLink } from "@/utils/getFileLink";
import { AvatarBySpecification } from "@/components/CarCardItem/AvatarBySpecification";
import { Ruble } from "@/components/Icons/Ruble";
import { createOrder } from "@/actions/order/create";
import { getAuthorization } from "@/utils/getAuthorization";

interface CarCardItemProps {
  carCard: CarCard;
}

export const CarCardItem: FC<CarCardItemProps> = ({ carCard }) => {
  const [isRequestSend, setIsRequestSend] = useState(false);
  const [mainButtonText, setMainButtonText] = useState<string | null>(null);
  const lp = useLaunchParams();
  const model = carCard.specifications?.find((spec) => spec.field === "model");
  const specification = carCard.specifications?.find(
    (spec) => spec.field === "specification",
  );

  const otherSpecs = carCard.specifications?.filter(
    (spec) => spec.field !== "model" && spec.field !== "specification",
  );

  const sendUserRequest = async () => {
    if (!isRequestSend) {
      const order = await createOrder(
        carCard.id as string,
        true,
        getAuthorization(lp),
      );
      setMainButtonText("Менеджер свяжится с вами в ближайшее время!");
      setIsRequestSend(true);
      console.log(order);
    }
  };

  return (
    <>
      <Breadcrumbs
        items={[
          {
            name: "Главная",
            href: getCarsPageUrl(),
          },
          { name: model?.value || "" },
        ]}
      >
        <CarItemActions
          isRequestAlreadySend={isRequestSend}
          existMainButtonText={mainButtonText}
        />
      </Breadcrumbs>
      <PhotoGallery
        photoUrls={
          carCard.photos?.length
            ? carCard.photos.map(getFileLink)
            : carCard.importedPhotos
        }
      />
      <List
        style={{
          background: "var(--tgui--bg_color)",
        }}
      >
        <div className={classNames("flex", "flex-col", "items-center")}>
          <Title level="1" weight="3">
            {model?.value}
          </Title>
          <Text style={{ color: "var(--tgui--hint_color)" }}>
            {specification?.value}
          </Text>
        </div>
      </List>
      <List
        style={{
          background: "var(--tgui--secondary_bg_color)",
        }}
      >
        <Section header={"Хакартеристики авто:"}>
          <Cell
            onClick={() => {
              if (!!carCard.externalId) {
                sendUserRequest();
              }
            }}
            subtitle={
              !!carCard.externalId || !carCard.price
                ? "Узнать цену"
                : `${carCard.price} ${carCard.currency}`
            }
            titleBadge={<Badge type={"dot"} />}
            before={
              <Avatar size={48}>
                <Ruble color={"var(--tgui--accent_text_color)"} />
              </Avatar>
            }
          >
            Цена
          </Cell>

          {otherSpecs?.map((spec) => (
            <Cell
              key={`spec-${spec.field}`}
              subtitle={spec.value || "Неизвестно"}
              titleBadge={<Badge type={"dot"} />}
              before={<AvatarBySpecification specification={spec} />}
            >
              {spec.fieldName}
            </Cell>
          ))}
        </Section>
      </List>
      {!!carCard.description && (
        <List
          style={{
            background: "var(--tgui--secondary_bg_color)",
          }}
        >
          <Section header={"Описание авто:"}>
            <div className={"px-[16px]"}>{carCard.description}</div>
          </Section>
        </List>
      )}
    </>
  );
};
