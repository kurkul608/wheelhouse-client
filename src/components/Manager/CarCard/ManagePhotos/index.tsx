"use client";

import { Button, Cell, Spinner } from "@telegram-apps/telegram-ui";
import Image from "next/image";
import { File as FileModel } from "@/models/file";
import { FC, useEffect, useState } from "react";
import { getFileLink } from "@/utils/getFileLink";
import { removeFileFromCar } from "@/actions/manager/cars/removeFileFromCarCard";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { getAuthorization } from "@/utils/getAuthorization";
import { useRouter } from "next/navigation";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { updatePhotos } from "@/actions/manager/cars/updatePhotos";

interface ManagePhotosProps {
  photos: FileModel[];
  carId: string;
}

export const ManagePhotos: FC<ManagePhotosProps> = ({ photos, carId }) => {
  console.log(photos);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isUpdatingOrder, setIsUpdatingOrder] = useState(false);
  const [photoOrder, setPhotoOrder] = useState(photos);
  const lp = useLaunchParams();
  const router = useRouter();

  useEffect(() => {
    setPhotoOrder(photos);
  }, [photos]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = photoOrder.findIndex((photo) => photo.id === active.id);
      const newIndex = photoOrder.findIndex((photo) => photo.id === over.id);
      const newOrder = arrayMove(photoOrder, oldIndex, newIndex);
      setPhotoOrder(newOrder);
      setIsUpdatingOrder(true);
      console.log(newOrder.map((photo) => photo.id));
      await updatePhotos(
        carId,
        newOrder.map((photo) => photo.id),
        getAuthorization(lp),
      );
      setIsUpdatingOrder(false);
      router.refresh();
    }
  };

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  return (
    <div style={{ position: "relative" }}>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <SortableContext
          items={photoOrder.map((photo) => photo.id)}
          strategy={verticalListSortingStrategy}
        >
          {photoOrder.map((photo) => (
            <SortablePhoto
              key={photo.id}
              photo={photo}
              disabled={deleteLoading || isUpdatingOrder}
              onDelete={async () => {
                if (!deleteLoading) {
                  setDeleteLoading(true);
                  await removeFileFromCar(
                    carId,
                    photo.id,
                    getAuthorization(lp),
                  );
                  setDeleteLoading(false);
                  router.refresh();
                }
              }}
            />
          ))}
        </SortableContext>
      </DndContext>

      {isUpdatingOrder && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(255,255,255,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
          }}
        >
          <Spinner size="l" />
        </div>
      )}
    </div>
  );
};

interface SortablePhotoProps {
  photo: FileModel;
  disabled: boolean;
  onDelete: () => void;
}

const SortablePhoto: FC<SortablePhotoProps> = ({
  photo,
  disabled,
  onDelete,
}) => {
  // Хук для реализации сортировки
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: photo.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    filter: disabled ? "blur(2px)" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
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
            loading={disabled}
            mode="bezeled"
            onMouseDown={(e) => {
              console.log("in onMouseDown");
              e.stopPropagation();
              onDelete();
            }}
            onTouchStart={(e) => {
              console.log("In onTouchStart");
              e.stopPropagation();
              onDelete();
            }}
            onClick={(event) => {
              event.stopPropagation();
              onDelete();
            }}
            type="button"
            className={"z-10"}
          >
            Удалить
          </Button>
        }
      >
        {photo.key}
      </Cell>
    </div>
  );
};
