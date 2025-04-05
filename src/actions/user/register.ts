"use server";

import { cookies } from "next/headers";
import { User } from "@/models/user";
import axios, { AxiosHeaders } from "axios";

export async function registerUser(
  data: { refId: string | null },
  headers: AxiosHeaders,
): Promise<User | undefined> {
  try {
    const user = await axios.post(
      `${process.env.API_URL}users/register`,
      { ...(data.refId ? { refId: data.refId } : {}) },
      {
        headers,
      },
    );

    const userData: User = user.data;
    const cookieStore = await cookies();

    if (userData.roles.some((role) => role === "MANAGER")) {
      cookieStore.set("roleManager", "true");
    }

    return userData;
  } catch (error) {
    console.error(error);
  }
}
