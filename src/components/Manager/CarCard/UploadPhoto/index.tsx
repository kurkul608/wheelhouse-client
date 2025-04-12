"use client";

import { useLaunchParams } from "@telegram-apps/sdk-react";
import { FileModel } from "@/models/file";
import { AxiosHeaders } from "axios";
import { addToCarCard } from "@/actions/file/addToCarCard";
import { MultiPhotoUpload } from "@/components/MultiPhotoUpload";
import { getAuthorization } from "@/utils/getAuthorization";
import { FC } from "react";
import { CarCard } from "@/models/carCard";

export const UploadPhoto: FC<{ carCard: CarCard }> = ({ carCard }) => {
  const lp = useLaunchParams();

  const onUpload = async (uploadedFile: FileModel) => {
    await addToCarCard(
      uploadedFile.id,
      carCard.id,
      getAuthorization(lp) as AxiosHeaders,
    );
  };

  return <MultiPhotoUpload onUpload={onUpload} />;
};
