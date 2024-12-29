"use server";

import { Bucket } from "@/models/bucket";

export const addToBucket = async (
  carCardId: string,
  headers: HeadersInit,
): Promise<Bucket | undefined> => {
  try {
    const bucket = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}bucket/add/${carCardId}`,
      {
        method: "POST",
        headers,
      },
    );

    return bucket.json();
  } catch (error) {
    console.error(error);
  }
};
