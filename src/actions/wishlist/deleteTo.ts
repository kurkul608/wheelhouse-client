"use server";

import { Wishlist } from "@/models/wishlist";

export const deleteFromWishlist = async (
  carCardId: string,
  headers: HeadersInit,
): Promise<Wishlist | undefined> => {
  try {
    const wishlist = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}wishlist/delete/${carCardId}`,
      {
        method: "DELETE",
        headers,
      },
    );

    return wishlist.json();
  } catch (error) {
    console.error(error);
  }
};
