"use server";

import axios, { AxiosHeaders } from "axios";
import {
  Message,
  MessageStatus,
  MessageType,
  MessagePeriodType,
} from "@/models/message";

export interface IGetMessagesListParams {
  filterByStatus?: MessageStatus;
  filterByType?: MessageType;
  filterByPeriod?: MessagePeriodType;
}

export const getMessagesList = async (
  params: IGetMessagesListParams,
  headers: AxiosHeaders,
) => {
  try {
    const list = await axios.get<Message[]>(
      `${process.env.API_URL}admin/message`,
      { headers, params },
    );

    return list.data;
  } catch (error) {
    throw error;
  }
};
