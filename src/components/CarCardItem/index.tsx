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
import { classNames, RGB as RGBType } from "@telegram-apps/sdk-react";
import { RGB } from "@/components/RGB/RGB";
import { FC } from "react";
import { CarCard } from "@/models/carCard";
import { CarItemActions } from "@/components/CarCardItem/CarItemActions";
import { getFileLink } from "@/utils/getFileLink";

interface CarCardItemProps {
  carCard: CarCard;
}

export const CarCardItem: FC<CarCardItemProps> = ({ carCard }) => {
  const model = carCard.specifications?.find((spec) => spec.field === "model");
  const specification = carCard.specifications?.find(
    (spec) => spec.field === "specification",
  );

  const colorExt = carCard.specifications?.find(
    (spec) => spec.field === "color_ext",
  );
  const colorInt = carCard.specifications?.find(
    (spec) => spec.field === "color_int",
  );

  const otherSpecs = carCard.specifications?.filter(
    (spec) =>
      spec.field !== "model" &&
      spec.field !== "color_ext" &&
      spec.field !== "specification" &&
      spec.field !== "color_int",
  );

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
        <CarItemActions />
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
            subtitle={
              !!carCard.externalId || !carCard.price
                ? "Узнать цену"
                : `${carCard.price} ${carCard.currency}`
            }
            titleBadge={<Badge type={"dot"} />}
            before={<Avatar size={48} />}
          >
            Цена
          </Cell>
          <Cell
            subtitle={`${colorExt?.value || "Неизвестно"}`}
            titleBadge={<Badge type={"dot"} />}
            before={
              <RGB size={48} color={colorInt?.value as unknown as RGBType} />
            }
          >
            Цвет экстерьера
          </Cell>
          <Cell
            subtitle={`${colorInt?.value || "Неизвестно"}`}
            titleBadge={<Badge type={"dot"} />}
            before={
              <RGB size={48} color={colorInt?.value as unknown as RGBType} />
            }
          >
            Цвет интерьера
          </Cell>
          {otherSpecs?.map((spec) => (
            <Cell
              key={`spec-${spec.field}`}
              subtitle={spec.value || "Неизвестно"}
              titleBadge={<Badge type={"dot"} />}
              before={<Avatar size={48} />}
            >
              {spec.fieldName}
            </Cell>
          ))}
        </Section>
      </List>
    </>
  );
};
