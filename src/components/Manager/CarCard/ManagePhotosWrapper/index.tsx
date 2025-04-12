"use client";

import { getAuthorization } from "@/utils/getAuthorization";
import { CarCard } from "@/models/carCard";
import { FileModel } from "@/models/file";
import { FC } from "react";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { ManagePhotos } from "@/components/ManagePhotos";
import { updatePhotos } from "@/actions/manager/cars/updatePhotos";
import { removeFileFromCar } from "@/actions/manager/cars/removeFileFromCarCard";

interface IManagePhotosWrapperProps {
  caraCard: CarCard;
}
export const ManagePhotosWrapper: FC<IManagePhotosWrapperProps> = ({
  caraCard,
}) => {
  const lp = useLaunchParams();

  const onUpdate = async (photos: FileModel[]) => {
    await updatePhotos(
      caraCard.id,
      photos.map((photo) => photo.id),
      getAuthorization(lp),
    );
  };

  const onRemove = async (photo: FileModel) => {
    await removeFileFromCar(caraCard.id, photo.id, getAuthorization(lp));
  };
  return (
    <ManagePhotos
      photos={caraCard.photos || []}
      onUpdate={onUpdate}
      onRemove={onRemove}
    />
  );
};
