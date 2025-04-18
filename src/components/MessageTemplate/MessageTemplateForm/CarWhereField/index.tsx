"use client";

import { useFormikContext } from "formik";
import { CreateMessageTemplateFormValues } from "@/components/MessageTemplate/MessageTemplateForm";
import { classNames } from "@telegram-apps/sdk-react";
import { CarsWhere } from "@/models/messageTemplate";
import { Input, Subheadline } from "@telegram-apps/telegram-ui";
import SingleSelectWithSearch from "@/components/SingleSelectWithSearch";
import { carStockOptions as carStockOptionsTemplate } from "@/constants/carStockOptions";
import { carWhereDefaultPeriodOptions } from "@/constants/carWhereDefaultPeriodOptions";

const carStockOptions = [{ value: "", label: "-" }, ...carStockOptionsTemplate];

export const CarWhereField = () => {
  const { values, handleChange, errors, touched, setFieldValue } =
    useFormikContext<CreateMessageTemplateFormValues>();

  return (
    <>
      <div
        className={classNames("mt-2", {
          hidden: values.carsWhere.value === "",
        })}
      >
        <SingleSelectWithSearch
          isSearchable={false}
          defaultSelectedOption={values.carsWhereStock}
          options={carStockOptions}
          onChange={(opt) => {
            setFieldValue("carsWhereStock", opt);
          }}
          placeholder={"Наличие авто"}
          head={<Subheadline className={"px-[22px]"}>Наличие авто</Subheadline>}
        />
      </div>
      <div
        className={classNames("mt-2", {
          hidden: values.carsWhere.value !== CarsWhere.SELECT_BY_USER_PERIOD,
        })}
      >
        <Subheadline className={"px-[22px]"}>
          Дата и время начала периода
        </Subheadline>
        <Input
          type="datetime-local"
          id="carsWherePeriodStart"
          name="carsWherePeriodStart"
          value={values.carsWherePeriodStart as string}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
        {touched.carsWherePeriodStart && errors.carsWherePeriodStart && (
          <div style={{ color: "red" }}>{errors.carsWherePeriodStart}</div>
        )}
      </div>
      <div
        className={classNames("mt-2", {
          hidden: values.carsWhere.value !== CarsWhere.SELECT_BY_USER_PERIOD,
        })}
      >
        <Subheadline className={"px-[22px]"}>
          Дата и время окончания периода
        </Subheadline>
        <Input
          type="datetime-local"
          id="carsWherePeriodEnd"
          name="carsWherePeriodEnd"
          value={values.carsWherePeriodEnd as string}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        />
        {touched.carsWherePeriodEnd && errors.carsWherePeriodEnd && (
          <div style={{ color: "red" }}>{errors.carsWherePeriodEnd}</div>
        )}
      </div>
      <div
        className={classNames("mt-2", {
          hidden: values.carsWhere.value !== CarsWhere.SELECT_BY_DEFAULT_PERIOD,
        })}
      >
        <SingleSelectWithSearch
          isSearchable={false}
          defaultSelectedOption={values.carsWhereDefaultPeriod}
          options={carWhereDefaultPeriodOptions}
          onChange={(opt) => {
            setFieldValue("carsWhereDefaultPeriod", opt);
          }}
          placeholder={"Период за который добавлены авто"}
          head={
            <Subheadline className={"px-[22px]"}>
              Период за который добавлены авто
            </Subheadline>
          }
        />
      </div>
    </>
  );
};
