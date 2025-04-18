"use server";

import axios, { AxiosHeaders } from "axios";
import {
  CarsWhere,
  CarsWherePeriod,
  CarsWhereStock,
  MessageLink,
} from "@/models/messageTemplate";

export const saveMessageTemplate = async (
  {
    photoIds,
    name,
    text,
    links,
    carsWhereDefaultPeriod,
    carsWherePeriodEnd,
    carsWhereByUserIds,
    carsWhereStock,
    carsWherePeriodStart,
    carsWhere,
  }: {
    text: string;
    name: string;
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
    const body = {
      text,
      name,
      photoIds,
      links,
      carsWhereDefaultPeriod,
      carsWherePeriodEnd,
      carsWhereByUserIds,
      carsWhereStock,
      carsWherePeriodStart,
      carsWhere,
    };
    const res = await axios.post(
      `${process.env.API_URL}admin/messageTemplate`,
      body,
      { headers: { ...headers, "Content-Type": "application/json" } },
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};
