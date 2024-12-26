"use server";

export const deleteFromWishlist = async (
  carCardId: string,
  headers: HeadersInit,
) => {
  const wishlist = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}wishlist/delete/${carCardId}`,
    {
      method: "DELETE",
      headers,
    },
  );

  return wishlist.json();
};
