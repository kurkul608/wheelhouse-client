"use client";

import { FC, useEffect, useState } from "react";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { MessageTemplate } from "@/models/messageTemplate";
import { getMessageTemplate } from "@/actions/message/messageTemplate/getMessageTemplate";
import { getAuthorization } from "@/utils/getAuthorization";
import { AxiosHeaders } from "axios";
import { Headline, List, Spinner } from "@telegram-apps/telegram-ui";
import { UpdateMessageTemplate } from "../UpdateMessageTemplate";

interface IProps {
  messageTemplateId: string;
}
export const MessageTemplateComp: FC<IProps> = ({ messageTemplateId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<MessageTemplate | null>(null);
  const lp = useLaunchParams();

  useEffect(() => {
    const getData = async () => {
      const template = await getMessageTemplate(
        messageTemplateId,
        getAuthorization(lp) as AxiosHeaders,
      );
      setData(template);
      setIsLoading(false);
    };
    if (lp && !data) {
      setIsLoading(true);
      getData();
    }
  }, [lp]);

  return (
    <List>
      {data ? <UpdateMessageTemplate template={data} /> : null}
      {isLoading && <Spinner size={"l"} />}
      {!isLoading && !data && <Headline>Ничего не найдено</Headline>}
    </List>
  );
};
