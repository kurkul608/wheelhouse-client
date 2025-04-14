"use server";

import axios, { AxiosHeaders } from "axios";
import {
  MessagePeriodType,
  MessageStatus,
  MessageType,
  WhereUsersEnum,
} from "@/models/message";

export interface ICreateMessageBody {
  usersWhere: WhereUsersEnum;
  messageTemplateId: string;
  carCardsWhere?: object;
  name: string;
  status: MessageStatus;
  type: MessageType;
  countAutoInWishlist?: number;
  brandsAutoInWishlist?: string[];
  brandsAutoInOrders?: string[];
  countOrders?: number;
  startTime?: string;
  periodType?: MessagePeriodType;
  startNow?: boolean;
}
export const createMessage = async (
  body: ICreateMessageBody,
  headers: AxiosHeaders,
) => {
  try {
    console.log(body);
    const response = await axios.post(
      `${process.env.API_URL}admin/message`,
      body,
      { headers: { ...headers, "Content-Type": "application/json" } },
    );

    return response.data;
  } catch (error) {
    console.error((error as { message: string }).message);
    throw error;
  }
};
