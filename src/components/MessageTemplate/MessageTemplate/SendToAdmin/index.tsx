"use client";

import { Button } from "@telegram-apps/telegram-ui";
import { useFormikContext } from "formik";
import { sentMessageTemplate } from "@/actions/messageTemplate/sentMessageTemplate";
import { getAuthorization } from "@/utils/getAuthorization";
import { AxiosHeaders } from "axios";
import { useContext, useState } from "react";
import { UserContext } from "@/contexts/userContext";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { CreateMessageTemplateFormValues } from "@/components/MessageTemplate/MessageTemplateForm";
import { sentMessageToChanelTemplate } from "@/actions/messageTemplate/sentMessageToChanelTemplate";

export const SendToAdmin = () => {
  const [isSentMessageLoading, setIsSentMessageLoading] = useState(false);

  const { values } = useFormikContext<CreateMessageTemplateFormValues>();

  const lp = useLaunchParams();

  const { user } = useContext(UserContext);

  const handleSend = async () => {
    if (user && !isSentMessageLoading) {
      setIsSentMessageLoading(true);
      await sentMessageTemplate(
        {
          text: values.description,
          userId: user.id,
          photoIds: values.photos.map((photo) => photo.id),
          links: values.links,
        },
        getAuthorization(lp) as AxiosHeaders,
      ).then(() => {
        setIsSentMessageLoading(false);
      });
    }
  };

  const handleSendChanel = async () => {
    if (user && !isSentMessageLoading) {
      setIsSentMessageLoading(true);
      await sentMessageToChanelTemplate(
        {
          text: values.description,
          photoIds: values.photos.map((photo) => photo.id),
          links: values.links,
        },
        getAuthorization(lp) as AxiosHeaders,
      ).then(() => {
        setIsSentMessageLoading(false);
      });
    }
  };

  return (
    <div
      className={"w-full flex justify-between sticky top-0 z-10"}
      style={{ backgroundColor: "var(--tgui--secondary_bg_color)" }}
    >
      <Button onClick={handleSendChanel} loading={isSentMessageLoading}>
        Отправить В канал
      </Button>
      <Button onClick={handleSend} loading={isSentMessageLoading}>
        Отправить Себе
      </Button>
    </div>
  );
};
