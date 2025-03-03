"use client";

import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useEffect, useState } from "react";
import { RefCodeModel } from "@/models/refCode";
import { Cell, List } from "@telegram-apps/telegram-ui";
import { formatDateInClientTimeZone } from "@/utils/date";
import { getRefCodeList } from "@/admin/refCode/getList";
import { getAuthorization } from "@/utils/getAuthorization";
import { AxiosHeaders } from "axios";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

export const RefLinkList = () => {
  const pathname = usePathname();
  const searchparams = useSearchParams();
  const lp = useLaunchParams();
  const [loading, setLoading] = useState(false);
  const [refLinksList, setRefLinksList] = useState<RefCodeModel[]>([]);

  const loadData = async () => {
    const links = await getRefCodeList(getAuthorization(lp) as AxiosHeaders);
    if (links) setRefLinksList(links);
    setLoading(false);
  };

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      loadData();
    }
  }, [pathname, searchparams]);

  return (
    <List>
      {refLinksList.map((link) => (
        <Link href={`/admin/ref/${link.id}`} key={link.id}>
          <Cell
            subtitle={`Создано: ${formatDateInClientTimeZone(link.createdAt)}`}
          >
            {link.name}
          </Cell>
        </Link>
      ))}
    </List>
  );
};
