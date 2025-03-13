import { Page } from "@/components/Page";
import React from "react";
import { CarCardList } from "@/components/CarCardList/CarCardList";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CarCardListFilters } from "@/components/CarCardList/CarCardListFilters";

export const metadata = {
  title: "Список авто",
};

export default async function HomePage() {
  return (
    <Page back={false}>
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
