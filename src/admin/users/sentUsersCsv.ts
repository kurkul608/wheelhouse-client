"use server";

import axios, { AxiosHeaders } from "axios";
import { User } from "@/models/user";

export const sentUsersScv = async (
  userId: number,
  headers: AxiosHeaders,
): Promise<User[] | undefined> => {
  try {
    const response = await axios.post<User[]>(
      `${process.env.API_URL}admin/users/send-csv`,
      { userId },
      {
        headers: { ...headers, "Content-Type": "application/json" },
      },
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
