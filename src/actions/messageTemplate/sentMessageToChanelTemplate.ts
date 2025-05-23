"use server";

import axios, { AxiosHeaders } from "axios";
import {
  CarsWhere,
  CarsWherePeriod,
  CarsWhereStock,
  MessageLink,
} from "@/models/messageTemplate";

export const sentMessageToChanelTemplate = async (
  {
    photoIds,
    text,
    links,
    carsWhereDefaultPeriod,
    carsWherePeriodEnd,
    carsWherePeriodStart,
    carsWhereStock,
    carsWhereByUserIds,
    carsWhere,
  }: {
    text: string;
    photoIds?: string[];
    links?: MessageLink[];
    carsWhere?: CarsWhere;
    carsWhereDefaultPeriod?: CarsWherePeriod;
    carsWhereStock?: CarsWhereStock;
    carsWhereByUserIds?: string[];
    carsWherePeriodStart?: string;
    carsWherePeriodEnd?: string;
  },
  headers: AxiosHeaders,
) => {
  try {
    const chanelId = process.env.CHANEL_ID;

    const res = await axios.post(
      `${process.env.API_URL}admin/messageTemplate/sent-to-chanel`,
      {
        text,
        chanelId,
        photoIds,
        links,
        carsWhereDefaultPeriod,
        carsWherePeriodEnd,
        carsWherePeriodStart,
        carsWhereStock,
        carsWhereByUserIds,
        carsWhere,
      },
      { headers: { ...headers, "Content-Type": "application/json" } },
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};
