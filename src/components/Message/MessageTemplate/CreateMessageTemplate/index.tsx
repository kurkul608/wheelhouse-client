"use client";

import {
  CreateMessageTemplateFormValues,
  MessageTemplateForm,
} from "@/components/Message/MessageTemplate/MessageTemplateForm";
import { saveMessageTemplate } from "@/actions/message/messageTemplate/saveMessageTemplate";
import { getAuthorization } from "@/utils/getAuthorization";
import { AxiosHeaders } from "axios";
import { useLaunchParams } from "@telegram-apps/sdk-react";

export const CreateMessageTemplate = () => {
  const lp = useLaunchParams();

  const onSubmit = async (values: CreateMessageTemplateFormValues) => {
    await saveMessageTemplate(
      {
        text: values.description,
        name: values.name,
        photoIds: values.photos.map((photo) => photo.id),
        links: values.links,
      },
      getAuthorization(lp) as AxiosHeaders,
    );
  };
  return <MessageTemplateForm onSubmit={onSubmit} />;
};
