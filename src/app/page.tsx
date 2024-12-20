"use server";

import { Page } from "@/components/Page";
import React from "react";
import { Welcome } from "@/components/Welcome/Welcome";

export default async function Home() {
  return (
    <>
      <Page back={false}>
        <Welcome />
      </Page>
    </>
  );
}
