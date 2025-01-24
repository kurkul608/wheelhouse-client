"use client";

import { FC, useState } from "react";
import { Button, Headline, Input, Select } from "@telegram-apps/telegram-ui";
import { SPECIFICATIONS_TEMPLATE } from "@/constants/specifications";
import { createSpecification } from "@/actions/manager/specifications/create";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { getAuthorization } from "@/utils/getAuthorization";
import { useRouter } from "next/navigation";
import { CarCardSpecifications } from "@/models/carCardSpecification";

interface AddNewSpecProps {
  carCardId: string;
  specifications: CarCardSpecifications[];
}
export const AddNewSpec: FC<AddNewSpecProps> = ({
  carCardId,
  specifications,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [field, setField] = useState<null | string>(null);
  const [value, setValue] = useState<null | string>(null);

  const lp = useLaunchParams();
  const router = useRouter();

  const buttonClickHandler = async () => {
    if (isLoading) {
      return;
    }
    if (!showForm) {
      setShowForm(true);
      return;
    }
    if (value && field) {
      setIsLoading(true);
      await createSpecification(
        {
          value,
          fieldName:
            SPECIFICATIONS_TEMPLATE.find((spec) => spec.field === field)
              ?.fieldName || "",
          carCardId,
          field,
        },
        getAuthorization(lp),
      );
      setShowForm(false);
      setIsLoading(false);
      setField(null);
      setValue("");
      router.refresh();
    }
  };

  return (
    <div>
      {showForm && (
        <>
          <Headline>Характеристика авто</Headline>
          <Select
            header="Характеристика авто"
            onChange={(event) => {
              setField(event.target.value);
            }}
            value={field || undefined}
          >
            <option>-</option>
            {SPECIFICATIONS_TEMPLATE.filter(
              (defaultSpec) =>
                !specifications.some(
                  (spec) => spec.field === defaultSpec.field,
                ),
            ).map((spec) => (
              <option value={spec.field} key={spec.field}>
                {spec.fieldName}
              </option>
            ))}
          </Select>
          <Headline>Значение характеристики</Headline>
          <Input
            placeholder={"Введите значение характеристики"}
            className={"mb-1"}
            value={value || ""}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          />
        </>
      )}
      <Button
        type={"button"}
        onClick={buttonClickHandler}
        disabled={(showForm ? !value && !field : false) || isLoading}
      >
        {showForm ? "Сохранить" : "Добавить новую характеристику"}
      </Button>
    </div>
  );
};
