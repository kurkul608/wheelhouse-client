"use server";

import { Bucket } from "@/models/bucket";

export async function getBucket(
  userId: string,
  headers: HeadersInit,
): Promise<Bucket | undefined> {
  try {
    const bucket = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}bucket/user/${userId}`,
      {
        method: "GET",
        headers,
      },
    );

    return bucket.json();
  } catch (error) {
    console.error(error);
  }
}
