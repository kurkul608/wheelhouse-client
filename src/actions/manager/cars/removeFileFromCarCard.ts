"use server";

import axios, { AxiosHeaders } from "axios";

export const removeFileFromCar = async (
  carId: string,
  fileId: string,
  headers: HeadersInit,
): Promise<void> => {
  try {
    const response = await axios.delete(
      `${process.env.API_URL}manager/cars/${carId}/file/${fileId}`,
      { headers: { ...headers } as AxiosHeaders },
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
