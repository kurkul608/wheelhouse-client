"use client";

import { MessageTemplate } from "@/models/messageTemplate";
import { FC } from "react";
import { getAuthorization } from "@/utils/getAuthorization";
import { AxiosHeaders } from "axios";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { updateMessageTemplate } from "@/actions/message/messageTemplate/updateMessageTemplate";
import {
  CreateMessageTemplateFormValues,
  MessageTemplateForm,
} from "@/components/Message/MessageTemplate/MessageTemplateForm";

interface IProps {
  template: MessageTemplate;
}

export const UpdateMessageTemplate: FC<IProps> = ({ template }) => {
  const lp = useLaunchParams();
  const onSubmit = async (values: CreateMessageTemplateFormValues) => {
    await updateMessageTemplate(
      template.id,
      {
        text: values.description,
        name: values.name,
        photoIds: values.photos.map((photo) => photo.id),
        links: values.links,
      },
      getAuthorization(lp) as AxiosHeaders,
    );
  };
  return (
    <MessageTemplateForm
      description={template.text}
      photos={template.photos}
      name={template.name}
      links={template.links}
      onSubmit={onSubmit}
    />
  );
};
