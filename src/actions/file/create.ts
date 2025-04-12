"use server";

import { FileModel } from "@/models/file";
import axios, { AxiosHeaders } from "axios";

export const createFile = async (
  key: string,
  bucket: string,
  fileSize: string,
  headers: AxiosHeaders,
): Promise<FileModel> => {
  const response = await axios.post<FileModel>(
    `${process.env.API_URL}files`,
    {
      key,
      bucket,
      fileSize,
    },
    {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      timeout: 120000,
    },
  );

  return response.data;
};
