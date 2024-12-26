"use server";

export const addToWishlist = async (
  carCardId: string,
  headers: HeadersInit,
) => {
  const wishlist = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}wishlist/add/${carCardId}`,
    {
      method: "POST",
      headers,
    },
  );

  return wishlist.json();
};
