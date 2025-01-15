"use server";

import { getCarCard } from "@/actions/carCard/get";
import { List, Text, Title } from "@telegram-apps/telegram-ui";
import { classNames } from "@telegram-apps/sdk-react";
import { PhotoGallery } from "@/components/PhotoGallery/PhotoGallery";
import { ActiveSwitch } from "@/components/Manager/CarCard/ActiveSwitch";
import { getFileLink } from "@/utils/getFileLink";

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

  // const colorExt = carCard.specifications?.find(
  //   (spec) => spec.field === "color_ext",
  // );
  // const colorInt = carCard.specifications?.find(
  //   (spec) => spec.field === "color_int",
  // );
  //
  // const otherSpecs = carCard.specifications?.filter(
  //   (spec) =>
  //     spec.field !== "model" &&
  //     spec.field !== "color_ext" &&
  //     spec.field !== "specification" &&
  //     spec.field !== "color_int",
  // );

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
    </>
  );
};
