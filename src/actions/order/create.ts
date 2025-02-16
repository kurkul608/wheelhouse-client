"use server";

export const createOrder = async (
  carId: string,
  isInquiresAboutPrice: boolean,
  contact: {
    userId: number;
    phoneNumber: string;
    firstName: string;
    lastName?: string;
  },
  headers: HeadersInit,
) => {
  try {
    const order = await fetch(`${process.env.API_URL}orders`, {
      method: "POST",
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        carId,
        isInquiresAboutPrice,
        contact,
      }),
    });

    return order.json();
  } catch (error) {
    console.error(error);
  }
};
