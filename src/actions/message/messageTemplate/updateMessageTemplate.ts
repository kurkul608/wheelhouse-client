"use server";

import axios, { AxiosHeaders } from "axios";

export const updateMessageTemplate = async (
  id: string,
  {
    messageText,
    messageName,
  }: {
    messageText: string;
    messageName: string;
  },
  headers: AxiosHeaders,
) => {
  try {
    const res = await axios.patch(
      `${process.env.API_URL}admin/messageTemplate/${id}`,
      { text: messageText, name: messageName },
      { headers: { ...headers, "Content-Type": "application/json" } },
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};
