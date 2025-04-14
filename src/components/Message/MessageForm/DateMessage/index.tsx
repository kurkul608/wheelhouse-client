import { useFormikContext } from "formik";
import { Input, Subheadline } from "@telegram-apps/telegram-ui";
import { MessageFormValues } from "@/components/Message/MessageForm";
import { MessageType } from "@/models/message";

export const DateMessage = () => {
  const { values, handleChange, touched, errors } =
    useFormikContext<MessageFormValues>();
  const isPeriod = values.type?.value === MessageType.PERIOD;
  return (
    <div className={"mt-2"}>
      <Subheadline className={"px-[22px]"}>
        {isPeriod ? "Дата и время начала периода" : "Запланированная рассылка"}
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
      {touched.startTime && errors.startTime && (
        <div style={{ color: "red" }}>{errors.startTime}</div>
      )}
    </div>
  );
};
