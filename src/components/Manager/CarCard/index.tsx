"use server";

import { Button, List, Section, Text, Title } from "@telegram-apps/telegram-ui";
import { classNames } from "@telegram-apps/sdk-react";
import { PhotoGallery } from "@/components/PhotoGallery/PhotoGallery";
import { ActiveSwitch } from "@/components/Manager/CarCard/ActiveSwitch";
import { getFileLink } from "@/utils/getFileLink";
import { SectionHeader } from "@telegram-apps/telegram-ui/dist/components/Blocks/Section/components/SectionHeader/SectionHeader";
import { SpecList } from "@/components/Manager/CarCard/SpecList";
import { AddNewSpec } from "@/components/Manager/CarCard/AddNewSpec";
import { StockSwitch } from "@/components/Manager/CarCard/StockSwitch";
import { Description } from "@/components/Manager/CarCard/Description";
import { getCarManager } from "@/actions/manager/cars/getCar";
import { priceFormatter } from "@/utils/priceFormatter";
import Link from "next/link";
import { UpdatePrice } from "@/components/Manager/CarCard/UpdatePrice";
import { UploadPhoto } from "@/components/Manager/CarCard/UploadPhoto";
import { ManagePhotosWrapper } from "@/components/Manager/CarCard/ManagePhotosWrapper";
export const ManagerCarCard = async ({ id }: { id: string }) => {
  if (!id) return null;
  const carCard = await getCarManager(id);

  if (!carCard) {
    return <div>Автомобиль не найден</div>;
  }

  const model = carCard.specifications?.find((spec) => spec.field === "model");
  const specification = carCard.specifications?.find(
    (spec) => spec.field === "specification",
  );

  return (
    <>
      <ActiveSwitch id={carCard.id} isActive={carCard.isActive} />
      <StockSwitch id={carCard.id} inStock={carCard.inStock} />
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
          {carCard.price ? (
            <Text style={{ color: "var(--tgui--hint_color)" }}>
              {priceFormatter(carCard.price)} {carCard.currency}
            </Text>
          ) : null}
          <Text style={{ color: "var(--tgui--hint_color)" }}>
            <p>{carCard.id}</p>
            <p>{carCard.externalId}</p>
          </Text>
        </div>
      </List>
      <Section className={"mt-2"}>
        <SectionHeader>Загрузить фотографии</SectionHeader>
        <UploadPhoto carCard={carCard} />
      </Section>
      <Section className={"mt-2"}>
        <SectionHeader>Управление добавленными фотографиями</SectionHeader>
        <ManagePhotosWrapper caraCard={carCard} />
      </Section>
      <Section className={"mt-2"}>
        <SectionHeader>Цена автомобиля</SectionHeader>
        <UpdatePrice carCardId={carCard.id} price={carCard.price} />
      </Section>
      <Section className={"mt-2"}>
        <SectionHeader>Характеристики авто</SectionHeader>
        <SpecList carCard={carCard} />
        <AddNewSpec
          carCardId={carCard.id}
          specifications={carCard.specifications}
        />
      </Section>
      <Section className={"mt-2"}>
        <SectionHeader>Описание карточки авто</SectionHeader>
        <Description carCard={carCard} />
      </Section>
      <Section className={"mt-2"}>
        <Link href={`/cars/${carCard.id}`}>
          <Button>Посмотреть карточку пользователя</Button>
        </Link>
      </Section>
    </>
  );
};
