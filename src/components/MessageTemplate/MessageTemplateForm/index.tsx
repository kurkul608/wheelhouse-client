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
import { MessageLink } from "@/models/messageTemplate";

export interface CreateMessageTemplateFormValues {
  name: string;
  description: string;
  photos: FileModel[];
  links: MessageLink[];
}
type IMessageTemplateFormProps = {
  onSubmit(values: CreateMessageTemplateFormValues): Promise<void>;
} & Partial<CreateMessageTemplateFormValues>;

export const MessageTemplateForm: FC<IMessageTemplateFormProps> = ({
  name,
  photos,
  links,
  description,
  onSubmit,
}) => {
  const [isMessageTemplateLoading, setIsMessageTemplateLoading] =
    useState(false);
  const router = useRouter();

  return (
    <div className={"flex justify-center"} id={"create-message-template"}>
      <Formik
        initialValues={
          {
            name: name || "",
            description: description || "",
            photos: photos || [],
            links: links || [],
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
