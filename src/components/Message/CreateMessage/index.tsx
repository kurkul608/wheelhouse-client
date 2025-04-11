"use client";

import { Spinner } from "@telegram-apps/telegram-ui";
import { useEffect, useState } from "react";
import { CreateMessageForm } from "@/components/Message/CreateMessage/CreateMessageForm";
import { MessageTemplate } from "@/models/messageTemplate";
import { getListMessageTemplate } from "@/actions/message/messageTemplate/getListMessageTemplate";
import { getAuthorization } from "@/utils/getAuthorization";
import { AxiosHeaders } from "axios";
import { useLaunchParams } from "@telegram-apps/sdk-react";

export const CreateMessage = () => {
  const [templates, setTemplates] = useState<MessageTemplate[]>([]);
  const [isTemplatesLoading, setIsTemplateLoading] = useState(false);

  // const [cars, setCars] = useState<CarCard[]>([]);
  // const [isLoadingCars, setIsLoadingCars] = useState(false);

  const lp = useLaunchParams();

  useEffect(() => {
    const getData = async () => {
      const data = await getListMessageTemplate(
        getAuthorization(lp) as AxiosHeaders,
      );
      setTemplates(data);
      setIsTemplateLoading(false);
    };

    if (lp && !templates.length) {
      setIsTemplateLoading(true);
      getData();
    }
  }, [lp]);

  // useEffect(() => {
  //   const getData = async () => {
  //     const data = await getManagerCarsList(
  //       "",
  //       "all",
  //       "all",
  //       getAuthorization(lp) as AxiosHeaders,
  //     );
  //
  //     setCars(data);
  //     setIsLoadingCars(false);
  //   };
  //
  //   if (lp && !templates.length) {
  //     setIsLoadingCars(true);
  //     getData();
  //   }
  // }, [lp]);

  return isTemplatesLoading ? (
    <Spinner size={"l"} />
  ) : (
    <CreateMessageForm templates={templates} />
  );
};
