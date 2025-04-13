"use server";

import axios, { AxiosHeaders } from "axios";

export const sentMessageTemplate = async (
  {
    photoIds,
    text,
    userId,
    links,
  }: {
    text: string;
    userId: string;
    photoIds?: string[];
    links?: string[];
  },
  headers: AxiosHeaders,
) => {
  try {
    const res = await axios.post(
      `${process.env.API_URL}admin/messageTemplate/sent`,
      { text, userId, photoIds, links },
      { headers: { ...headers, "Content-Type": "application/json" } },
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};
