"use server";

import axios, { AxiosHeaders } from "axios";

export const sentMessageTemplate = async (
  messageText: string,
  userId: string,
  headers: AxiosHeaders,
) => {
  try {
    const res = await axios.post(
      `${process.env.API_URL}admin/messageTemplate/sent`,
      { text: messageText, userId },
      { headers: { ...headers, "Content-Type": "application/json" } },
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};
