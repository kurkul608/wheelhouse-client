import { useFormikContext } from "formik";
import { MessageFormValues } from "@/components/Message/MessageForm";
import { MessageType } from "@/models/message";
import { classNames } from "@telegram-apps/sdk-react";
import { Subheadline } from "@telegram-apps/telegram-ui";
import { SelectOption } from "@/components/MultiSelectWithSearch";
import SingleSelectWithSearch from "@/components/SingleSelectWithSearch";
import { messagePeriodTypeOptions } from "@/constants/messagePeriodTypeOptions";

export const PeriodMessage = () => {
  const { values, setFieldValue, touched, errors } =
    useFormikContext<MessageFormValues>();

  const isPeriod = values.type?.value === MessageType.PERIOD;

  return (
    <div className={classNames("mt-2", { hidden: !isPeriod })}>
      <SingleSelectWithSearch
        isSearchable={false}
        options={messagePeriodTypeOptions as SelectOption<unknown>[]}
        onChange={(newOptions) => {
          setFieldValue("periodType", newOptions);
        }}
        head={<Subheadline className={"px-[22px]"}>Тип рассылки</Subheadline>}
        placeholder={"Период рассылки"}
        defaultSelectedOption={values.periodType}
        targetPortalId={"create-message"}
        name={"periodType"}
      />
      {touched.periodType && errors.periodType && (
        <div style={{ color: "red" }}>{errors.periodType}</div>
      )}
    </div>
  );
};
