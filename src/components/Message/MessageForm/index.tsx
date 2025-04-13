"use client";

import { SelectOption } from "@/components/MultiSelectWithSearch";
import {
  Button,
  Cell,
  Checkbox,
  Headline,
  Input,
  Subheadline,
} from "@telegram-apps/telegram-ui";
import { Form, Formik } from "formik";
import { FC, useState } from "react";
import { MessageTemplate } from "@/models/messageTemplate";
import SingleSelectWithSearch from "@/components/SingleSelectWithSearch";
import { MultiValue } from "react-select";
import { whereOptions } from "@/constants/whereUserOptions";
import { Message, MessageType } from "@/models/message";
import { useRouter } from "next/navigation";
import { OptionalMessages } from "@/components/Message/MessageForm/OptionalMessages";
import { DateMessage } from "@/components/Message/MessageForm/DateMessage";
import { CAR_BRANDS_FILTER_OPTIONS } from "@/constants/carBrandsFilterOptions";

interface IProps {
  templates: MessageTemplate[];
  existMessage?: Message;
  onSubmit: (values: MessageFormValues) => Promise<void>;
}

export interface MessageFormValues {
  template: null | SelectOption<unknown>;
  type: null | SelectOption<unknown>;
  name: string;
  whereUser: null | SelectOption<unknown>;
  countAutoInWishlist: null | number;
  countOrders: null | number;
  startTime: null | string;
  manySpecialCarBrand: MultiValue<SelectOption<unknown>>;
  manyOrderOnBrand: MultiValue<SelectOption<unknown>>;
  // isSentImmediately?: "on" | "off";
  isSentImmediately?: boolean;
}

export const MessageForm: FC<IProps> = ({
  templates,
  existMessage,
  onSubmit,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const isCanBeCreated = (values: MessageFormValues) => {
    return (
      values.template?.value &&
      values.name &&
      // values.type?.value &&
      values.whereUser?.value &&
      !isLoading
    );
  };

  const templatesOptions = templates.map((mt) => ({
    value: mt.id,
    label: mt.name,
  }));

  const initialValues: MessageFormValues = {
    template: existMessage
      ? templatesOptions.find(
          (templateOption) =>
            templateOption.value === existMessage.messageTemplateId,
        )!
      : null,
    type: { value: MessageType.ONCE, label: "Разовая рассылка" },
    name: existMessage ? existMessage.name : "",
    whereUser: existMessage
      ? whereOptions.find((opt) => opt.value === existMessage.usersWhere)!
      : null,
    countAutoInWishlist:
      existMessage && existMessage.countAutoInWishlist
        ? existMessage.countAutoInWishlist
        : null,
    countOrders:
      existMessage && existMessage.countOrders
        ? existMessage.countOrders
        : null,
    manySpecialCarBrand:
      existMessage && existMessage.brandsAutoInWishlist
        ? CAR_BRANDS_FILTER_OPTIONS.filter((opt) =>
            existMessage.brandsAutoInWishlist?.some(
              (autoBrand) => autoBrand === opt.value,
            ),
          )
        : [],
    manyOrderOnBrand:
      existMessage && existMessage.brandsAutoInOrders
        ? CAR_BRANDS_FILTER_OPTIONS.filter((opt) =>
            existMessage.brandsAutoInOrders?.some(
              (autoBrand) => autoBrand === opt.value,
            ),
          )
        : [],
    startTime:
      existMessage && existMessage.startTime ? existMessage.startTime : null,
    isSentImmediately: false,
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        if (isCanBeCreated(values)) {
          setIsLoading(true);
          await onSubmit(values).then(() => {
            router.push("/admin/message/list");
          });
          setIsLoading(false);
        }
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
              options={templatesOptions}
              onChange={(newOptions) => {
                console.log("in tamplate change");
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
          <div className={"mt-2 hidden"}>
            <SingleSelectWithSearch
              isSearchable={false}
              options={
                [
                  { value: MessageType.ONCE, label: "Разовая рассылка" },
                  { value: MessageType.PERIOD, label: "Рассылка с периодом" },
                ] as SelectOption<unknown>[]
              }
              onChange={(newOptions) => {
                setFieldValue("type", newOptions);
              }}
              head={
                <Subheadline className={"px-[22px]"}>Тип рассылки</Subheadline>
              }
              placeholder={"Выбрать типа рассылки"}
              defaultSelectedOption={values.type}
              targetPortalId={"create-message"}
            />
          </div>
          <div className={"mt-2"}>
            <Cell
              Component="label"
              before={
                <Checkbox
                  name="checkbox"
                  indeterminate={values.isSentImmediately}
                  onChange={() => {
                    setFieldValue(
                      "isSentImmediately",
                      !values.isSentImmediately,
                    );
                  }}
                />
              }
              description="Поставьте галочку, если хотите отправить рассылку сразу после сохранения"
              multiline
            >
              Отправка
            </Cell>
          </div>
          <DateMessage />
          <div className={"mt-2 w-full flex justify-center"}>
            <Button
              type={"submit"}
              loading={isLoading}
              disabled={!isCanBeCreated(values)}
            >
              Сохарнить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
