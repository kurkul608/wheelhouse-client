"use server";

import { File as FileModel } from "@/models/file";
import axios, { AxiosHeaders } from "axios";

export const createFile = async (
  file: File,
  headers: HeadersInit,
): Promise<FileModel> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post<FileModel>(
    `${process.env.API_URL}files`,
    formData,
    {
      headers: { ...headers } as AxiosHeaders,
      timeout: 120000,
    },
  );

  return response.data;
};
