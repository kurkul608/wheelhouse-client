"use server";

import axios, { AxiosHeaders } from "axios";
import { RefCodeModel } from "@/models/refCode";

export const createRefCode = async (
  name: string,
  headers: AxiosHeaders,
): Promise<RefCodeModel | undefined> => {
  try {
    const refCode = await axios.post<RefCodeModel>(
      `${process.env.API_URL}admin/ref`,
      {
        name,
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
