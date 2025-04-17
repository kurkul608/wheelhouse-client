"use server";

import axios, { AxiosHeaders } from "axios";
import { MessageLink } from "@/models/messageTemplate";

export const sentMessageToChanelTemplate = async (
  {
    photoIds,
    text,
    links,
  }: {
    text: string;
    photoIds?: string[];
    links?: MessageLink[];
  },
  headers: AxiosHeaders,
) => {
  try {
    const res = await axios.post(
      `${process.env.API_URL}admin/messageTemplate/sent-to-chanel`,
      { text, chanelId: process.env.CHANEL_ID, photoIds, links },
      { headers: { ...headers, "Content-Type": "application/json" } },
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};
