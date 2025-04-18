"use client";

import { SelectOption } from "@/components/MultiSelectWithSearch";
import {
  Button,
  Cell,
  Checkbox,
  Headline,
  Input,
  Subheadline,
  Switch,
} from "@telegram-apps/telegram-ui";
import { Form, Formik } from "formik";
import { FC, useState } from "react";
import { MessageTemplate } from "@/models/messageTemplate";
import SingleSelectWithSearch from "@/components/SingleSelectWithSearch";
import { MultiValue } from "react-select";
import { whereOptions } from "@/constants/whereUserOptions";
import { Message, MessageStatus, MessageType } from "@/models/message";
import { useRouter } from "next/navigation";
import { OptionalMessages } from "@/components/Message/MessageForm/OptionalMessages";
import { DateMessage } from "@/components/Message/MessageForm/DateMessage";
import { CAR_BRANDS_FILTER_OPTIONS } from "@/constants/carBrandsFilterOptions";
import { formatDateInClientTimeZone } from "@/utils/date";
import { messageTypeOptions } from "@/constants/messageTypeOptions";
import { classNames } from "@telegram-apps/sdk-react";
import { messagePeriodTypeOptions } from "@/constants/messagePeriodTypeOptions";
import { PeriodMessage } from "@/components/Message/MessageForm/PeriodMessage";
import * as Yup from "yup";

interface IProps {
  templates: MessageTemplate[];
  existMessage?: Message;
  onSubmit: (values: MessageFormValues) => Promise<void>;
}

export interface MessageFormValues {
  template: null | SelectOption<unknown>;
  type: null | SelectOption<unknown>;
  name: string;
  status: "on" | "off";
  whereUser: null | SelectOption<unknown>;
  countAutoInWishlist: null | number;
  countOrders: null | number;
  startTime: null | string;
  manySpecialCarBrand: MultiValue<SelectOption<unknown>>;
  manyOrderOnBrand: MultiValue<SelectOption<unknown>>;
  periodType: null | SelectOption<unknown>;
  isSentImmediately?: boolean;
}

export const MessageForm: FC<IProps> = ({
  templates,
  existMessage,
  onSubmit,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
    type:
      existMessage && existMessage.type
        ? messageTypeOptions.find((opt) => opt.value === existMessage.type)!
        : null,
    name: existMessage ? existMessage.name : "",
    status: existMessage?.status === MessageStatus.ACTIVE ? "on" : "off",
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
      existMessage && existMessage.startTime
        ? formatDateInClientTimeZone(
            existMessage.startTime,
            "YYYY-MM-DD HH:mm:ss",
          )
        : null,
    isSentImmediately: false,
    periodType:
      existMessage && existMessage.periodType
        ? messagePeriodTypeOptions.find(
            (opt) => opt.value === existMessage.periodType,
          )!
        : null,
  };

  const messageFormValidationSchema = Yup.object().shape({
    template: Yup.object().nullable().required("Template is required"),

    type: Yup.object().nullable().required("MessageType is required"),

    name: Yup.string().required("Name is required"),

    whereUser: Yup.object().nullable().required("WhereUser is required"),

    countAutoInWishlist: Yup.number().nullable(),
    countOrders: Yup.number().nullable(),

    startTime: Yup.string()
      .nullable()
      .when("type", {
        is: (val: SelectOption<unknown>) => val?.value === MessageType.PERIOD,
        then: (s) => s.required("startTime is required"),
      }),

    manySpecialCarBrand: Yup.array(),
    manyOrderOnBrand: Yup.array(),

    periodType: Yup.object()
      .nullable()
      .when("type", {
        is: (val: SelectOption<unknown>) => val?.value === MessageType.PERIOD,
        then: (s) => s.required("periodType is required"),
      }),

    isSentImmediately: Yup.boolean(),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={messageFormValidationSchema}
      onSubmit={async (values) => {
        setIsLoading(true);

        await onSubmit(values).then(() => {
          router.push("/admin/message/list");
        });
        setIsLoading(false);
      }}
    >
      {({ values, handleChange, setFieldValue, touched, errors }) => (
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
            {touched.name && errors.name && (
              <div style={{ color: "red" }}>{errors.name}</div>
            )}
          </div>
          <div className={"mt-2"}>
            <SingleSelectWithSearch
              isSearchable={false}
              options={templatesOptions}
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
              name={"template"}
            />
            {touched.template && errors.template && (
              <div style={{ color: "red" }}>{errors.template}</div>
            )}
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
              name={"whereUser"}
            />
            {touched.whereUser && errors.whereUser && (
              <div style={{ color: "red" }}>{errors.whereUser}</div>
            )}
          </div>
          <OptionalMessages />
          <div className={"mt-2"}>
            <SingleSelectWithSearch
              isSearchable={false}
              options={messageTypeOptions as SelectOption<unknown>[]}
              onChange={(newOptions) => {
                setFieldValue("type", newOptions);
              }}
              head={
                <Subheadline className={"px-[22px]"}>Тип рассылки</Subheadline>
              }
              placeholder={"Выбрать типа рассылки"}
              defaultSelectedOption={values.type}
              targetPortalId={"create-message"}
              name={"type"}
            />
            {touched.type && errors.type && (
              <div style={{ color: "red" }}>{errors.type}</div>
            )}
          </div>
          <PeriodMessage />
          <div
            className={classNames("mt-2", {
              hidden: values.type?.value === MessageType.PERIOD,
            })}
          >
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
            {touched.isSentImmediately && errors.isSentImmediately && (
              <div style={{ color: "red" }}>{errors.isSentImmediately}</div>
            )}
          </div>
          <div className={"mt-2"}>
            <Cell
              after={
                <Switch
                  defaultChecked={values.status === "on"}
                  value={values.status}
                  name={"status"}
                  onClick={async () => {
                    await setFieldValue(
                      "status",
                      values.status === "on" ? "off" : "on",
                    );
                  }}
                />
              }
            >
              Активная рассылка
            </Cell>
          </div>
          <DateMessage />
          <div className={"mt-2 w-full flex justify-center"}>
            <Button
              type={"submit"}
              loading={isLoading}
              // disabled={!isCanBeCreated(values)}
            >
              Сохарнить
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
