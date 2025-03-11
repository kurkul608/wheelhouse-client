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
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
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
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [isUpdatingOrder, setIsUpdatingOrder] = useState(false);
  const [photoOrder, setPhotoOrder] = useState(photos);
  const lp = useLaunchParams();
  const router = useRouter();

  useEffect(() => {
    setPhotoOrder(photos);
  }, [photos]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    }),
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = photoOrder.findIndex((photo) => photo.id === active.id);
      const newIndex = photoOrder.findIndex((photo) => photo.id === over.id);
      const newOrder = arrayMove(photoOrder, oldIndex, newIndex);
      setPhotoOrder(newOrder);
      setIsUpdatingOrder(true);
      await updatePhotos(
        carId,
        newOrder.map((photo) => photo.id),
        getAuthorization(lp),
      );
      setIsUpdatingOrder(false);
      router.refresh();
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
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
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id: photo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: "none",
    filter: disabled ? "blur(2px)" : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Cell
        key={photo.id}
        before={
          <div
            ref={setActivatorNodeRef}
            {...listeners}
            {...attributes}
            style={{ display: "inline-block", cursor: "grab" }}
          >
            <Image
              src={getFileLink(photo)}
              alt={photo.key}
              width={100}
              height={100}
              style={{ objectFit: "cover", borderRadius: "8px" }}
              onLoad={() => URL.revokeObjectURL(getFileLink(photo))}
              unoptimized
            />
          </div>
        }
        subtitle={`${photo.file_size} bytes`}
        after={
          <Button
            loading={disabled}
            mode="bezeled"
            onMouseDown={(e) => {
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
