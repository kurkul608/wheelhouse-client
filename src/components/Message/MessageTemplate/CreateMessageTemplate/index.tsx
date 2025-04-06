"use client";

import { Button, Headline, Input } from "@telegram-apps/telegram-ui";
import { Modal } from "@/components/Modal";
import { useContext, useState } from "react";
import { useFormik } from "formik";
import { TipTapTelegramMessage } from "@/components/Message/MessageTemplate/CreateMessageTemplate/TipTapTelegramMessage";
import { sentMessageTemplate } from "@/actions/message/messageTemplate/sentMessageTemplate";
import { UserContext } from "@/contexts/userContext";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { getAuthorization } from "@/utils/getAuthorization";
import { AxiosHeaders } from "axios";
import { saveMessageTemplate } from "@/actions/message/messageTemplate/saveMessageTemplate";

export const CreateMessageTemplate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSentMessageLoading, setIsSentMessageLoading] = useState(false);
  const [isMessageTemplateLoading, setIsMessageTemplateLoading] =
    useState(false);
  const { user } = useContext(UserContext);
  const lp = useLaunchParams();

  const { handleSubmit, handleChange, values, setFieldValue } = useFormik({
    initialValues: { name: "", description: "" },
    onSubmit: async (values) => {
      if (values.description.length && values.name.length) {
        setIsMessageTemplateLoading(true);
        await saveMessageTemplate(
          values.description,
          values.name,
          getAuthorization(lp) as AxiosHeaders,
        ).then(() => {
          setIsMessageTemplateLoading(false);
          setIsModalOpen(false);
        });
      }
    },
  });

  const modalHandler = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSend = async () => {
    if (user && !isSentMessageLoading) {
      setIsSentMessageLoading(true);
      await sentMessageTemplate(
        values.description,
        user.id,
        getAuthorization(lp) as AxiosHeaders,
      ).then(() => {
        setIsSentMessageLoading(false);
      });
    }
  };

  return (
    <div className={"flex justify-end"} id={"create-message-template"}>
      <Button onClick={modalHandler}>Создать новый шаблон</Button>

      <Modal
        isOpen={isModalOpen}
        onClose={modalHandler}
        elementId={"create-message-template"}
      >
        <form onSubmit={handleSubmit} className={"w-[85vw] h-[85vh]"}>
          <Headline>Название шаблона</Headline>
          <Input
            className={"w-full"}
            id="name"
            name="name"
            placeholder={"Введите название шаблона"}
            value={values.name}
            onChange={handleChange}
          />

          <Headline className={"mt-2"}>Текст сообщения</Headline>
          <TipTapTelegramMessage
            editorContent={values.description}
            onChange={(value: string) => {
              setFieldValue("description", value);
            }}
          />

          <div className={"flex justify-center w-full"}>
            <Button onClick={handleSend} loading={isSentMessageLoading}>
              Отправить сообщение себе
            </Button>
          </div>
          <div className={"flex justify-center w-full mt-2"}>
            <Button
              type={"submit"}
              disabled={!values.description.length || !values.name.length}
              loading={isMessageTemplateLoading}
            >
              Сохранить шаблон
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
