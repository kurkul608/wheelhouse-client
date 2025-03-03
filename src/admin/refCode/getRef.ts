"use server";

import axios, { AxiosHeaders } from "axios";
import { ExpandedRefCodeModel } from "@/models/refCode";

export const getRefCode = async (
  refId: string,
  headers: AxiosHeaders,
): Promise<ExpandedRefCodeModel | undefined> => {
  try {
    const refCode = await axios.get<ExpandedRefCodeModel>(
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
