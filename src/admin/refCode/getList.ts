"use server";

import axios, { AxiosHeaders } from "axios";
import { RefCodeModel } from "@/models/refCode";

export const getRefCodeList = async (
  headers: AxiosHeaders,
): Promise<RefCodeModel[] | undefined> => {
  try {
    const refCode = await axios.get<RefCodeModel[]>(
      `${process.env.API_URL}admin/ref`,
      {
        headers: { ...headers, "Content-Type": "application/json" },
      },
    );

    return refCode.data;
  } catch (error) {
    console.error(error);
  }
};
