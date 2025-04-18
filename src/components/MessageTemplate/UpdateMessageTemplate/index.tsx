"use client";

import {
  CarsWhere,
  CarsWherePeriod,
  CarsWhereStock,
  MessageTemplate,
} from "@/models/messageTemplate";
import { FC } from "react";
import { getAuthorization } from "@/utils/getAuthorization";
import { AxiosHeaders } from "axios";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { updateMessageTemplate } from "@/actions/messageTemplate/updateMessageTemplate";
import {
  CreateMessageTemplateFormValues,
  MessageTemplateForm,
} from "@/components/MessageTemplate/MessageTemplateForm";
import { clientDateToUTC } from "@/utils/date";

interface IProps {
  template: MessageTemplate;
}

export const UpdateMessageTemplate: FC<IProps> = ({ template }) => {
  const lp = useLaunchParams();
  const onSubmit = async (values: CreateMessageTemplateFormValues) => {
    await updateMessageTemplate(
      template.id,
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
  return <MessageTemplateForm template={template} onSubmit={onSubmit} />;
};
