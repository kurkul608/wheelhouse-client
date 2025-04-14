"use client";

import { Spinner } from "@telegram-apps/telegram-ui";
import { useEffect, useState } from "react";
import { MessageTemplate } from "@/models/messageTemplate";
import { getListMessageTemplate } from "@/actions/messageTemplate/getListMessageTemplate";
import { getAuthorization } from "@/utils/getAuthorization";
import { AxiosHeaders } from "axios";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import {
  MessageFormValues,
  MessageForm,
} from "@/components/Message/MessageForm";
import { createMessage } from "@/actions/message/createMessage";
import {
  MessagePeriodType,
  MessageStatus,
  MessageType,
  WhereUsersEnum,
} from "@/models/message";
import { clientDateToUTC } from "@/utils/date";

export const CreateMessage = () => {
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);
  const [isTemplatesLoading, setIsTemplateLoading] = useState(false);

  const lp = useLaunchParams();

  useEffect(() => {
    const getData = async () => {
      const data = await getListMessageTemplate(
        getAuthorization(lp) as AxiosHeaders,
      );
      setTemplates(data);
      setIsTemplateLoading(false);
    };

    if (lp && !templates.length) {
      setIsTemplateLoading(true);
      getData();
    }
  }, [lp]);

  const onSubmit = async (values: MessageFormValues) => {
    await createMessage(
      {
        messageTemplateId: values.template!.value,
        name: values.name,
        type: values.type!.value as MessageType,
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
        ...(values.startTime
          ? {
              startTime: clientDateToUTC(values.startTime),
            }
          : {}),
        periodType: values.periodType?.value as MessagePeriodType,
        startNow: values.isSentImmediately,
      },
      getAuthorization(lp) as AxiosHeaders,
    );
  };

  return (
    <>
      {isTemplatesLoading ? <Spinner size={"l"} /> : null}
      {!isTemplatesLoading ? (
        <MessageForm templates={templates} onSubmit={onSubmit} />
      ) : null}
    </>
  );
};
