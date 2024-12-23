"use client";

import { useEffect, useState } from "react";
import { User } from "@/models/user";
import { getAuthorization } from "@/utils/getAuthorization";
import { useLaunchParams } from "@telegram-apps/sdk-react";

export const useRegister = (): User | null => {
  const [user, setUser] = useState<User | null>(null);
  const lp = useLaunchParams();

  const headers = getAuthorization(lp);

  useEffect(() => {
    const register = async () => {
      const user: User = await (
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}users/register`, {
          method: "POST",
          headers,
        })
      ).json();

      setUser(user);
    };

    register();
  }, []);

  return user;
};
