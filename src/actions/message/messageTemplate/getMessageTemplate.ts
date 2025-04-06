"use server";

import axios, { AxiosHeaders } from "axios";
import { MessageTemplate } from "@/models/messageTemplate";

export const getMessageTemplate = async (id: string, headers: AxiosHeaders) => {
  try {
    const tempalte = await axios.get<MessageTemplate>(
      `${process.env.API_URL}admin/messageTemplate/${id}`,
      { headers },
    );

    return tempalte.data;
  } catch (error) {
    throw error;
  }
};
