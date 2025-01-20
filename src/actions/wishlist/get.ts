"use server";

import { Wishlist } from "@/models/wishlist";

export async function getWishlist(
  userId: string,
  headers: HeadersInit,
): Promise<Wishlist | undefined> {
  try {
    const wishlist = await fetch(
      `${process.env.API_URL}wishlist/user/${userId}`,
      {
        method: "GET",
        headers,
      },
    );

    return wishlist.json();
  } catch (error) {
    console.error(error);
  }
}
