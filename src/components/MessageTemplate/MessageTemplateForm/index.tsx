"use client";

import { Form, Formik } from "formik";
import { SendToAdmin } from "../MessageTemplate/SendToAdmin";
import { Button, Input, Subheadline } from "@telegram-apps/telegram-ui";
import { TipTapTelegramMessage } from "../MessageTemplate/TipTapTelegramMessage";
import { MultiPhotoUpload } from "@/components/MultiPhotoUpload";
import { ManagePhotos } from "@/components/ManagePhotos";
import { CreateLink } from "../MessageTemplate/CreateLink";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { FileModel } from "@/models/file";
import {
  CarsWherePeriod,
  MessageLink,
  MessageTemplate,
} from "@/models/messageTemplate";
import { SelectOption } from "@/components/MultiSelectWithSearch";
import SingleSelectWithSearch from "@/components/SingleSelectWithSearch";
import { carWhereOptions as carWhereOptionsTemplate } from "@/constants/carWhereOptions";
import { CarWhereField } from "@/components/MessageTemplate/MessageTemplateForm/CarWhereField";
import { carStockOptions } from "@/constants/carStockOptions";
import { formatDateInClientTimeZone } from "@/utils/date";
import { carWhereDefaultPeriodOptions } from "@/constants/carWhereDefaultPeriodOptions";

export interface CreateMessageTemplateFormValues {
  name: string;
  description: string;
  photos: FileModel[];
  links: MessageLink[];
  carsWhere: SelectOption<unknown>;
  carsWhereDefaultPeriod: SelectOption<unknown>;
  carsWhereStock: SelectOption<unknown>;
  carsWherePeriodStart: string;
  carsWherePeriodEnd: string;
}
type IMessageTemplateFormProps = {
  onSubmit(values: CreateMessageTemplateFormValues): Promise<void>;
} & Partial<CreateMessageTemplateFormValues> & {
    template?: MessageTemplate;
  };

const carWhereOptions = [{ value: "", label: "-" }, ...carWhereOptionsTemplate];

export const MessageTemplateForm: FC<IMessageTemplateFormProps> = ({
  template = {},
  onSubmit,
}) => {
  const [isMessageTemplateLoading, setIsMessageTemplateLoading] =
    useState(false);
  const router = useRouter();

  const {
    carsWherePeriodEnd,
    carsWhereStock,
    carsWhere,
    carsWherePeriodStart,
    carsWhereDefaultPeriod,
    name,
    photos,
    links,
    text,
  } = template;

  return (
    <div className={"flex justify-center"} id={"create-message-template"}>
      <Formik
        initialValues={
          {
            name: name || "",
            description: text || "",
            photos: photos || [],
            links: links || [],
            carsWhere: carWhereOptions.find(
              (opt) => opt.value === (carsWhere ?? ""),
            ),
            carsWherePeriodStart: carsWherePeriodStart
              ? formatDateInClientTimeZone(
                  carsWherePeriodStart,
                  "YYYY-MM-DD HH:mm:ss",
                )
              : "",
            carsWherePeriodEnd: carsWherePeriodEnd
              ? formatDateInClientTimeZone(
                  carsWherePeriodEnd,
                  "YYYY-MM-DD HH:mm:ss",
                )
              : "",
            carsWhereStock: carsWhereStock
              ? carStockOptions.find((opt) => opt.value === carsWhereStock)
              : { value: "", label: "-" },
            carsWhereDefaultPeriod: carsWhereDefaultPeriod
              ? carWhereDefaultPeriodOptions.find(
                  (opt) => opt.value === carsWhereDefaultPeriod,
                )
              : carWhereDefaultPeriodOptions.find(
                  (opt) => opt.value === CarsWherePeriod.LAST_DAY,
                ),
          } as CreateMessageTemplateFormValues
        }
        onSubmit={async (values) => {
          if (values.description.length && values.name.length) {
            setIsMessageTemplateLoading(true);
            await onSubmit(values).then(() => {
              setIsMessageTemplateLoading(false);
              router.push("/admin/message/messageTemplate");
            });
          }
        }}
      >
        {({ handleChange, values, setFieldValue }) => (
          <Form className={"w-[85vw] h-[85vh]"}>
            <SendToAdmin />
            <Subheadline>Название шаблона</Subheadline>
            <Input
              className={"w-full"}
              id="name"
              name="name"
              placeholder={"Введите название шаблона"}
              value={values.name}
              onChange={handleChange}
            />

            <Subheadline className={"mt-2"}>Текст сообщения</Subheadline>
            <TipTapTelegramMessage
              editorContent={values.description}
              onChange={(value: string) => {
                setFieldValue("description", value);
              }}
            />
            <div className={"mt-2"}>
              <Subheadline>Фотографии для рассылки</Subheadline>
              <MultiPhotoUpload
                onUpload={async (file) => {
                  setFieldValue("photos", [...values.photos, file]);
                }}
              />
            </div>
            {values.photos.length ? (
              <div className={"mt-2"}>
                <Subheadline>Порядок фотографий</Subheadline>
                <ManagePhotos
                  onUpdate={async (newPhotos) => {
                    setFieldValue("photos", newPhotos);
                  }}
                  onRemove={async (photoForRemove) => {
                    setFieldValue(
                      "photos",
                      values.photos.filter(
                        (photo) => photo.id !== photoForRemove.id,
                      ),
                    );
                  }}
                  photos={values.photos}
                />
              </div>
            ) : null}

            <div className={"mt-2"}>
              <SingleSelectWithSearch
                isSearchable={false}
                defaultSelectedOption={values.carsWhere}
                options={carWhereOptions}
                onChange={(opt) => {
                  setFieldValue("carsWhere", opt);
                }}
                placeholder={"Прикрепить ссылки на авто"}
                head={
                  <Subheadline className={"px-[22px]"}>
                    Прикрепить ссылки на авто
                  </Subheadline>
                }
              />
            </div>
            <CarWhereField />

            <CreateLink />
            <div className={"flex justify-start w-full mt-2"}>
              <Button
                type={"submit"}
                disabled={!values.description.length || !values.name.length}
                loading={isMessageTemplateLoading}
              >
                Сохранить шаблон
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
