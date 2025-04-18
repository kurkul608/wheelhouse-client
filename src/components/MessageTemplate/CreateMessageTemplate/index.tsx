"use client";

import {
  CreateMessageTemplateFormValues,
  MessageTemplateForm,
} from "@/components/MessageTemplate/MessageTemplateForm";
import { saveMessageTemplate } from "@/actions/messageTemplate/saveMessageTemplate";
import { getAuthorization } from "@/utils/getAuthorization";
import { AxiosHeaders } from "axios";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { clientDateToUTC } from "@/utils/date";
import {
  CarsWhere,
  CarsWherePeriod,
  CarsWhereStock,
} from "@/models/messageTemplate";

export const CreateMessageTemplate = () => {
  const lp = useLaunchParams();

  const onSubmit = async (values: CreateMessageTemplateFormValues) => {
    await saveMessageTemplate(
      {
        text: values.description,
        name: values.name,
        photoIds: values.photos.map((photo) => photo.id),
        links: values.links,
        ...(values.carsWherePeriodStart
          ? {
              carsWherePeriodStart: clientDateToUTC(
                values.carsWherePeriodStart,
              ),
            }
          : {}),
        ...(values.carsWherePeriodEnd
          ? { carsWherePeriodEnd: clientDateToUTC(values.carsWherePeriodEnd) }
          : {}),
        ...(values.carsWhereStock.value
          ? { carsWhereStock: values.carsWhereStock.value as CarsWhereStock }
          : {}),
        ...(values.carsWhereDefaultPeriod.value
          ? {
              carsWhereDefaultPeriod: values.carsWhereDefaultPeriod
                .value as CarsWherePeriod,
            }
          : {}),
        ...(values.carsWhere.value
          ? {
              carsWhere: values.carsWhere.value as CarsWhere,
            }
          : {}),
      },
      getAuthorization(lp) as AxiosHeaders,
    );
  };
  return <MessageTemplateForm onSubmit={onSubmit} />;
};
