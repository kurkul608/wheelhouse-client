"use server";

import { Section, List } from "@telegram-apps/telegram-ui";
import { Page } from "@/components/Page";
import React from "react";
import { CarCardList } from "@/components/CarCardList/CarCardList";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) {
  const sp = await searchParams;

  return (
    <>
      <Page>
        <List>
          <Section>
            <CarCardList page={+sp.page} />
          </Section>
        </List>
      </Page>
    </>
  );
}
