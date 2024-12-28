"use server";

export const createOrder = async (carId: string, headers: HeadersInit) => {
  const order = await fetch(`${process.env.NEXT_PUBLIC_API_URL}orders`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      carId,
    }),
  });

  return order.json();
};
