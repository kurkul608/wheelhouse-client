export const addToBucket = async (carCardId: string, headers: HeadersInit) => {
  const bucket = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}bucket/add/${carCardId}`,
    {
      method: "POST",
      headers,
    },
  );

  return bucket.json();
};
