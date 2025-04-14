import { MessageType } from "@/models/message";

export const messageTypeOptions: { label: string; value: MessageType }[] = [
  { value: MessageType.ONCE, label: "Разовая рассылка" },
  { value: MessageType.PERIOD, label: "Рассылка с периодом" },
];
