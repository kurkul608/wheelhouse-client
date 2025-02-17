"use client";

import {
  Button,
  Input,
  List,
  Select,
  Switch,
  Title,
} from "@telegram-apps/telegram-ui";
import { useFormik } from "formik";
import { SpecificationCreateDto } from "@/constants/specifications";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { createCard, CreateCardDto } from "@/actions/manager/cars/createCard";
import { getAuthorization } from "@/utils/getAuthorization";
import { useRouter } from "next/navigation";
import { createSpecification } from "@/actions/manager/specifications/create";
import { useState } from "react";

export interface RequiredSpecs {
  model: SpecificationCreateDto;
  specification: SpecificationCreateDto;
}

type FormValues = CreateCardDto & RequiredSpecs;

export const CreateAuto = ({}: { toNextStage(carId: string): void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const lp = useLaunchParams();
  const router = useRouter();
  const formik = useFormik<FormValues>({
    initialValues: {
      description: "",
      currency: undefined,
      inStock: false,
      isActive: false,
      price: undefined,
      model: { field: "model", fieldName: "Модель", value: "", carCardId: "" },
      specification: {
        field: "specification",
        fieldName: "Спецификация",
        value: "",
        carCardId: "",
      },
    },
    onSubmit: async ({ model, specification, ...values }) => {
      if (model.value && specification.value && !isLoading) {
        setIsLoading(true);
        const card = await createCard(values, getAuthorization(lp));
        if (card.id) {
          await createSpecification(
            { ...model, carCardId: card.id },
            getAuthorization(lp),
          );
          await createSpecification(
            { ...specification, carCardId: card.id },
            getAuthorization(lp),
          );
          setIsLoading(false);

          router.push(`/manager/cars/${card.id}`);
        }
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <List style={{ backgroundColor: "var(--tgui--bg_color)" }}>
        <Title className={"mb-4"}>Созадние краточки автомобиля</Title>
        <div
          className={"flex justify-between items-center py-2 border-b-2 "}
          style={{ borderColor: "var(--tgui--section_separator_color)" }}
        >
          <label
            htmlFor={"isActive"}
            style={{ color: "var(--tgui--subtitle_text_color)" }}
          >
            Авто в наличии *
          </label>
          <Switch
            checked={formik.values.inStock}
            onChange={formik.handleChange}
            name={"inStock"}
          />
        </div>
        <div
          className={"flex justify-between items-center py-2 border-b-2 "}
          style={{ borderColor: "var(--tgui--section_separator_color)" }}
        >
          <label
            htmlFor={"price"}
            style={{ color: "var(--tgui--subtitle_text_color)" }}
          >
            Цена авто
          </label>
          <Input
            type="text"
            pattern="[0-9]*"
            inputMode="numeric"
            value={formik.values.price ?? ""}
            onChange={formik.handleChange}
            name={"price"}
            header="Цена авто"
            placeholder="Введите цену авто"
          />
        </div>
        <div
          className={"flex justify-between items-center py-2 border-b-2 "}
          style={{ borderColor: "var(--tgui--section_separator_color)" }}
        >
          <label
            htmlFor={"isActive"}
            style={{ color: "var(--tgui--subtitle_text_color)" }}
          >
            Валюта
          </label>
          <Select
            value={formik.values.currency}
            onChange={formik.handleChange}
            name={"currency"}
          >
            <option value={undefined}>-</option>
            <option value={"USD"}>USD</option>
            <option value={"EUR"}>EUR</option>
            <option value={"RUB"}>RUB</option>
            <option value={"BYN"}>BYN</option>
            <option value={"UAH"}>UAH</option>
            <option value={"GBP"}>GBP</option>
            <option value={"CNY"}>CNY</option>
            <option value={"KZT"}>KZT</option>
            <option value={"UZS"}>UZS</option>
            <option value={"GEL"}>GEL</option>
            <option value={"TRY"}>TRY</option>
            <option value={"AMD"}>AMD</option>
            <option value={"THB"}>THB</option>
            <option value={"INR"}>INR</option>
            <option value={"BRL"}>BRL</option>
            <option value={"IDR"}>IDR</option>
            <option value={"AZN"}>AZN</option>
            <option value={"AED"}>AED</option>
            <option value={"PLN"}>PLN</option>
            <option value={"ILS"}>ILS</option>
          </Select>
        </div>
        <div
          className={"flex justify-between items-center py-2 border-b-2 "}
          style={{ borderColor: "var(--tgui--section_separator_color)" }}
        >
          <label
            htmlFor={"model.value"}
            style={{ color: "var(--tgui--subtitle_text_color)" }}
          >
            Модель авто *
          </label>
          <Input
            type="text"
            value={formik.values.model.value ?? ""}
            onChange={formik.handleChange}
            name={"model.value"}
            header="Модель авто"
            placeholder="Mercedes-Benz BRABUS"
          />
        </div>
        <div
          className={"flex justify-between items-center py-2 border-b-2 "}
          style={{ borderColor: "var(--tgui--section_separator_color)" }}
        >
          <label
            htmlFor={"specification.value"}
            style={{ color: "var(--tgui--subtitle_text_color)" }}
          >
            Спецификация авто *
          </label>
          <Input
            type="text"
            value={formik.values.specification.value ?? ""}
            onChange={formik.handleChange}
            name={"specification.value"}
            header="Спецификация"
            placeholder="G 63 B700"
          />
        </div>
      </List>
      <div className={"flex pt-4 justify-center items-center"}>
        <Button type={"submit"} loading={isLoading}>
          Перейти к следующему этапу
        </Button>
      </div>
    </form>
  );
};
