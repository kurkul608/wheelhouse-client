"use server";

import axios, { AxiosHeaders } from "axios";
import {
  CarsWhere,
  CarsWherePeriod,
  CarsWhereStock,
  MessageLink,
} from "@/models/messageTemplate";

export const updateMessageTemplate = async (
  id: string,
  {
    photoIds,
    name,
    text,
    links,
    carsWhereDefaultPeriod,
    carsWherePeriodEnd,
    carsWherePeriodStart,
    carsWhereStock,
    carsWhere,
    carsWhereByUserIds,
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
      carsWherePeriodStart,
      carsWhereStock,
      carsWhere,
      carsWhereByUserIds,
    };
    const res = await axios.patch(
      `${process.env.API_URL}admin/messageTemplate/${id}`,
      body,
      { headers: { ...headers, "Content-Type": "application/json" } },
    );

    return res.data;
  } catch (error) {
    throw error;
  }
};
