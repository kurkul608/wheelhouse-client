import { FileModel } from "@/models/file";

export interface MessageLink {
  label: string;
  value: string;
}
export enum CarsWhere {
  SELECT_BY_USER = "SELECT_BY_USER",
  SELECT_BY_USER_PERIOD = "SELECT_BY_USER_PERIOD",
  SELECT_BY_DEFAULT_PERIOD = "SELECT_BY_DEFAULT_PERIOD",
}
export enum CarsWherePeriod {
  LAST_DAY = "LAST_DAY",
  LAST_WEEK = "LAST_WEEK",
  LAST_MONTH = "LAST_MONTH",
}

export enum CarsWhereStock {
  IN_STOCK = "IN_STOCK",
  IN_ORDER = "IN_ORDER",
}

export interface MessageTemplate {
  id: string;
  name: string;
  text: string;
  links: MessageLink[];
  photoIds: string[];
  photos: FileModel[];

  carsWhere?: CarsWhere;
  carsWhereDefaultPeriod?: CarsWherePeriod;
  carsWhereStock?: CarsWhereStock;
  carsWhereByUserIds: string[];
  carsWherePeriodStart?: string;
  carsWherePeriodEnd?: string;

  createdAt: string;
  updatedAt: string;
}
