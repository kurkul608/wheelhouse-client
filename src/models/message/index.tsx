import { MessageTemplate } from "@/models/messageTemplate";

export enum WhereUsersEnum {
  ONCE_USE_BOT = "ONCE_USE_BOT",
  N_AUTO_IN_WISHLIST = "N_AUTO_IN_WISHLIST",
  MANY_SPECIAL_AUTO_IN_WISHLIST = "MANY_SPECIAL_AUTO_IN_WISHLIST",
  MANY_ORDERS = "MANY_ORDERS",
  MANY_ORDER_ON_BRAND = "MANY_ORDER_ON_BRAND",
  ADMIN_ONLY = "ADMIN_ONLY",
}

export enum MessageStatus {
  ACTIVE = "ACTIVE",
  DISABLED = "DISABLED",
}
export enum MessageType {
  ONCE = "ONCE",
  PERIOD = "PERIOD",
}
export enum MessagePeriodType {
  EVERY_HOUR = "EVERY_HOUR",
  EVERY_DAY = "EVERY_DAY",
  EVERY_WEEK = "EVERY_WEEK",
  EVERY_MONTH = "EVERY_MONTH",
}

export interface Message {
  id: string;
  name: string;
  messageTemplateId: string;
  MessageTemplate?: MessageTemplate;
  usersWhere: WhereUsersEnum;
  carCardsWhere?: object;
  status: MessageStatus;

  startTime: string;

  type: MessageType;

  periodType?: MessagePeriodType;

  brandsAutoInWishlist?: string[];
  brandsAutoInOrders?: string[];
  countAutoInWishlist?: number;
  countOrders?: number;

  createdAt: string;
  updatedAt: string;
}
