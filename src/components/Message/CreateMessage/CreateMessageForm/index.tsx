"use client";

import { SelectOption } from "@/components/MultiSelectWithSearch";
import {
  Button,
  Headline,
  Input,
  Subheadline,
} from "@telegram-apps/telegram-ui";
import { Form, Formik } from "formik";
import { FC } from "react";
import { MessageTemplate } from "@/models/messageTemplate";
import SingleSelectWithSearch from "@/components/SingleSelectWithSearch";
import { MultiValue } from "react-select";
import { whereOptions } from "@/constants/whereUserOptions";
import { OptionalMessages } from "@/components/Message/CreateMessage/CreateMessageForm/OptionalMessages";

interface IProps {
  templates: MessageTemplate[];
}

export interface CreateMessageFormValues {
  template: null | SelectOption<unknown>;
  name: string;
  whereUser: null | SelectOption<unknown>;
  countAutoInWishlist: null | number;
  countOrders: null | number;
  specialCarBrand: null | SelectOption<unknown>;
  manySpecialCarBrand: MultiValue<SelectOption<unknown>>;
  orderOnBrand: null | SelectOption<unknown>;
  manyOrderOnBrand: MultiValue<SelectOption<unknown>>;
}

export const CreateMessageForm: FC<IProps> = ({ templates }) => {
  return (
    <Formik
      initialValues={
        {
          template: null,
          name: "",
          whereUser: null,
          countAutoInWishlist: null,
          specialCarBrand: null,
          countOrders: null,
          manySpecialCarBrand: [],
          orderOnBrand: null,
          manyOrderOnBrand: [],
        } as CreateMessageFormValues
      }
      // validate={(values) => {
      //   const errors = {};
      //   if (values.token.length < 5) {
      //     errors.token = "Invalid code. Too short.";
      //   }
      //   return errors;
      // }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 1000);
      }}
    >
      {({ values, handleChange, setFieldValue }) => (
        <Form className={"w-[85vw] h-[85vh]"}>
          <Headline>Создание рассылки</Headline>
          <div className={"mt-2"}>
            <Subheadline className={"px-[22px]"}>Название рассылки</Subheadline>
            <Input
              className={"w-full"}
              id={"name"}
              name={"name"}
              placeholder={"Название для рассылки"}
              value={values.name}
              onChange={handleChange}
            />
          </div>
          <div className={"mt-2"}>
            <SingleSelectWithSearch
              isSearchable={false}
              options={templates.map((mt) => ({
                value: mt.id,
                label: mt.name,
              }))}
              onChange={(newOptions) => {
                setFieldValue("template", newOptions);
              }}
              head={
                <Subheadline className={"px-[22px]"}>
                  Шаблон сообщения
                </Subheadline>
              }
              placeholder={"Выбрать шаблон сообщения"}
              defaultSelectedOption={values.template}
              targetPortalId={"create-message"}
            />
          </div>
          <div className={"mt-2"}>
            <SingleSelectWithSearch
              isSearchable={false}
              options={whereOptions as SelectOption<unknown>[]}
              onChange={(newOptions) => {
                setFieldValue("whereUser", newOptions);
              }}
              head={
                <Subheadline className={"px-[22px]"}>
                  Фильтр пользователей
                </Subheadline>
              }
              placeholder={"Выбрать фильтр по пользователям"}
              defaultSelectedOption={values.whereUser}
              targetPortalId={"create-message"}
            />
          </div>
          <OptionalMessages />
          <div className={"mt-2 w-full flex justify-center"}>
            <Button type={"submit"}>Сохарнить рассылку</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
