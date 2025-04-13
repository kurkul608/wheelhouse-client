"use server";

import axios, { AxiosHeaders } from "axios";
import { Message } from "@/models/message";

export const getMessagesList = async (headers: AxiosHeaders) => {
  try {
    const list = await axios.get<Message[]>(
      `${process.env.API_URL}admin/message`,
      { headers },
    );

    return list.data;
  } catch (error) {
    throw error;
  }
};
