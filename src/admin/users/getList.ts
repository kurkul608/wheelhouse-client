"use server";

import axios, { AxiosHeaders } from "axios";
import { User } from "@/models/user";

export const getUsersList = async (
  searchString: string,
  headers: AxiosHeaders,
): Promise<User[] | undefined> => {
  try {
    const response = await axios.get<User[]>(
      `${process.env.API_URL}admin/users`,
      {
        headers: headers,
        params: { searchString },
      },
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
