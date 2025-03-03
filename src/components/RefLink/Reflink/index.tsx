"use client";

import { FC, useEffect, useState } from "react";
import { RefCodeModel } from "@/models/refCode";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { getRefCode } from "@/admin/refCode/getRef";
import { getAuthorization } from "@/utils/getAuthorization";
import { AxiosHeaders } from "axios";
import { Button, Cell, Snackbar, Spinner } from "@telegram-apps/telegram-ui";
import { formatDateInClientTimeZone } from "@/utils/date";
import { writeToClipboard } from "@/utils/writeToClipboard";
import { getRefLink } from "@/utils/getRefLink";

interface ReflinkPorps {
  id: string;
}
export const RefLink: FC<ReflinkPorps> = ({ id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refLink, setRefLink] = useState<null | RefCodeModel>(null);
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
    <Cell
      subhead={`${formatDateInClientTimeZone(refLink.createdAt)}`}
      after={<Button onClick={copyRefLink}>Скопировать</Button>}
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
  ) : (
    <div>Ничего не найдено</div>
  );
};
