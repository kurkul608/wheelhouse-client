"use server";

import axios, { AxiosHeaders } from "axios";
import { ICreateMessageBody } from "@/actions/message/createMessage";

type IUpdateMessageBody = Partial<
  Omit<ICreateMessageBody, "messageTemplateId">
>;

export const updateMessage = async (
  messageId: string,
  body: IUpdateMessageBody,
  headers: AxiosHeaders,
) => {
  try {
    const response = await axios.patch(
      `${process.env.API_URL}admin/message/${messageId}`,
      body,
      { headers: { ...headers, "Content-Type": "application/json" } },
    );

    return response.data;
  } catch (error) {
    console.error((error as { message: string }).message);
    throw error;
  }
};
