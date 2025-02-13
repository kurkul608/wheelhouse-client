"use server";

import axios, { AxiosHeaders } from "axios";

export const addToCarCard = async (
  fileId: string,
  carCardId: string,
  headers: AxiosHeaders,
) => {
  await axios.post(
    `${process.env.API_URL}files/${fileId}/add-to/${carCardId}`,
    {},
    {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    },
  );
};
