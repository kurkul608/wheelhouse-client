"use client";

import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useEffect, useState } from "react";
import { MessageTemplate } from "@/models/messageTemplate";
import { getListMessageTemplate } from "@/actions/message/messageTemplate/getListMessageTemplate";
import { getAuthorization } from "@/utils/getAuthorization";
import { AxiosHeaders } from "axios";
import { Cell, Headline, List, Spinner } from "@telegram-apps/telegram-ui";
import { formatDateInClientTimeZone } from "@/utils/date";
import { useRouter } from "next/navigation";

export const ListMessageTemplate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState<MessageTemplate[]>([]);

  const lp = useLaunchParams();

  useEffect(() => {
    const getData = async () => {
      const data = await getListMessageTemplate(
        getAuthorization(lp) as AxiosHeaders,
      );
      setList(data);
      setIsLoading(false);
    };

    if (lp && !list.length) {
      setIsLoading(true);
      getData();
    }
  }, [lp]);

  const router = useRouter();

  return (
    <List>
      {list.map((mt) => (
        <Cell
          key={`template-${mt.id}`}
          subtitle={formatDateInClientTimeZone(mt.createdAt)}
          onClick={() => {
            router.push(`/admin/message/messageTemplate/${mt.id}`);
          }}
        >
          {mt.name}
        </Cell>
      ))}
      {isLoading && <Spinner size={"l"} />}
      {!isLoading && !list.length && <Headline>Ничего не найдено</Headline>}
    </List>
  );
};
