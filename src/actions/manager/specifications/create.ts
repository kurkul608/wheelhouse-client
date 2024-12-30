"use server";

import { SpecificationCreateDto } from "@/constants/specifications";

export const createSpecification = async (
  dto: SpecificationCreateDto[],
  carCardId: string,
  headers: HeadersInit,
) => {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}manager/specifications`,
      {
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dto.map((spec) => ({ ...spec, carCardId }))),
      },
    );
    return result.json();
  } catch (error) {
    console.error(error);
  }
};
