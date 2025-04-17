"use client";

import {
  Button,
  Cell,
  Headline,
  List,
  Spinner,
} from "@telegram-apps/telegram-ui";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useEffect, useState } from "react";
import { Message } from "@/models/message";
import Link from "next/link";
import { getMessagesList } from "@/actions/message/getMessagesList";
import { getAuthorization } from "@/utils/getAuthorization";
import { AxiosHeaders } from "axios";
import { Virtuoso } from "react-virtuoso";

export const MessageList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const lp = useLaunchParams();

  useEffect(() => {
    const getData = async () => {
      const data = await getMessagesList(getAuthorization(lp) as AxiosHeaders);

      setMessages(data);
      setIsLoading(false);
    };
    if (lp && !isLoading && !messages.length) {
      setIsLoading(true);
      getData();
    }
  }, [lp]);

  return (
    <List className={"h-full"}>
      {!isLoading && messages.length ? (
        <Virtuoso
          components={{
            Header: () => (
              <Link href={"/admin/message/create"}>
                <Button>Создать новую рассылку</Button>
              </Link>
            ),
          }}
          style={{ height: "100%" }}
          totalCount={messages.length}
          data={messages}
          itemContent={(_, message) => (
            <Link href={`/admin/message/${message.id}`}>
              <Cell>{message.name}</Cell>
            </Link>
          )}
        />
      ) : null}
      {isLoading ? <Spinner size={"l"} /> : null}
      {!isLoading && !messages.length && <Headline>Ничего не найдено</Headline>}
    </List>
  );
};
