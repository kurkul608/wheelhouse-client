"use server";

import { Bucket } from "@/models/bucket";

export const deleteFromBucket = async (
  carCardId: string,
  headers: HeadersInit,
): Promise<Bucket | undefined> => {
  try {
    const bucket = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}bucket/delete/${carCardId}`,
      {
        method: "DELETE",
        headers,
      },
    );

    return bucket.json();
  } catch (error) {
    console.error(error);
  }
};
