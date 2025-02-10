"use server";

import { Page } from "@/components/Page";
import React from "react";
import { Welcome } from "@/components/Welcome/Welcome";
// import { redirect } from "next/navigation";

export default async function Home() {
  console.log(process.env.NODE_ENV);
  return (
    <>
      <Page back={false}>
        <Welcome />
      </Page>
    </>
  );
}
