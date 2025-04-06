"use server";

import axios, { AxiosHeaders } from "axios";
import { MessageTemplate } from "@/models/messageTemplate";

export const getListMessageTemplate = async (headers: AxiosHeaders) => {
  try {
    const list = await axios.get<MessageTemplate[]>(
      `${process.env.API_URL}admin/messageTemplate`,
      { headers },
    );

    return list.data;
  } catch (error) {
    throw error;
  }
};
