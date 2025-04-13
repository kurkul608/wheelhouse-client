"use client";

import { FC, useEffect, useState } from "react";
import {
  Message,
  MessageStatus,
  MessageType,
  WhereUsersEnum,
} from "@/models/message";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { getMessage } from "@/actions/message/getMessage";
import { getAuthorization } from "@/utils/getAuthorization";
import { AxiosHeaders } from "axios";
import { Headline, Spinner } from "@telegram-apps/telegram-ui";
import { MessageTemplate } from "@/models/messageTemplate";
import { getListMessageTemplate } from "@/actions/messageTemplate/getListMessageTemplate";
import {
  MessageFormValues,
  MessageForm,
} from "@/components/Message/MessageForm";
import { updateMessage } from "@/actions/message/updateMessage";

interface IEditMessageProps {
  slug: string;
}
export const EditMessage: FC<IEditMessageProps> = ({ slug }) => {
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<null | Message>(null);

  const lp = useLaunchParams();

  useEffect(() => {
    const getData = async () => {
      const data = await getMessage(slug, getAuthorization(lp) as AxiosHeaders);
      setMessage(data);

      const templatesResponse = await getListMessageTemplate(
        getAuthorization(lp) as AxiosHeaders,
      );

      setTemplates(templatesResponse);
      setIsLoading(false);
    };
    if (!isLoading && !message && lp) {
      setIsLoading(true);
      getData();
    }
  }, [lp]);

  const onSubmit = async (values: MessageFormValues) => {
    await updateMessage(
      slug,
      {
        name: values.name,
        // type: values.type!.value as MessageType,
        type: MessageType.ONCE,
        status: MessageStatus.ACTIVE,
        usersWhere: values.whereUser!.value as WhereUsersEnum,
        ...(values.countAutoInWishlist !== undefined &&
        values.countAutoInWishlist !== null
          ? { countAutoInWishlist: values.countAutoInWishlist }
          : {}),
        ...(values.countOrders !== undefined && values.countOrders !== null
          ? { countOrders: values.countOrders }
          : {}),
        ...(values.manySpecialCarBrand.length
          ? {
              brandsAutoInWishlist: values.manySpecialCarBrand.map(
                (opt) => opt.value,
              ),
            }
          : {}),
        ...(values.manyOrderOnBrand.length
          ? {
              brandsAutoInOrders: values.manyOrderOnBrand.map(
                (opt) => opt.value,
              ),
            }
          : {}),
        startTime: undefined,
      },
      getAuthorization(lp) as AxiosHeaders,
    );
  };

  return (
    <>
      {isLoading ? <Spinner size="l" /> : null}
      {!isLoading && !message && <Headline>Ничего не найдено</Headline>}
      {message && !isLoading ? (
        <MessageForm
          existMessage={message}
          templates={templates}
          onSubmit={onSubmit}
        />
      ) : null}
    </>
  );
};
