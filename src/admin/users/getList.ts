"use server";

import axios, { AxiosHeaders } from "axios";
import { User } from "@/models/user";

export const getUsersList = async (
  headers: AxiosHeaders,
): Promise<User[] | undefined> => {
  try {
    const response = await axios.get<User[]>(
      `${process.env.API_URL}admin/users`,
      {
        headers: headers,
      },
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
