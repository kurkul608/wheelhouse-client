export const deleteFromBucket = async (
  carCardId: string,
  headers: HeadersInit,
) => {
  const bucket = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}bucket/delete/${carCardId}`,
    {
      method: "DELETE",
      headers,
    },
  );

  return bucket.json();
};
