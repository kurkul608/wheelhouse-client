"use server";

import axios, { AxiosHeaders } from "axios";
import {
  CarsWhere,
  CarsWherePeriod,
  CarsWhereStock,
  MessageLink,
} from "@/models/messageTemplate";

export const sentMessageTemplate = async (
  {
    photoIds,
    text,
    userId,
    links,
    carsWhereDefaultPeriod,
    carsWherePeriodEnd,
    carsWhere,
    carsWhereStock,
    carsWherePeriodStart,
    carsWhereByUserIds,
  }: {
    text: string;
    userId: string;
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
    const res = await axios.post(
      `${process.env.API_URL}admin/messageTemplate/sent`,
      {
        text,
        userId,
        photoIds,
        links,
        carsWhereDefaultPeriod,
        carsWherePeriodEnd,
        carsWhere,
        carsWhereStock,
        carsWherePeriodStart,
        carsWhereByUserIds,
      },
      { headers: { ...headers, "Content-Type": "application/json" } },
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};
