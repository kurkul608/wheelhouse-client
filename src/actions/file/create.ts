"use server";

import { File as FileModel } from "@/models/file";

export const createFile = async (
  file: File,
  headers: HeadersInit,
): Promise<FileModel> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}files`, {
    method: "POST",
    body: formData,
    headers,
  });

  return response.json();
};
