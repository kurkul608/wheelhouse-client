"use server";

import { Page } from "@/components/Page";
import React from "react";
import { CarCardList } from "@/components/CarCardList/CarCardList";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CarCardListFilters } from "@/components/CarCardList/CarCardListFilters";

export default async function Home(
  {
    // searchParams,
  }: {
    searchParams: Promise<{ page: string }>;
  },
) {
  return (
    <Page>
      <div
        style={{ background: "var(--tgui--secondary_bg_color)" }}
        className={"min-h-[calc(100vh-62px)] overflow-hidden"}
      >
        <Breadcrumbs
          items={[
            {
              name: "Главная",
            },
          ]}
        ></Breadcrumbs>
        <CarCardListFilters />
        <CarCardList />
      </div>
    </Page>
  );
}
