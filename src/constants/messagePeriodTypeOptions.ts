import { MessagePeriodType } from "@/models/message";

export const messagePeriodTypeOptions: {
  label: string;
  value: MessagePeriodType;
}[] = [
  { value: MessagePeriodType.EVERY_HOUR, label: "Каждый час" },
  { value: MessagePeriodType.EVERY_DAY, label: "Каждый день" },
  { value: MessagePeriodType.EVERY_WEEK, label: "Каждую неделю" },
  { value: MessagePeriodType.EVERY_MONTH, label: "Каждый месяц" },
];
