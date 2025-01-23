"use server";

import { SpecificationCreateDto } from "@/constants/specifications";
import axios, { AxiosHeaders } from "axios";

export const createSpecification = async (
  dto: SpecificationCreateDto,
  headers: HeadersInit,
) => {
  try {
    const result = await axios.post(
      `${process.env.API_URL}manager/specifications`,
      dto,
      {
        headers: {
          ...(headers as AxiosHeaders),
          "Content-Type": "application/json",
        },
      },
    );
    return result.data;
  } catch (error) {
    console.error(error);
  }
};
