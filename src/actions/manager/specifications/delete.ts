"use server";

import axios, { AxiosHeaders } from "axios";

export const deleteSpecification = async (
  specificationId: string,
  headers: AxiosHeaders,
) => {
  try {
    const result = await axios.delete(
      `${process.env.API_URL}manager/specifications/${specificationId}`,
      { headers },
    );
    return result.data;
  } catch (error) {
    console.error(error);
  }
};
