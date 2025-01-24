"use client";

import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useEffect, useState } from "react";
import { getUsersList } from "@/admin/users/getList";
import { getAuthorization } from "@/utils/getAuthorization";
import { AxiosHeaders } from "axios";
import { User } from "@/models/user";

export const UsersList = () => {
  const [list, setList] = useState<User[]>([]);
  const lp = useLaunchParams();

  useEffect(() => {
    const getUsers = async () => {
      const users = await getUsersList(getAuthorization(lp) as AxiosHeaders);
      setList(users);
    };
    getUsers();
  }, []);

  console.log(JSON.stringify(list));
  return <div>Лист пользователей</div>;
};
