"use client";

import {
  Badge,
  Button,
  Cell,
  Headline,
  List,
  Spinner,
  Subheadline,
} from "@telegram-apps/telegram-ui";
import { classNames, useLaunchParams } from "@telegram-apps/sdk-react";
import { useEffect, useState } from "react";
import {
  Message,
  MessagePeriodType,
  MessageStatus,
  MessageType,
} from "@/models/message";
import Link from "next/link";
import {
  getMessagesList,
  IGetMessagesListParams,
} from "@/actions/message/getMessagesList";
import { getAuthorization } from "@/utils/getAuthorization";
import { AxiosHeaders } from "axios";
import { Virtuoso } from "react-virtuoso";
import { formatDateInClientTimeZone } from "@/utils/date";
import { useFormik } from "formik";
import SingleSelectWithSearch from "@/components/SingleSelectWithSearch";
import { SelectOption } from "@/components/MultiSelectWithSearch";
import { messageStatusOptions as messageStatusOptionsDefault } from "@/constants/messageStatusOptions";
import { messageTypeOptions as messageTypeOptionsDefault } from "@/constants/messageTypeOptions";
import { messagePeriodTypeOptions as messagePeriodTypeOptionsDefault } from "@/constants/messagePeriodTypeOptions";

const messageStatusOptions: SelectOption<unknown>[] = [
  { value: "", label: "Все" },
  ...messageStatusOptionsDefault,
];

const messageTypeOptions: SelectOption<unknown>[] = [
  { value: "", label: "Все" },
  ...messageTypeOptionsDefault,
];

const messagePeriodTypeOptions: SelectOption<unknown>[] = [
  { value: "", label: "Все" },
  ...messagePeriodTypeOptionsDefault,
];

export interface MessageListFilters {
  filterByStatus: SelectOption<unknown> | null;
  filterByType: SelectOption<unknown> | null;
  filterByPeriod: SelectOption<unknown> | null;
}

export const MessageList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const lp = useLaunchParams();

  const { handleSubmit, setFieldValue, values, submitForm } =
    useFormik<MessageListFilters>({
      initialValues: {
        filterByStatus: messageStatusOptions.find((val) => val.value === "")!,
        filterByType: messageTypeOptions.find((val) => val.value === "")!,
        filterByPeriod: messagePeriodTypeOptions.find(
          (val) => val.value === "",
        )!,
      },
      onSubmit: () => {
        setIsLoading(true);
        setMessages([]);

        getData();
      },
    });

  const getData = async () => {
    const params: IGetMessagesListParams = {};

    if (values.filterByStatus?.value) {
      params.filterByStatus = values.filterByStatus.value as MessageStatus;
    }
    if (values.filterByType?.value) {
      params.filterByType = values.filterByType.value as MessageType;
    }
    if (values.filterByPeriod?.value && values.filterByType?.value) {
      params.filterByPeriod = values.filterByPeriod.value as MessagePeriodType;
    }

    const data = await getMessagesList(
      params,
      getAuthorization(lp) as AxiosHeaders,
    );

    setMessages(data);
    setIsLoading(false);
  };

  useEffect(() => {
    if (lp && !isLoading && !messages.length) {
      setIsLoading(true);
      getData();
    }
  }, [lp]);

  return (
    <List className={"h-full"}>
      <Virtuoso
        components={{
          Header: () => (
            <>
              <div className={"p-2 flex flex-col gap-2"}>
                <Link href={"/admin/message/create"}>
                  <Button>Создать новую рассылку</Button>
                </Link>
                <form onSubmit={handleSubmit}>
                  <SingleSelectWithSearch
                    defaultSelectedOption={values.filterByStatus}
                    options={messageStatusOptions}
                    onChange={async (value) => {
                      await setFieldValue("filterByStatus", value);
                      await submitForm();
                    }}
                    placeholder={"Статус рассылки"}
                    head={
                      <Subheadline className={"px-[22px]"}>
                        Статус рассылки
                      </Subheadline>
                    }
                  />
                  <SingleSelectWithSearch
                    defaultSelectedOption={values.filterByType}
                    options={messageTypeOptions}
                    onChange={async (value) => {
                      await setFieldValue("filterByType", value);
                      await submitForm();
                    }}
                    placeholder={"Тип рассылки"}
                    head={
                      <Subheadline className={"px-[22px]"}>
                        Тип рассылки
                      </Subheadline>
                    }
                  />
                  <div
                    className={classNames({
                      hidden: values.filterByType?.value === MessageType.ONCE,
                    })}
                  >
                    <SingleSelectWithSearch
                      defaultSelectedOption={values.filterByPeriod}
                      options={messagePeriodTypeOptions}
                      onChange={async (value) => {
                        await setFieldValue("filterByPeriod", value);
                        await submitForm();
                      }}
                      disabled={values.filterByType?.value === MessageType.ONCE}
                      placeholder={"Период"}
                      head={
                        <Subheadline className={"px-[22px]"}>
                          Период
                        </Subheadline>
                      }
                    />
                  </div>
                  {/*<Button type={"submit"}>Применить фильтрацию</Button>*/}
                </form>
              </div>
              {isLoading ? <Spinner size={"l"} /> : null}
              {!isLoading && !messages.length && (
                <Headline>Ничего не найдено</Headline>
              )}
            </>
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
    </List>
  );
};
