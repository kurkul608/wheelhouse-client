"use server";

import axios, { AxiosHeaders } from "axios";
import { RefCodeModel } from "@/models/refCode";

export const sendRefUsersWithOrders = async (
  refId: string,
  userId: number,
  headers: AxiosHeaders,
): Promise<RefCodeModel | undefined> => {
  try {
    const refCode = await axios.post<RefCodeModel>(
      `${process.env.API_URL}admin/ref/${refId}/users-csv-with-orders`,
      {
        userId,
      },
      {
        headers: { ...headers, "Content-Type": "application/json" },
      },
    );
    return refCode.data;
  } catch (error) {
    console.error(error);
  }
};
