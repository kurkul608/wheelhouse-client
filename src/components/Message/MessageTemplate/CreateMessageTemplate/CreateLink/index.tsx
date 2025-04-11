"use client";

import { useFormikContext } from "formik";
import { CreateMessageTemplateFormValues } from "@/components/Message/MessageTemplate/CreateMessageTemplate";
import { Button, Cell, Input, Subheadline } from "@telegram-apps/telegram-ui";
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
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";

export const CreateLink = () => {
  const { values, setFieldValue } =
    useFormikContext<CreateMessageTemplateFormValues>();
  const [isUpdatingOrder, setIsUpdatingOrder] = useState(false);
  const [link, setLink] = useState("");
  // const router = useRouter();

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = values.links.findIndex((link) => link === active.id);
      const newIndex = values.links.findIndex((link) => link === over.id);
      const newOrder = arrayMove(values.links, oldIndex, newIndex);
      await setFieldValue("links", newOrder);
      setIsUpdatingOrder(true);
      // await onUpdate(newOrder);
      setIsUpdatingOrder(false);
      // router.refresh();
    }
  };

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  const onDelete = async (linkForDelete: string) => {
    await setFieldValue(
      "links",
      values.links.filter((link) => link !== linkForDelete),
    );
  };

  const onAdd = async () => {
    await setFieldValue("links", [...values.links, link]);
    setLink("");
  };

  return (
    <div className={"mt-2"}>
      <Subheadline>Ссылки к сообщению</Subheadline>
      <div className={"relative"}>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <SortableContext
            items={values.links.map((link) => link)}
            strategy={verticalListSortingStrategy}
          >
            {values.links.map((link) => (
              <Cell
                key={link}
                after={
                  <Button
                    onMouseDown={(e) => {
                      console.log("in onMouseDown");
                      e.stopPropagation();
                      onDelete(link);
                    }}
                    onTouchStart={(e) => {
                      console.log("In onTouchStart");
                      e.stopPropagation();
                      onDelete(link);
                    }}
                    onClick={(event) => {
                      event.stopPropagation();
                      onDelete(link);
                    }}
                  >
                    Удалить
                  </Button>
                }
              >
                {link}
              </Cell>
            ))}
          </SortableContext>
        </DndContext>
      </div>
      <div className={"flex"}>
        <Input value={link} onChange={(event) => setLink(event.target.value)} />
        <Button onClick={onAdd} loading={isUpdatingOrder}>
          Добавить
        </Button>
      </div>
    </div>
  );
};
