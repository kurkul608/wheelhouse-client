"use client";

import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useEffect, useState } from "react";
import { getUsersList } from "@/admin/users/getList";
import { getAuthorization } from "@/utils/getAuthorization";
import { AxiosHeaders } from "axios";
import { User } from "@/models/user";
import {
  Cell,
  Headline,
  Input,
  List,
  Spinner,
} from "@telegram-apps/telegram-ui";
import { ChangeUserRole } from "@/components/Users/ChangeUserRole";

export const UsersList = () => {
  const [refreshFlag, setRefreshFlag] = useState<boolean>(false);
  const [searchString, setSearchString] = useState("");
  const [list, setList] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const lp = useLaunchParams();

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

  return (
    <List style={{ backgroundColor: "var(--tgui--secondary_bg_color)" }}>
      <Input
        placeholder={"Введите логин пользователя"}
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
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
