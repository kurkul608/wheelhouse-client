"use client";

import {
  Badge,
  Button,
  Cell,
  Headline,
  List,
  Spinner,
} from "@telegram-apps/telegram-ui";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useEffect, useState } from "react";
import { Message, MessageStatus } from "@/models/message";
import Link from "next/link";
import { getMessagesList } from "@/actions/message/getMessagesList";
import { getAuthorization } from "@/utils/getAuthorization";
import { AxiosHeaders } from "axios";
import { Virtuoso } from "react-virtuoso";
import { formatDateInClientTimeZone } from "@/utils/date";
import { useFormik } from "formik";
import SingleSelectWithSearch from "@/components/SingleSelectWithSearch";
import { SelectOption } from "@/components/MultiSelectWithSearch";

export interface MessageListFilters {
  filterByStatus: SelectOption<unknown> | null;
}

export const MessageList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const lp = useLaunchParams();

  const { handleSubmit, setFieldValue, values } = useFormik<MessageListFilters>(
    {
      initialValues: { filterByStatus: null },
      onSubmit: (values) => {
        console.log(values);
      },
    },
  );

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

  const filterStatusOptions: SelectOption<unknown>[] = [
    { value: MessageStatus.ACTIVE, label: "Актинвый" },
    { value: MessageStatus.DISABLED, label: "Не актинвый" },
  ];

  return (
    <List className={"h-full"}>
      <Virtuoso
        components={{
          Header: () => (
            <div
              style={{ backgroundColor: "var(--tgui--bg_color)" }}
              className={"p-2 flex flex-col gap-2"}
            >
              <Link href={"/admin/message/create"}>
                <Button>Создать новую рассылку</Button>
              </Link>
              <form onSubmit={handleSubmit}>
                <SingleSelectWithSearch
                  defaultSelectedOption={values.filterByStatus}
                  options={filterStatusOptions}
                  onChange={(value) => {
                    setFieldValue("filterByStatus", value);
                  }}
                />
              </form>
            </div>
          ),
        }}
        style={{ height: "100%" }}
        totalCount={messages.length}
        data={messages}
        itemContent={(_, message) => (
          <Link href={`/admin/message/${message.id}`}>
            <Cell
              subhead={`Статус: ${message.status}`}
              titleBadge={
                <Badge
                  type="dot"
                  mode={
                    message.status === MessageStatus.ACTIVE
                      ? "primary"
                      : "secondary"
                  }
                />
              }
              subtitle={`Дата создания: ${formatDateInClientTimeZone(message.createdAt)}`}
            >
              {message.name}
            </Cell>
          </Link>
        )}
      />
      {isLoading ? <Spinner size={"l"} /> : null}
      {!isLoading && !messages.length && <Headline>Ничего не найдено</Headline>}
    </List>
  );
};
