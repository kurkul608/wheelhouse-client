"use server";

import { Wishlist } from "@/models/wishlist";

export const addToWishlist = async (
  carCardId: string,
  headers: HeadersInit,
): Promise<Wishlist | undefined> => {
  try {
    const wishlist = await fetch(
      `${process.env.API_URL}wishlist/add/${carCardId}`,
      {
        method: "POST",
        headers,
      },
    );

    return wishlist.json();
  } catch (error) {
    console.error(error);
  }
};
