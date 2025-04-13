"use server";

import axios, { AxiosHeaders } from "axios";
import { MessageLink } from "@/models/messageTemplate";

export const updateMessageTemplate = async (
  id: string,
  {
    photoIds,
    name,
    text,
    links,
  }: {
    text: string;
    name: string;
    photoIds?: string[];
    links?: MessageLink[];
  },
  headers: AxiosHeaders,
) => {
  try {
    const body = { text, name, photoIds, links };
    const res = await axios.patch(
      `${process.env.API_URL}admin/messageTemplate/${id}`,
      body,
      { headers: { ...headers, "Content-Type": "application/json" } },
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};
