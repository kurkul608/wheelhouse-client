"use client";

import { Button, Headline, Input } from "@telegram-apps/telegram-ui";
import { TipTapTelegramMessage } from "@/components/Message/MessageTemplate/CreateMessageTemplate/TipTapTelegramMessage";
import { MessageTemplate } from "@/models/messageTemplate";
import { FC, useContext, useState } from "react";
import { useFormik } from "formik";
import { sentMessageTemplate } from "@/actions/message/messageTemplate/sentMessageTemplate";
import { getAuthorization } from "@/utils/getAuthorization";
import { AxiosHeaders } from "axios";
import { UserContext } from "@/contexts/userContext";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { updateMessageTemplate } from "@/actions/message/messageTemplate/updateMessageTemplate";
import { useRouter } from "next/navigation";

interface IProps {
  template: MessageTemplate;
}

export const UpdateMessageTemplate: FC<IProps> = ({ template }) => {
  const [isSentMessageLoading, setIsSentMessageLoading] = useState(false);
  const [isMessageTemplateLoading, setIsMessageTemplateLoading] =
    useState(false);
  const { user } = useContext(UserContext);
  const lp = useLaunchParams();
  const router = useRouter();

  const { handleSubmit, values, setFieldValue, handleChange } = useFormik({
    initialValues: {
      name: template.name,
      description: template.text,
    },
    onSubmit: async (values) => {
      if (values.description.length || values.name.length) {
        setIsMessageTemplateLoading(true);

        await updateMessageTemplate(
          template.id,
          {
            messageText: values.description,
            messageName: values.name,
          },
          getAuthorization(lp) as AxiosHeaders,
        ).then(() => {
          setIsMessageTemplateLoading(false);
          router.refresh();
        });
      }
    },
  });

  const handleSend = async () => {
    if (user && !isSentMessageLoading) {
      setIsSentMessageLoading(true);
      await sentMessageTemplate(
        { text: values.description, userId: user.id },
        getAuthorization(lp) as AxiosHeaders,
      ).then(() => {
        setIsSentMessageLoading(false);
      });
    }
  };

  return (
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
  );
};
