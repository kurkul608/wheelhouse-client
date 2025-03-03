"use server";

import axios, { AxiosHeaders } from "axios";
import { RefCodeModel } from "@/models/refCode";

export const getRefCode = async (
  refId: string,
  headers: AxiosHeaders,
): Promise<RefCodeModel | undefined> => {
  try {
    const refCode = await axios.get<RefCodeModel>(
      `${process.env.API_URL}admin/ref/${refId}`,
      {
        headers: { ...headers },
      },
    );
    return refCode.data;
  } catch (error) {
    console.error(error);
  }
};
