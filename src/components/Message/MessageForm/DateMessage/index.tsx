import { useFormikContext } from "formik";
import { Input, Subheadline } from "@telegram-apps/telegram-ui";
import { MessageFormValues } from "@/components/Message/MessageForm";

export const DateMessage = () => {
  const { values, handleChange } = useFormikContext<MessageFormValues>();
  return (
    <div className={"mt-2"}>
      <Subheadline className={"px-[22px]"}>
        Запланированная рассылка
      </Subheadline>
      <Input
        disabled={values.isSentImmediately}
        type="datetime-local"
        id="startTime"
        name="startTime"
        value={values.startTime as string}
        onChange={handleChange}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
      />
    </div>
  );
};
