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

  return (
    <>
      <ActiveSwitch id={carCard.id} isActive={carCard.isActive} />
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
        <AddNewSpec carCardId={carCard.id} />
      </Section>
    </>
  );
};
