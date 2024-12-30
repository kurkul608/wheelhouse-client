"use client";

import { useFormik } from "formik";
import { createCard, CreateCardDto } from "@/actions/manager/cars/createCard";
import {
  Button,
  ButtonCell,
  Cell,
  Input,
  List,
  Section,
  Select,
  Switch,
  Title,
} from "@telegram-apps/telegram-ui";
import { getAuthorization } from "@/utils/getAuthorization";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { IconAddCircle } from "@/components/Icons/AddCircle";
import { AddNewSpec } from "@/components/Manager/CarCard/Create/AddNewSpec";
import { SpecificationCreateDto } from "@/constants/specifications";
import { createSpecification } from "@/actions/manager/specifications/create";
import gearSvg from "@/app/_assets/gear.svg";
import Image from "next/image";

export interface RequiredSpecs {
  model: SpecificationCreateDto;
  specification: SpecificationCreateDto;
  specs: SpecificationCreateDto[];
}

type FormValues = CreateCardDto & RequiredSpecs;

export const ManagerCarCardCreate = () => {
  const lp = useLaunchParams();
  const formik = useFormik<FormValues>({
    initialValues: {
      description: "",
      currency: undefined,
      inStock: false,
      isActive: false,
      price: undefined,
      model: { field: "model", fieldName: "Модель", value: "" },
      specification: {
        field: "specification",
        fieldName: "Спецификация",
        value: "",
      },
      specs: [],
    },
    onSubmit: async ({ model, specification, ...values }) => {
      if (model.value && specification.value) {
        const card = await createCard(values, getAuthorization(lp));
        if (card.id) {
          await createSpecification(
            [{ ...model }, { ...specification }],
            card.id,
            getAuthorization(lp),
          );
        }
      }
    },
  });

  const addSpec = (dto: SpecificationCreateDto) => {
    formik.setFieldValue("specs", [...formik.values.specs, dto]);
  };

  console.log(formik.values);
  return (
    <form onSubmit={formik.handleSubmit}>
      <List style={{ backgroundColor: "var(--tgui--bg_color)" }}>
        <Title className={"mb-4"}>Созадние краточки автомобиля</Title>
        {/*<div*/}
        {/*  className={"flex justify-between items-center py-2 border-b-2 "}*/}
        {/*  style={{ borderColor: "var(--tgui--section_separator_color)" }}*/}
        {/*>*/}
        {/*  <label*/}
        {/*    htmlFor={"isActive"}*/}
        {/*    style={{ color: "var(--tgui--subtitle_text_color)" }}*/}
        {/*  >*/}
        {/*    Авто активен **/}
        {/*  </label>*/}
        {/*  <Switch*/}
        {/*    checked={formik.values.isActive}*/}
        {/*    onChange={formik.handleChange}*/}
        {/*    name={"isActive"}*/}
        {/*  />*/}
        {/*</div>*/}
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

      <List
        style={{
          background: "var(--tgui--secondary_bg_color)",
          padding: 10,
        }}
      >
        <Section header={"Характеристики авто"}>
          {formik.values.specs.map((spec) => (
            <Cell
              key={spec.field}
              before={
                <Image
                  src={gearSvg.src}
                  alt={"gearsvg"}
                  width={32}
                  height={32}
                />
              }
              subtitle={spec.value}
            >
              {spec.fieldName}
            </Cell>
          ))}
          <AddNewSpec
            trigger={
              <ButtonCell before={<IconAddCircle />}>
                Добавить новую характеристику
              </ButtonCell>
            }
            addSpec={addSpec}
            usedSpecKeys={formik.values.specs.map((spec) => spec.field)}
          />
        </Section>
      </List>
      <div className={"flex pt-4 justify-center items-center"}>
        <Button type={"submit"}>Сохранить </Button>
      </div>
    </form>
  );
};
