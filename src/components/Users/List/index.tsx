"use client";

import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useEffect, useState } from "react";
import { getUsersList } from "@/admin/users/getList";
import { getAuthorization } from "@/utils/getAuthorization";
import { AxiosHeaders } from "axios";
import { User } from "@/models/user";
import {
  Button,
  Cell,
  Headline,
  Input,
  List,
  Snackbar,
  Spinner,
} from "@telegram-apps/telegram-ui";
import { ChangeUserRole } from "@/components/Users/ChangeUserRole";
import { sentUsersScv } from "@/admin/users/sentUsersCsv";

export const UsersList = () => {
  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);
  const [searchString, setSearchString] = useState("");
  const [list, setList] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const lp = useLaunchParams();
  const [showClipBoard, setShowClipBoard] = useState({
    state: false,
    text: "",
  });

  useEffect(() => {
    const getUsers = async () => {
      setLoading(true);
      const users = await getUsersList(
        searchString,
        getAuthorization(lp) as AxiosHeaders,
      );
      if (users) setList(users);
      setLoading(false);
    };
    getUsers();
  }, [refreshFlag, searchString]);

  const sentCsvButtonHandler = async () => {
    const res = await sentUsersScv(
      lp.initData?.user?.id as number,
      getAuthorization(lp) as AxiosHeaders,
    );

    if (res) {
      setShowClipBoard({
        text: "CSV отправлен в личные сообщения",
        state: true,
      });
    } else {
      setShowClipBoard({
        text: "Не отправить CSV",
        state: true,
      });
    }
  };

  return (
    <List
      style={{ backgroundColor: "var(--tgui--secondary_bg_color)" }}
      className={"h-[calc(100vh-62px)] overflow-auto"}
    >
      <Input
        placeholder={"Введите логин пользователя"}
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      <Button onClick={sentCsvButtonHandler}>Получить в CSV</Button>
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
      {!loading &&
        list.map((user) => (
          <Cell
            key={user.id}
            after={
              <ChangeUserRole
                user={user}
                refresh={() => {
                  setRefreshFlag(!refreshFlag);
                }}
              />
            }
            subtitle={`${user.firstName || ""} ${user.lastName || ""}`}
          >
            {`@${user.username || ""}`}
          </Cell>
        ))}
      {loading && <Spinner size={"l"} />}
      {!loading && !list.length && <Headline>Ничего не найдено!</Headline>}
    </List>
  );
};
