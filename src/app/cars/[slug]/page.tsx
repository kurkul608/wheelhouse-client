import { Page } from "@/components/Page";
import { getCarCard } from "@/actions/carCard/get";
import {
  Avatar,
  Badge,
  Cell,
  List,
  Section,
  Text,
  Title,
} from "@telegram-apps/telegram-ui";
import { PhotoGallery } from "@/components/PhotoGallery/PhotoGallery";
import { RGB } from "@/components/RGB/RGB";
import { classNames, type RGB as RGBType } from "@telegram-apps/sdk-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getCarsPageUrl } from "@/utils/getCarsPageUrl";

export default async function Car({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const carCard = await getCarCard(slug);

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
    <Page>
      <Breadcrumbs
        items={[
          {
            name: "Автомобили",
            href: getCarsPageUrl(),
          },
          { name: model?.value || "" },
        ]}
      />
      <PhotoGallery
        photoUrls={
          carCard.photos?.length ? carCard.photos : carCard.importedPhotos
        }
      />
      <List
        style={{
          background: "var(--tgui--bg_color)",
        }}
      >
        {/*<PhotoGallery*/}
        {/*  photoUrls={*/}
        {/*    carCard.photos?.length ? carCard.photos : carCard.importedPhotos*/}
        {/*  }*/}
        {/*/>*/}
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
    </Page>
  );
}
