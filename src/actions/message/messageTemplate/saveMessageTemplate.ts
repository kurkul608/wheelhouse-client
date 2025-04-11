"use server";

import axios, { AxiosHeaders } from "axios";

export const saveMessageTemplate = async (
  {
    photoIds,
    name,
    text,
    links,
  }: {
    text: string;
    name: string;
    photoIds?: string[];
    links?: string[];
  },
  headers: AxiosHeaders,
) => {
  try {
    const body = { text, name, photoIds, links };
    const res = await axios.post(
      `${process.env.API_URL}admin/messageTemplate`,
      body,
      { headers: { ...headers, "Content-Type": "application/json" } },
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};
