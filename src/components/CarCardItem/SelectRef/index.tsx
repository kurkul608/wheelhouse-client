"use client";

import { useLaunchParams } from "@telegram-apps/sdk-react";
import { FC, useEffect, useState } from "react";
import {
  Button,
  Cell,
  Headline,
  List,
  Spinner,
  Title,
} from "@telegram-apps/telegram-ui";
import { getRefCodeList } from "@/admin/refCode/getList";
import { getAuthorization } from "@/utils/getAuthorization";
import { AxiosHeaders } from "axios";
import { RefCodeModel } from "@/models/refCode";
import { formatDateInClientTimeZone } from "@/utils/date";

interface ISelectRefProps {
  shareClick(refId?: string): void;
}
export const SelectRef: FC<ISelectRefProps> = ({ shareClick }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refs, setRefs] = useState<RefCodeModel[]>([]);
  const lp = useLaunchParams();

  useEffect(() => {
    const getData = async () => {
      const refs = await getRefCodeList(getAuthorization(lp) as AxiosHeaders);

      if (refs) {
        setRefs(refs);
      }
      setIsLoading(false);
    };

    if (lp && !refs.length) {
      setIsLoading(true);
      getData();
    }
  }, [lp]);

  return (
    <div className={"w-full"}>
      {isLoading ? <Spinner size={"s"} /> : null}
      {!!refs.length ? (
        <>
          <Title>Выберите реферальную ссылку</Title>
          <List className={"max-h-80 overflow-y-auto"}>
            {refs.map((ref) => (
              <Cell
                subtitle={`Создано: ${formatDateInClientTimeZone(ref.createdAt)}`}
                key={`refid-${ref.id}`}
                onClick={() => {
                  shareClick(ref.id);
                }}
              >
                {ref.name}
              </Cell>
            ))}
          </List>
          <div className={"w-full flex justify-center"}>
            <Button
              onClick={() => {
                shareClick();
              }}
            >
              Ссылка без реферального кода
            </Button>
          </div>
        </>
      ) : null}
      {!isLoading && !refs.length && <Headline>Ничего не найдено</Headline>}
    </div>
  );
};
