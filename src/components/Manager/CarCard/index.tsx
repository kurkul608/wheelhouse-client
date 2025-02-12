"use server";

import { getCarCard } from "@/actions/carCard/get";
import {
  List,
  Section,
  Subheadline,
  Text,
  Title,
} from "@telegram-apps/telegram-ui";
import { classNames } from "@telegram-apps/sdk-react";
import { PhotoGallery } from "@/components/PhotoGallery/PhotoGallery";
import { ActiveSwitch } from "@/components/Manager/CarCard/ActiveSwitch";
import { getFileLink } from "@/utils/getFileLink";
import { CreatePhotos } from "@/components/Manager/CarCard/CreatePhotos";
import { ManagePhotos } from "@/components/Manager/CarCard/ManagePhotos";
import { SectionHeader } from "@telegram-apps/telegram-ui/dist/components/Blocks/Section/components/SectionHeader/SectionHeader";
import { SpecList } from "@/components/Manager/CarCard/SpecList";
import { AddNewSpec } from "@/components/Manager/CarCard/AddNewSpec";
import { StockSwitch } from "@/components/Manager/CarCard/StockSwitch";
import { Description } from "@/components/Manager/CarCard/Description";

export const ManagerCarCard = async ({ id }: { id: string }) => {
  if (!id) return null;
  const carCard = await getCarCard(id);

  if (!carCard) {
    return <div>Автомобиль не найден</div>;
  }

  const model = carCard.specifications?.find((spec) => spec.field === "model");
  const specification = carCard.specifications?.find(
    (spec) => spec.field === "specification",
  );
  console.log(carCard);

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
        </div>
      </List>
      <Section className={"mt-2"}>
        <SectionHeader>Загрузить фотографии</SectionHeader>
        <Subheadline>
          Внимание!! Нельзя загружать фото, весом более 1мб
        </Subheadline>
        <CreatePhotos carId={carCard.id} />
      </Section>
      <Section className={"mt-2"}>
        <SectionHeader>Управление добавленными фотографиями</SectionHeader>
        <ManagePhotos photos={carCard.photos ?? []} carId={carCard.id} />
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
    </>
  );
};
