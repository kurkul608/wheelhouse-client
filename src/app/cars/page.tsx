"use server";

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
    <Page>
      <div style={{ background: "var(--tgui--secondary_bg_color)" }}>
        <CarCardList page={+sp.page} />
      </div>
    </Page>
  );
}
