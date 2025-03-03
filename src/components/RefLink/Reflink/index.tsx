"use client";

import { FC, useEffect, useState } from "react";
import { ExpandedRefCodeModel } from "@/models/refCode";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { getRefCode } from "@/admin/refCode/getRef";
import { getAuthorization } from "@/utils/getAuthorization";
import { AxiosHeaders } from "axios";
import { Button, Cell, Snackbar, Spinner } from "@telegram-apps/telegram-ui";
import { formatDateInClientTimeZone } from "@/utils/date";
import { writeToClipboard } from "@/utils/writeToClipboard";
import { getRefLink } from "@/utils/getRefLink";
import { sendRefUsers } from "@/admin/refCode/sendRefUsers";
import { sendRefUsersWithOrders } from "@/admin/refCode/sendRefUsersWithOrders";

interface ReflinkPorps {
  id: string;
}
export const RefLink: FC<ReflinkPorps> = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refLink, setRefLink] = useState<null | ExpandedRefCodeModel>(null);
  const lp = useLaunchParams();
  const [showClipBoard, setShowClipBoard] = useState({
    state: false,
    text: "",
  });

  const getData = async () => {
    setIsLoading(true);
    const ref = await getRefCode(id, getAuthorization(lp) as AxiosHeaders);

    if (ref) {
      setRefLink(ref);
    }
    setIsLoading(false);
  };

  const sentCsvWithUsers = async () => {
    const res = await sendRefUsers(
      id,
      lp.initData?.user?.id as number,
      getAuthorization(lp) as AxiosHeaders,
    );

    if (res) {
      setShowClipBoard({
        text: "CSV отправлен в личные соообщения",
        state: true,
      });
    } else {
      setShowClipBoard({
        text: "Не отправить CSV",
        state: true,
      });
    }
  };

  const sentCsvWithUsersWithOrders = async () => {
    const res = await sendRefUsersWithOrders(
      id,
      lp.initData?.user?.id as number,
      getAuthorization(lp) as AxiosHeaders,
    );

    if (res) {
      setShowClipBoard({
        text: "CSV отправлен в личные соообщения",
        state: true,
      });
    } else {
      setShowClipBoard({
        text: "Не отправить CSV",
        state: true,
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const copyRefLink = async () => {
    const res = await writeToClipboard(getRefLink(id));

    if (res) {
      setShowClipBoard({
        text: "Скопировано в буфер обмена",
        state: true,
      });
    } else {
      setShowClipBoard({
        text: "Не удалось скопировать в буфер обмена",
        state: true,
      });
    }
  };
  return isLoading ? (
    <Spinner size={"l"} />
  ) : refLink ? (
    <div>
      <Cell
        subhead={`${formatDateInClientTimeZone(refLink.createdAt)}`}
        after={<Button onClick={copyRefLink}>Скопировать</Button>}
        subtitle={<div>Пользователей: {refLink.usersCount}</div>}
        description={<div>С ордерами {refLink.usersWithOrderCount}</div>}
      >
        {refLink.name}
        {showClipBoard.state && (
          <Snackbar
            onClose={() => {
              setShowClipBoard({
                state: false,
                text: "",
              });
            }}
          >
            <div className={"size-4 w-full"}>{showClipBoard.text}</div>
          </Snackbar>
        )}
      </Cell>
      <Button className={"mt-4"} onClick={sentCsvWithUsers}>
        Загрузить приглашенных пользовтаелей
      </Button>
      <Button className={"mt-4"} onClick={sentCsvWithUsersWithOrders}>
        Загрузить пользователей с ордерами
      </Button>
    </div>
  ) : (
    <div>Ничего не найдено</div>
  );
};
