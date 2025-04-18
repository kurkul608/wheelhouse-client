"use client";

import {
  Badge,
  Button,
  Cell,
  Headline,
  List,
  Section,
  Spinner,
} from "@telegram-apps/telegram-ui";
import { FC, useEffect, useState } from "react";
import { Message as MessageModel, MessageStatus } from "@/models/message";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { getMessage } from "@/actions/message/getMessage";
import { getAuthorization } from "@/utils/getAuthorization";
import { AxiosHeaders } from "axios";
import { whereOptions } from "@/constants/whereUserOptions";
import { CellWithTooltip } from "@/components/CellWithTooltip";
import { formatDateInClientTimeZone } from "@/utils/date";
import Link from "next/link";

export interface MessageProps {
  slug: string;
}

export const Message: FC<MessageProps> = ({ slug }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<null | MessageModel>(null);

  const lp = useLaunchParams();

  useEffect(() => {
    const getData = async () => {
      const data = await getMessage(slug, getAuthorization(lp) as AxiosHeaders);
      setMessage(data);
      setIsLoading(false);
    };
    if (!isLoading && !message && lp) {
      setIsLoading(true);
      getData();
    }
  }, [lp]);

  return (
    <List>
      {isLoading ? <Spinner size="l" /> : null}
      {!isLoading && !message && <Headline>Ничего не найдено</Headline>}
      {message ? (
        <div className={"flex justify-end"}>
          <Link href={`/admin/message/${message.id}/edit`}>
            <Button>Перейти к редактированию</Button>
          </Link>
        </div>
      ) : null}
      {message ? (
        <Section header={message.name}>
          <Cell before={"ID:"}>{message.id}</Cell>
          <CellWithTooltip cellBefore={"Название:"} text={message.name} />
          <CellWithTooltip
            cellBefore={"Фильтр по пользователям:"}
            text={
              whereOptions.find((opt) => opt.value === message.usersWhere)
                ?.label || ""
            }
          />
          <Cell before={"Шаблон:"}>
            <Link
              href={`/admin/message/messageTemplate/${message.messageTemplateId}`}
            >
              <Button>Перейти к шаблону</Button>
            </Link>
          </Cell>
          {message.brandsAutoInWishlist?.length ? (
            <CellWithTooltip
              cellBefore={"Авто в вишлисте:"}
              text={message.brandsAutoInWishlist.join(", ")}
            />
          ) : null}
          {message.brandsAutoInOrders?.length ? (
            <CellWithTooltip
              cellBefore={"Авто в заявках:"}
              text={message.brandsAutoInOrders.join(", ")}
            />
          ) : null}
          {message.countAutoInWishlist !== null &&
          message.countAutoInWishlist !== undefined ? (
            <CellWithTooltip
              cellBefore={"Количество авто в вишлисте:"}
              text={String(message.countAutoInWishlist)}
            />
          ) : null}
          {message.countOrders !== null && message.countOrders !== undefined ? (
            <CellWithTooltip
              cellBefore={"Количество заявок:"}
              text={String(message.countOrders)}
            />
          ) : null}
          {message.startTime ? (
            <CellWithTooltip
              cellBefore={"Время начала рассылки:"}
              text={formatDateInClientTimeZone(message.startTime)}
            />
          ) : null}
          <CellWithTooltip
            cellBefore={"Создано:"}
            text={formatDateInClientTimeZone(message.createdAt)}
          />
          <CellWithTooltip
            cellBefore={"Обновлено:"}
            text={formatDateInClientTimeZone(message.updatedAt)}
          />
          <Cell
            before={"Статус рассылки:"}
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
          >
            {message.status === MessageStatus.ACTIVE
              ? "Актвиный"
              : "Не активный"}
          </Cell>
        </Section>
      ) : null}
    </List>
  );
};
