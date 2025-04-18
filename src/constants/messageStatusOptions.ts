import { SelectOption } from "@/components/MultiSelectWithSearch";
import { MessageStatus } from "@/models/message";

export const messageStatusOptions: SelectOption<unknown>[] = [
  { value: MessageStatus.ACTIVE, label: "Активый" },
  { value: MessageStatus.DISABLED, label: "Не актинвый" },
];
