"use client";

import { Button, Input, Subheadline } from "@telegram-apps/telegram-ui";
import { useState } from "react";
import { Form, Formik } from "formik";
import { TipTapTelegramMessage } from "@/components/Message/MessageTemplate/CreateMessageTemplate/TipTapTelegramMessage";
import { getAuthorization } from "@/utils/getAuthorization";
import { AxiosHeaders } from "axios";
import { saveMessageTemplate } from "@/actions/message/messageTemplate/saveMessageTemplate";
import { useRouter } from "next/navigation";
import { MultiPhotoUpload } from "@/components/MultiPhotoUpload";
import { ManagePhotos } from "@/components/ManagePhotos";
import { File as FileModel } from "@/models/file";
import { SendToAdmin } from "@/components/Message/MessageTemplate/CreateMessageTemplate/SendToAdmin";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { CreateLink } from "@/components/Message/MessageTemplate/CreateMessageTemplate/CreateLink";

export interface CreateMessageTemplateFormValues {
  name: string;
  description: string;
  photos: FileModel[];
  links: string[];
}
export const CreateMessageTemplate = () => {
  const [isMessageTemplateLoading, setIsMessageTemplateLoading] =
    useState(false);
  const lp = useLaunchParams();
  const router = useRouter();

  return (
    <div className={"flex justify-center"} id={"create-message-template"}>
      <Formik
        initialValues={
          {
            name: "",
            description: "",
            photos: [] as FileModel[],
            links: [],
          } as CreateMessageTemplateFormValues
        }
        onSubmit={async (values) => {
          if (values.description.length && values.name.length) {
            setIsMessageTemplateLoading(true);
            await saveMessageTemplate(
              {
                text: values.description,
                name: values.name,
                photoIds: values.photos.map((photo) => photo.id),
                links: values.links,
              },
              getAuthorization(lp) as AxiosHeaders,
            ).then(() => {
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
