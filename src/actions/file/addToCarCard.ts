"use server";

export const addToCarCard = async (
  fileId: string,
  carCardId: string,
  headers: HeadersInit,
) => {
  await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}files/${fileId}/add-to/${carCardId}`,
    {
      method: "POST",
      headers,
    },
  );
};
