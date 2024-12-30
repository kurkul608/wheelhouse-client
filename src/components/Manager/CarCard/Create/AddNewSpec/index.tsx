"use client";

import { ReactNode, useState } from "react";
import { Button, Input, Modal, Select } from "@telegram-apps/telegram-ui";
import {
  SpecificationCreateDto,
  SPECIFICATIONS_TEMPLATE,
} from "@/constants/specifications";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import { ModalClose } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalClose/ModalClose";

export const AddNewSpec = ({
  trigger,
  addSpec,
  usedSpecKeys,
}: {
  trigger: ReactNode;
  addSpec(dto: SpecificationCreateDto): void;
  usedSpecKeys: string[];
}) => {
  const [field, setField] = useState<string>("");
  const [value, setValue] = useState<string>("");

  return (
    <Modal
      // header={"Добавить новую характеристику"}
      trigger={trigger}
      className={"min-h-[90vh]"}
    >
      <ModalHeader>Добавить новую характеристику</ModalHeader>
      <Select
        title={"Выберите тип характеристики"}
        onChange={(e) => {
          const field = e.target.value;
          setField(field);
        }}
      >
        {SPECIFICATIONS_TEMPLATE.filter(
          (spec) => !usedSpecKeys.some((key) => spec.field === key),
        ).map((spec) => (
          <option value={spec.field} key={spec.field}>
            {spec.fieldName}
          </option>
        ))}
      </Select>
      <Input
        placeholder={"Введите значение характеристики"}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
      <div className={"flex justify-center items-center mt-4"}>
        <ModalClose>
          <Button
            type={"button"}
            onClick={() => {
              addSpec({
                field,
                value,
                fieldName: SPECIFICATIONS_TEMPLATE.find(
                  (spec) => spec.field === field,
                )?.fieldName as string,
              });
            }}
          >
            Добавить характеристику
          </Button>
        </ModalClose>
      </div>
    </Modal>
  );
};
