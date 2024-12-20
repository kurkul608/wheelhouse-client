"use server";

import { Section, List } from "@telegram-apps/telegram-ui";
import { Page } from "@/components/Page";
import React from "react";
import { CarCardList } from "@/components/CarCardList/CarCardList";

export default async function Home() {
  return (
    <>
      <Page back={false}>
        <List>
          <Section>
            <CarCardList />
          </Section>
        </List>
      </Page>
    </>
  );
}
