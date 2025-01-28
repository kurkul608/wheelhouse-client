"use server";

import axios, { AxiosHeaders } from "axios";
import { User, UserRole } from "@/models/user";

export const updateUserRole = async (
  userId: string,
  role: UserRole,
  headers: AxiosHeaders,
): Promise<User[] | undefined> => {
  try {
    const response = await axios.patch<User[]>(
      `${process.env.API_URL}admin/users/${userId}/role/${role}`,
      {},
      {
        headers: {
          Authorization: headers.Authorization,
        },
      },
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
