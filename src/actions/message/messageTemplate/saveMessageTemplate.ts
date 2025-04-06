"use server";

import axios, { AxiosHeaders } from "axios";

export const saveMessageTemplate = async (
  messageText: string,
  messageName: string,
  headers: AxiosHeaders,
) => {
  try {
    const res = await axios.post(
      `${process.env.API_URL}admin/messageTemplate`,
      { text: messageText, name: messageName },
      { headers: { ...headers, "Content-Type": "application/json" } },
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};
