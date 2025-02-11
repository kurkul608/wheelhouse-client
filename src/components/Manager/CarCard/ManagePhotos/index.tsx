"use client";

import { Button, Cell } from "@telegram-apps/telegram-ui";
import Image from "next/image";
import { File as FileModel } from "@/models/file";
import { FC, useState } from "react";
import { getFileLink } from "@/utils/getFileLink";
import { removeFileFromCar } from "@/actions/manager/cars/removeFileFromCarCard";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { getAuthorization } from "@/utils/getAuthorization";
import { useRouter } from "next/navigation";

interface ManagePhotosProps {
  photos: FileModel[];
  carId: string;
}

export const ManagePhotos: FC<ManagePhotosProps> = ({ photos, carId }) => {
  const [loading, setLoading] = useState(false);
  const lp = useLaunchParams();
  const router = useRouter();

  return photos.map((photo) => {
    return (
      <Cell
        key={photo.id}
        before={
          <Image
            src={getFileLink(photo)}
            alt={photo.key}
            width={100}
            height={100}
            style={{ objectFit: "cover", borderRadius: "8px" }}
            onLoad={() => URL.revokeObjectURL(getFileLink(photo))}
            unoptimized
          />
        }
        subtitle={`${photo.file_size} bytes`}
        after={
          <Button
            loading={loading}
            mode={"bezeled"}
            onClick={async () => {
              if (!loading) {
                setLoading(true);
                await removeFileFromCar(carId, photo.id, getAuthorization(lp));
                setLoading(false);
                router.refresh();
              }
            }}
            type={"button"}
          >
            Удалить
          </Button>
        }
      >
        {photo.key}
      </Cell>
    );
  });
};
