import { MessageType } from "@/models/message";
import { SelectOption } from "@/components/MultiSelectWithSearch";

export const messageTypeOptions: SelectOption<unknown>[] = [
  { value: MessageType.ONCE, label: "Разовая рассылка" },
  { value: MessageType.PERIOD, label: "Рассылка с периодом" },
];
