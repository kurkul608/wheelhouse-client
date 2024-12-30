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
import gearSvg from "@/app/_assets/gear.svg";
import Image from "next/image";
import { IconAddCircle } from "@/components/Icons/AddCircle";
import { AddNewSpec } from "@/components/Manager/CarCard/Create/AddNewSpec";

export const ManagerCarCardCreate = () => {
  const lp = useLaunchParams();
  const formik = useFormik<CreateCardDto>({
    initialValues: {
      description: "",
      currency: undefined,
      inStock: false,
      isActive: false,
      price: undefined,
    },
    onSubmit: async (values) => {
      await createCard(values, getAuthorization(lp));
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={"px-[10px] py-[8px]"}
      style={{ backgroundColor: "var(--tgui--bg_color)" }}
    >
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
          htmlFor={"isActive"}
          style={{ color: "var(--tgui--subtitle_text_color)" }}
        >
          Цена авто
        </label>
        <Input
          defaultValue={formik.values.price}
          value={formik.values.price}
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
      <div className={"flex pt-4 justify-center items-center"}>
        <Button type={"submit"}>Сохранить </Button>
      </div>
      <List
        style={{
          background: "var(--tgui--secondary_bg_color)",
          padding: 10,
        }}
      >
        <Section>
          {/*<Cell*/}
          {/*  before={*/}
          {/*    <Image src={gearSvg.src} alt={"gearsvg"} width={32} height={32} />*/}
          {/*  }*/}
          {/*  subtitle="Manage ads and payment settings"*/}
          {/*>*/}
          {/*  My Ads*/}
          {/*</Cell>*/}
          <AddNewSpec
            trigger={
              <ButtonCell before={<IconAddCircle />}>
                Добавить новую характеристику
              </ButtonCell>
            }
          />
        </Section>
      </List>
    </form>
  );
};
